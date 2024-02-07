import React, { FC } from "react";
import styles from "./ChallengesPage.module.scss";

import { AmplifyUser, AuthEventData } from "@aws-amplify/ui";
import {
  View,
  Heading,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Text,
  Flex,
  TabItem,
  Tabs,
} from "@aws-amplify/ui-react";

interface DatasetPageProps {
  user?: AmplifyUser;
  signOut?: (data?: AuthEventData | undefined) => void;
}

const ChallengesTabMap = new Map<string, number>([
  ["/nsa", 0],
  ["/elevance", 1],
  ["/traversaalai", 2],
]);

const ChallengesPage: FC<DatasetPageProps> = ({ user, signOut }) => (
  <div className={styles.ChallengesPage}>
    <Flex direction={"column"} padding="medium" alignItems={"center"}>
      <View width={"85%"}>
        <Heading level={3} marginBottom={"medium"} marginTop={"medium"}>
          Challenges
        </Heading>
        <Text marginBottom={"1em"}>Try your hand at a challenge for a more guided project and the opportunity to win cash prizes.</Text>
        <Tabs 
          spacing="relative" 
          defaultIndex={ChallengesTabMap.get(window.location.pathname) ?? 0} 
          grow={1}
          onChange={(index: string | number) => {
            let ChallengesTabMapRev = Array.from(ChallengesTabMap.keys());
            let i = parseInt(index as string);
            window.history.pushState({}, "Challenge", ChallengesTabMapRev[i]);
          }}
          width={"70%"}
        >
          <TabItem title="National Security Agency" width="10%">
            <Heading marginTop={"1em"} level={4}>NSA Cybersecurity Anomaly Detection Challenge</Heading>
            <Heading marginTop={"1em"} level={5}>Scenario</Heading>
            <Text>You are in charge of detecting anomalous logins, domains, and IPs to defend a company and a college campus.</Text>
            <Heading marginTop={"1em"} level={5}>Overview</Heading>
            <Text>
              There are 3 challenges of increasing difficulty. The last challenge will tie break on score and efficiency.
              Your mission is to: Determine which logins, domains, and IP addresses are anomalous to answer the guided questions. 
              (Each challenge is independent of each other.)
            </Text>
            <Heading level={5} marginTop={"1em"}>The Challenges</Heading>
            <ul>
              <li>Given a company's login and logout events, determine which users are working weird shifts or whose account 
              become active after they're no longer with the company.</li>
              <li>Given the DNS lookups from a college campus, determine which domains and hosts exhibit odd behaviors.</li>
              <li>Given the netflow for SSH connections into a campus, determine friend from foe.</li>
            </ul>
            <Heading level={5} marginTop={"1em"}>How to Register</Heading>
            <ul>
              <li>Navigate to [TBA].</li>
              <li>Register using an email you have access to in case we need to reach out.</li>
              <li>Create or join a team.</li>
              <li>Navigate to the "Challenges" tab to begin solving!</li>
            </ul>
            <Heading level={5} marginTop={"1em"}>Prizes (team): 1st: $500. 2nd: $300. 3rd: $200. 
            $80 swag.</Heading>
          </TabItem>

          <TabItem title="Assurant" width="10%">
            <Heading marginTop={"1em"} level={4}>Assurant Challenge</Heading>
            <Heading marginTop={"1em"} level={5}>Challenge 1 – AI Driven House Assessment</Heading>
            <Text>
              Implement Multi-Mode Generative AI technology to evaluate the health of a property through image analysis and 
              feature examination. This project aims to effectively distill critical information, presenting a clear summary of 
              a house's overall state and specific issues.
            </Text>
            <Text marginTop={"1em"}>Additionally, the project will focus on:</Text>
            <ul>
              <li>Summarizing the overall health of the house using photographic and text data.</li>
              <li>Promptly identifying and diagnosing immediate structural or functional concerns.</li>
              <li>Predicting and highlighting potential issues likely to arise within a 3-6 month timeframe.</li>
              <li>Generating the top three insights as tailored maintenance and protection recommendations for homeowners, 
                based on the individual condition of their house.</li>
            </ul>
            <Heading marginTop={"1em"} level={5}>Challenge 2 – Insuring the Future: AI-Driven Drone Insurance Landscape</Heading>
            <Text marginBottom={"1em"}>
              As an insurer specializing in drone coverage, you are tasked with evaluating the drone market's growth sectors and 
              identifying potential risks for personal and commercial drones. Your analysis should encompass one or multiple of the 
              following areas:
            </Text>
            <ul>
              <li>Market Analysis: Investigate market trends, price elasticity, and sensitivity across various customer segments, including 
                categories and geographical locations.</li>
              <li>Cost Analysis: Conduct a comprehensive analysis of the cost structure for different drone categories.</li>
              <li>Risk Assessment: Identify and evaluate the most common risks and their consequences for drones, along with the Lifetime Value 
                (LTV) of various drone categories.</li>
              <li>Environmental Impact Study: Assess the CO2 emissions associated with each drone category.</li>
            </ul>
            <Text>
              Furthermore, develop a Machine Learning solution for rapid insight generation. The insights can be descriptive 
              analytics or predictive analytics. The creation of an API or Microservice for proactive insight delivery would be 
              advantageous. Finally, devise an Optimal Strategy for initiating drone insurance in the market, taking into account 
              the aforementioned factors. A Mathematical Model with Optimal Solution is a bonus.
            </Text>

            <Heading level={5} marginTop={"1em"}>Prizes: 1st: Job interview for all team members. $1200 plaque. $200 swag. 2nd: Job interview for one member. 
            $80 swag.</Heading>
          </TabItem>

          <TabItem title="Archetype AI" width="10%">
            <Heading marginTop={"1em"} level={4}>Archetype AI Challenge</Heading>
            <Heading marginTop={"1em"} level={5}>Multimodal AI Challenge</Heading>
            <Text>
              Archetype AI has built a multimodal AI foundation model that fuses real time sensor data (video, audio, radar, 
              time series) and natural language to reason about the physical world and discover hidden insights. This pre-trained 
              foundational model makes it possible for developers to rapidly build physical AI applications. For this challenge,
              build a camera-based physical AI application to uncover something in the world around you.
              
              Submit your results in any form.
            </Text>
            <Heading level={5} marginTop={"1em"}>Prizes (team): 1st: $400. 2nd: $100.</Heading>
          </TabItem>

          <TabItem title="Elevance Healthcare" width="10%">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell as="th" width={"10%"}>Theme</TableCell>
                  <TableCell as="th" width={"20%"}>Challenge Statement</TableCell>
                  <TableCell as="th" width={"40%"}>Description</TableCell>
                  <TableCell as="th">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Gen AI</TableCell>
                  <TableCell>Build Text to SQL translation using generative AI.</TableCell>
                  <TableCell>
                    Develop a model using any opensource LLM.
                    <ul>
                      <li>Use clear instructions — simple and straightforward natural language prompts are easier for 
                        the LLM to comprehend and translate.</li>
                      <li>Provide sufficient context — the LLM needs to understand the user is asking for an SQL query and 
                          details about the database schema like table and column names.</li>
                      <li>Include examples — providing a few sample natural language prompt and SQL query pairs can help guide 
                          the LLM to generate queries in the right syntax.</li>
                      <li>Leverage RAG (Retrieval Augmented Generation) — retrieving relevant sample natural language prompt and 
                        SQL query pairs can improve accuracy.</li>
                    </ul>
                  </TableCell>
                  <TableCell>English will be the new SQL. Analyze Enterprise Data in a More Intuitive and Interactive Way with the 
                    generative AI model. Business users can generate analytics without a dependency on IT Teams.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gen AI</TableCell>
                  <TableCell>Develop a solution using generative AI that synthesizes comprehensive and contextually accurate clinical notes 
                    from fragmented electronic health records (EHR) data.</TableCell>
                  <TableCell>
                    When an individual’s health record is stitched together from various sources from where an individual 
                    receives care or generates signal about one’s health, it enhances communication and decision making among 
                    healthcare providers, ensuring a more holistic view of the patient’s medical history. Develop a solution 
                    that intelligently summarizes and renders an individual’s exhaustive medical history for streamlined and 
                    accelerated access and understanding. The solution may address any part of the provider EHR workflow, 
                    including documentation or chart review, or both.
                  </TableCell>
                  <TableCell>
                    Clinicians spend an average of 16 minutes on each patient at the time of each encounter for chart 
                    review (33%), documentation (24%) and ordering (17%). Novel techniques in generative AI have the capacity to
                    accelerate both clinically accurate and semantic understanding of prior records or generate new documentation 
                    based upon an encounter. 

                    Streamline information exchange, improve continuity of care, increase efficiency in healthcare delivery, 
                    reduce administrative burden on clinicians to allow for more impactful interaction with the patient.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Heading level={5} marginTop={"1em"}>Prizes: 1st: Job interview for all team members. 2nd: $200 swag. 3rd: $200 swag.</Heading>
          </TabItem>
        </Tabs>
      </View>
    </Flex>
  </div>
);

export default ChallengesPage;
