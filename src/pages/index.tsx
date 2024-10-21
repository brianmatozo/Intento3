import {
  Avatar,
  Box,
  Divider,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ShowClients from "components/client/ShowClients";
import FormComponent from "components/forms/FormComponent";
import DarkModeToggle from "components/ui/userColorMode";
import UserPopover from "components/ui/UserPopover";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <Box maxW={"xl"} mx={"auto"} mt={8}>
        <Spinner size={"xl"} />
      </Box>
    );
  }
  if (!sessionData) {
    router.push("/signin");
    return null;
  }

  return (
    <>
      <main>
      
      <Box p={4}>
        <Flex justify="space-between" align="center">
          <Avatar src='/megaservice.svg'/>
          <DarkModeToggle />
          <UserPopover name={sessionData.user?.name ?? "User"} email={sessionData.user?.email ?? undefined} />
        </Flex>
      </Box>
      <Divider />
      <Box p={4}>
        <Tabs variant={"enclosed"}>
          <TabList>
            <Tab>Inscribir Alumno</Tab>
            <Tab>Ver Alumnos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormComponent />
            </TabPanel>
            <TabPanel>
              <ShowClients />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context).catch(() => null);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
