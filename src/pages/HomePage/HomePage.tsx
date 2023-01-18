import React, { FC, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";

import { View, Text, Loader, Flex, Card, Heading } from "@aws-amplify/ui-react";

import { AmplifyUser, AuthEventData } from "@aws-amplify/ui";
import { API } from "aws-amplify";
import { getAdminSettings, getPoints, listPoints } from "../../graphql";
import { AdminSettings } from "../../models/index";
import HacklyticsCard from "../../components/HacklyticsCard/HacklyticsCard";

// import { listTodos } from "../../graphql";
// import { API, graphqlOperation } from "aws-amplify";

interface HomePageProps {
  user?: AmplifyUser;
  signOut?: (data?: AuthEventData | undefined) => void;
}

const HomePage: FC<HomePageProps> = ({ user, signOut }) => {
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    id: "0",
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  const [points, setPoints] = useState<number>(0);
  const [pointsLoading, setPointsLoading] = useState(true);

  useEffect(() => {
    loadSettings(() => {
      setSettingsLoading(false);
    });
    loadPoints(() => {
      setPointsLoading(false);
    });
  }, []);

  const loadSettings = async (callback?: () => void) => {
    const res: any = await API.graphql({
      query: getAdminSettings,
      variables: {
        id: process.env.REACT_APP_HACKLYTICS_ADMIN_SETTINGS_ID,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setAdminSettings(res.data.getAdminSettings);
    if (callback) callback();
  };

  const loadPoints = async (callback?: () => void) => {
    // get points for user
    const res: any = await API.graphql({
      query: listPoints,
      variables: {
        userID: user?.attributes?.sub,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    let items = res.data.listPoints.items;

    if (items.length > 0) {
      setPoints(items[0].points);
      console.log(`you have ${items[0].points} points!`);
    } else {
      setPoints(0);
      console.log(`you have 0 points :(`);
    }

    if (callback) callback();
  };

  return (
    <div className={styles.HomePage}>
      <View width="100%" padding="medium">
        {settingsLoading || pointsLoading ? (
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Loader size={"large"} />
          </Flex>
        ) : adminSettings.hacklyticsOpen ? (
          // hacklytics is open :D (started)
          <Card variation="outlined">
            <Heading level={4}>Points</Heading>
            <Text>You have {points} points{points > 0 ? "!" : " :("}</Text>
          </Card>
        ) : (
          // hacklytics is closed :( (not started)
          <HacklyticsCard />
        )}
      </View>
    </div>
  );
};

// {user && (
//   <View width="100%" padding="1em">
//     <Text>dev Hello {user.attributes?.name}</Text>
//     {user.attributes &&
//       Object.values(user.attributes).map((attr, i) => (
//         <Text key={i}>{attr}</Text>
//       ))}
//     <Button onClick={signOut}>
//       <Text>Sign Out</Text>
//     </Button>
//   </View>
// )}

export default HomePage;
