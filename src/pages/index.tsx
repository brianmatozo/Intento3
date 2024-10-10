import { Box, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ShowClients from "components/client/ShowClients";
import FormComponent from "components/forms/FormComponent";
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
        <Tabs>
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