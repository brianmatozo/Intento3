import {
  Box,
  Button,
  Card,
  Flex,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Client } from "models/client";
import { clientSchema } from "schema/clientSchema";
import ClientInputs from "components/client/ClientInputs";
import ClientModeSwitch from "components/client/ClientModeSwitch";
import ClientLegajo from "components/client/ClientLegajo";

type FormData = z.infer<typeof clientSchema>;

const FormComponent = () => {
  const [lastClient, setLastClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isClient, setIsClient] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      mode: false,
      onlineCourses: [],
      paymentOptions: "COAPSA",
    },
  });

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitted Data: ", data);
    try {
      const response = await axios.post("/api/clients", data);
      setLastClient(response.data);
      methods.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="md" mx="auto">
      <Card p={4}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ClientInputs />
            <ClientModeSwitch />
            <Flex justifyContent="center" alignItems="center">
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Enviar
              </Button>
            </Flex>
          </form>
        </FormProvider>

      </Card>
      {lastClient && <ClientLegajo lastClient={lastClient} />}
    </Box>
  );
};

export default FormComponent;
