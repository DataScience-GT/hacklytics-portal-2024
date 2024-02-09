import React, { FC, useEffect } from "react";
import styles from "./ShopPage.module.scss";

import { AmplifyUser, AuthEventData } from "@aws-amplify/ui";
import { ClaimHoodie, ClaimShirt, ClaimSleepingBag, Points } from "../../models";
import { listClaimHoodies, listClaimShirts, listClaimSleepingBags, listPoints, listUsers } from "../../graphql/queries";
import { createClaimHoodie, createClaimShirt, createClaimSleepingBag } from "../../graphql/mutations";
import { API } from "aws-amplify";
import {
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  View,
  Text,
  SearchField,
  Flex,
  Pagination,
  SelectField,
} from "@aws-amplify/ui-react";
import { User, UserData } from "../../misc/Interfaces";

interface ShopPageProps {
  user?: AmplifyUser;
  signOut?: (data?: AuthEventData | undefined) => void;
}

const ShopPage: FC<ShopPageProps> = ({ user, signOut }) => {
  
  const [points, setPoints] = React.useState<Points[]>([]);
  const [loadingPoints, setLoadingPoints] = React.useState<boolean>(true);

  const [shirtsClaimed, setShirtsClaimed] = React.useState<ClaimShirt[]>([]);
  const [loadingShirtsClaimed, setLoadingShirtsClaimed] = React.useState<boolean>(true);
  const [hoodiesClaimed, setHoodiesClaimed] = React.useState<ClaimHoodie[]>([]);
  const [loadingHoodiesClaimed, setLoadingHoodiesClaimed] = React.useState<boolean>(true);
  const [sleepingBagsClaimed, setSleepingBagsClaimed] = React.useState<ClaimSleepingBag[]>([]);
  const [loadingSleepingBagsClaimed, setLoadingSleepingBagsClaimed] = React.useState<boolean>(true);

  const [tryingToClaimShirt, setTryingToClaimShirt] = React.useState<boolean>(false);
  const [tryingToClaimHoodie, setTryingToClaimHoodie] = React.useState<boolean>(false);
  const [tryingToClaimSleepingBag, setTryingToClaimSleepingBag] = React.useState<boolean>(false);

  const [users, setUsers] = React.useState<{[name: string]: any}>({});
  const [usersLoading, setUsersLoading] = React.useState<boolean>(true);
  const [userSearch, setUserSearch] = React.useState<string>("");
  const [userPage, setUserPage] = React.useState<number>(1);
  const [userPageSize, setUserPageSize] = React.useState<number>(localStorage.getItem("userPageSize")
  ? parseInt(localStorage.getItem("userPageSize") as string) : 10);
  const [filteredUsers, setFilteredUsers] = React.useState<{[name: string]: any}>({});

  useEffect(() => {
    loadPoints(() => {
      setLoadingPoints(false);
    });
    loadShirtsClaimed(() => {
      setLoadingShirtsClaimed(false);
    });
    loadHoodiesClaimed(() => {
      setLoadingHoodiesClaimed(false);
    })
    loadSleepingBagsClaimed(() => {
      setLoadingSleepingBagsClaimed(false);
    })
  }, []);

  useEffect(() => {
    loadUsers(() => {
      setUsersLoading(false);
    })
  }, [points]);

  useEffect(() => {
    const filteredDict: { [key: string]: any } = {};
    for (const key in users) {
        if (key.toLowerCase().includes(userSearch.toLowerCase())) {
            filteredDict[key] = users[key];
        }
    }
    setFilteredUsers(filteredDict);
  }, [users, userSearch]);

  const loadUsers = async (callback?: () => void) => {
    const res: any = await API.graphql({
      query: listUsers,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let userData: UserData = JSON.parse(res.data.listUsers);

    const usersDict: { [name: string]: any } = {};
    userData.body.users.forEach((user: User) => {
      const userInfo: any = {};
      user.Attributes.forEach((attribute) => {
          userInfo[attribute.Name] = attribute.Value;
      });
      userInfo['UserCreateDate'] = user.UserCreateDate;
      userInfo['UserLastModifiedDate'] = user.UserLastModifiedDate;
      userInfo['Points'] = points.filter((x) => x.userID == userInfo.sub);

      usersDict[userInfo.name] = userInfo;
    });
    setUsers(usersDict);
    if (callback) callback();
  }

  const loadPoints = async (callback?: () => void) => {
    const res: any = await API.graphql({
      query: listPoints,
      variables: {
        filter: {_deleted: {ne: true}},
        limit: 10000
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let points: Points[] = res.data.listPoints.items;
    let finalpoints: Map<String, Points> = new Map()
    for (var p in points) {
      let point = points[p];
      let existing = finalpoints.get(point.userID);
      if (existing) {
        finalpoints.set(point.userID, new Points({
            userID: point.userID,
            userName: point.userName,
            points: existing.points + point.points
        }))
      } else {
        finalpoints.set(point.userID, point)
      }
    }
    setPoints(Array.from(finalpoints.values()));

    if (callback) {
      callback();
    }
  };

  const loadShirtsClaimed = async (callback?: () => void) => {
    const res: any = await API.graphql({
      query: listClaimShirts,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setShirtsClaimed(res.data.listClaimShirts.items);
    if (callback) {
      callback();
    }
  };

  const loadHoodiesClaimed = async (callback?: () => void) => {
    const res: any = await API.graphql({
      query: listClaimHoodies,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setHoodiesClaimed(res.data.listClaimHoodies.items);
    if (callback) {
      callback();
    }
  };

  const loadSleepingBagsClaimed = async (callback?: () => void) => {
    const res: any = await API.graphql({
      query: listClaimSleepingBags,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setSleepingBagsClaimed(res.data.listClaimSleepingBags.items);
    if (callback) {
      callback();
    }
  };

  const claimShirt = async (user: any) => {
    const res: any = await API.graphql({
      query: createClaimShirt,
      variables: {
        input: {
          userID: user.sub,
          userName: user.name,
          timestamp: new Date()
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setTryingToClaimShirt(false);
    loadShirtsClaimed();
  };

  const claimHoodie = async (user: any) => {
    const res: any = await API.graphql({
      query: createClaimHoodie,
      variables: {
        input: {
          userID: user.sub,
          userName: user.name,
          timestamp: new Date()
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setTryingToClaimHoodie(false);
    loadHoodiesClaimed();
  };

  const claimSleepingBag = async (user: any) => {
    const res: any = await API.graphql({
      query: createClaimSleepingBag,
      variables: {
        input: {
          userID: user.sub,
          userName: user.name,
          timestamp: new Date()
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setTryingToClaimSleepingBag(false);
    loadSleepingBagsClaimed();
  };

  return (
    <div className={styles.ShopPage}>
      <Flex direction={"column"} padding={"medium"} alignItems={"center"}>
        <View width={"85%"}>
          <Heading level={3} marginBottom={"medium"} marginTop={"medium"}>
            Points Shop
          </Heading>
          <Flex direction={"row"} gap={"medium"} marginBottom={"medium"} wrap={"wrap"}>
            <SearchField
              label=""
              labelHidden={true}
              placeholder={"Search"}
              onChange={(e) => {
                setUserSearch(e.target.value.toLowerCase());
                let maxPages = Math.ceil(Object.keys(filteredUsers).length / userPageSize);
                if (userPage > maxPages && maxPages !== 0) {
                  setUserPage(maxPages);
                } else if (userPage < 1) {
                  setUserPage(1);
                }
              }} 
              onClear={() => {
                setUserSearch("");
                if (userPage < 1) {
                  setUserPage(1);
                }
              }} 
              isDisabled={usersLoading || users.length === 0}
            />
            <Text style={{ background: "var(--amplify-colors-background-secondary)", padding: "0.5em", width: "fit-content" }}>
              Number of shirts claimed: {shirtsClaimed.length}
            </Text>
            <Text style={{ background: "var(--amplify-colors-background-secondary)", padding: "0.5em", width: "fit-content" }}>
              Number of hoodies claimed: {hoodiesClaimed.length}
            </Text>
            <Text style={{ background: "var(--amplify-colors-background-secondary)", padding: "0.5em", width: "fit-content" }}>
              Number of sleeping bags claimed: {sleepingBagsClaimed.length}
            </Text>
          </Flex>

          {loadingPoints || loadingShirtsClaimed || loadingHoodiesClaimed || loadingSleepingBagsClaimed || usersLoading ? (
            <Text>Loading...</Text>
          ) : users.length <= 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th">Participant</TableCell>
                  <TableCell as="th">Points</TableCell>
                  <TableCell as="th">Claim Shirt</TableCell>
                  <TableCell as="th">Claim Hoodie</TableCell>
                  <TableCell as="th">Claim Sleeping Bag</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>No users yet.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th" width={"20%"}>Participant</TableCell>
                  <TableCell as="th" width={"20%"}>Points</TableCell>
                  <TableCell as="th" width={"20%"}>Claim Shirt</TableCell>
                  <TableCell as="th" width={"20%"}>Claim Hoodie</TableCell>
                  <TableCell as="th" width={"20%"}>Claim Sleeping Bag</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(filteredUsers).slice((userPage - 1) * userPageSize, (userPage - 1) * userPageSize + userPageSize)
                    .map((user) => (
                      <TableRow key={user.sub}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                          {user.Points.length > 0 ? (
                            <>
                            {user.Points[0].points}
                            </>
                          ) : (
                            <>
                            0
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {shirtsClaimed.filter((x) => x.userID === user.sub)
                            .length > 0 ? (
                              <>
                                <Button disabled={true}>Claimed</Button>
                              </>
                          ) : (
                            <Button
                              onClick={() => {
                                claimShirt(user);
                                setTryingToClaimShirt(true);
                              }}
                              isLoading={tryingToClaimShirt}
                              loadingText="Claiming"
                              isDisabled={user.Points.length == 0 || user.Points[0].points < 5}
                            >
                              {user.Points.length == 0 || user.Points[0].points < 5 ? (
                                <>
                                  Not enough points
                                </>
                              ) : (
                                <>
                                  Claim
                                </>
                              )}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {hoodiesClaimed.filter((x) => x.userID === user.sub)
                            .length > 0 ? (
                              <>
                                <Button disabled={true}>Claimed</Button>
                              </>
                          ) : (
                            <Button
                              onClick={() => {
                                claimHoodie(user);
                                setTryingToClaimHoodie(true);
                              }}
                              isLoading={tryingToClaimHoodie}
                              loadingText="Claiming"
                              isDisabled={user.Points.length == 0 || user.Points[0].points < 20}
                            >
                              {user.Points.length == 0 || user.Points[0].points < 20 ? (
                                <>
                                  Not enough points
                                </>
                              ) : (
                                <>
                                  Claim
                                </>
                              )}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {sleepingBagsClaimed.filter((x) => x.userID === user.sub)
                            .length > 0 ? (
                              <>
                                <Button disabled={true}>Claimed</Button>
                              </>
                          ) : (
                            <Button
                              onClick={() => {
                                claimSleepingBag(user);
                                setTryingToClaimHoodie(true);
                              }}
                              isLoading={tryingToClaimSleepingBag}
                              loadingText="Claiming"
                            >
                              Claim
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  }
              </TableBody>
            </Table>
            <Flex marginTop={"1em"} direction={"row"} justifyContent={"center"} alignItems={"center"} gap={"large"}>
              <Pagination
                currentPage={userPage}
                totalPages={Math.ceil(Object.keys(filteredUsers).length / userPageSize)}
                siblingCount={1}
                onChange={(newPageIndex, previousPageIndex) => {
                  setUserPage(newPageIndex);
                }}
                onNext={() => {
                  setUserPage(userPage + 1);
                }}
                onPrevious={() => {
                  setUserPage(userPage - 1);
                }}
              />
              <Flex direction={"row"} alignItems={"center"}>
                <SelectField
                  label="" 
                  labelHidden={true}
                  onChange={(e) => {
                    setUserPageSize(parseInt(e.target.value));
                    localStorage.setItem("userPageSize", e.target.value);
                  }}
                  defaultValue={userPageSize.toString()}
                  size={"small"}
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </SelectField>
                <Text>users per page</Text>
              </Flex>
            </Flex>
          </>
          )}
        </View>
      </Flex>
    </div>
  );
};

export default ShopPage;
