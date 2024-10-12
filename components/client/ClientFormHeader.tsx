import { Flex, FormLabel, Heading, Switch } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const ClientFormHeader = () => {
  const { control } = useFormContext();

  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Heading size={"lg"}>Ingresar cliente</Heading>
      <Flex align="center" justify="space-between" width="150px" mt={2}>
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <>
              <FormLabel htmlFor="mode-switch" mb="0" width="100px">
                {field.value === "online" ? "Online" : "Presencial"}
              </FormLabel>
              <Switch
                id="mode-switch"
                isChecked={field.value === "online"}
                onChange={(e) =>
                  field.onChange(e.target.checked ? "online" : "presencial")
                }
              />
            </>
          )}
        />
      </Flex>
    </Flex>
  );
};

export default ClientFormHeader;
