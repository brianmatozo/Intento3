import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Highlight,
  Switch,
} from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Client } from "models/client";
import { clientSchema } from "schema/clientSchema";
import ClientInputs from "components/client/ClientInputs";
import { DevTool } from "@hookform/devtools";
import OnlineCourseComponent from "components/course/OnlineCourseComponent";
import ClientModeSwitch from "components/client/ClientModeSwitch";

type FormData = z.infer<typeof clientSchema>;

const FormComponent = () => {
  const [lastClient, setLastClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOnlineCourse, setShowOnlineCourse] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      mode: false,
      onlineCourses: [],
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

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
            {/* <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel htmlFor="mode" mt={2}>
                <Highlight
                  query="Cliente Online?"
                  styles={{
                    px: "2",
                    py: "1",
                    rounded: "full",
                    bg: "teal.500",
                    color: "white",
                  }}
                >
                  Cliente Online?
                </Highlight>
              </FormLabel>
              <Controller
                name="mode"
                control={methods.control}
                render={({ field }) => (
                  <Switch
                    isChecked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      setShowOnlineCourse(e.target.checked);
                    }}
                  />
                )}
              />
            </FormControl>
            {showOnlineCourse && (
              <Controller
                name="onlineCourses"
                control={methods.control}
                render={({ field }) => (
                  <OnlineCourseComponent
                    {...field}
                    defaultValue={[
                      {
                        name: "",
                        startDate: new Date().toISOString().slice(0, 16),
                        expirationDate: "",
                        certification: false,
                        matricula: false,
                      },
                    ]}
                    value={field.value}
                  />
                )}
              />
            )} */}

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
        {isClient && <DevTool control={methods.control} />}
      </Card>
    </Box>
  );
};

export default FormComponent;
