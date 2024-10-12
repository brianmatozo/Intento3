import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import ShowClients from "components/client/ShowClients";
import CourseForm from "components/forms/CourseForm";
import FormComponent from "components/forms/FormComponent";
import UserPopover from "components/ui/UserPopover";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
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
        <Flex justify="space-between" align="center" p={4} bg="gray.100">
          <Text fontSize="xl">
            Welcome, {sessionData.user?.name || "User"}!
          </Text>
          <UserPopover
            name={sessionData.user?.name || "User"}
            email={sessionData.user?.email || undefined}
          />
        </Flex>

        <Tabs isLazy>
          <TabList display={"flex"}>
            <Tab>Inscribir Alumno</Tab>
            <Tab>Ver Alumnos</Tab>
            <Tab>Crear Cursos</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FormComponent />
            </TabPanel>
            <TabPanel>
              <ShowClients />
            </TabPanel>
            <TabPanel>
              <CourseForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
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
