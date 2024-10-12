import {
  Box,
  Card,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Client } from "models/client";
import ClientLegajo from "components/client/ClientLegajo";
import { clientSchema } from "schema/clientSchema";
import ClientFormFields from "components/client/ClientFormFields";
import ClientFormHeader from "components/client/ClientFormHeader";

type FormData = z.infer<typeof clientSchema>;

const FormComponent = () => {
  const [lastClient, setLastClient] = useState<Client | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitted Data: ", data);
    try {
      const response = await axios.post("/api/clientForm", data);
      setLastClient(response.data);
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Card p={4}>
        <FormProvider {...methods}>
          <ClientFormHeader />
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ClientFormFields
              register={methods.register}
              errors={methods.formState.errors}
            />
          </form>
        </FormProvider>
      </Card>
      <ClientLegajo lastClient={lastClient} />
    </Box>
  );
};

export default FormComponent;
