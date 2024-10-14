import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

const ExpirationDateInput = ({ control, watch, errors }: { control: any; watch: any; errors: any }) => {
  // const { control, watch } = useFormContext();
  const mode = watch("mode");

  return (
    <FormControl isInvalid={!!errors.expirationDate}>
      <Flex alignItems="center">
        <FormLabel htmlFor="mode">Online Course</FormLabel>
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <Checkbox
              mb={2}
              id="mode"
              isChecked={field.value}
              onChange={(e) => field.onChange(e.target.checked)} // Toggle between online and presencial
            />
          )}
        />
      </Flex>

      <FormLabel htmlFor="expirationDate">Expiration Date</FormLabel>
      <Input
        type="date"
        isDisabled={!mode}
        {...control.register("expirationDate")}
      />
      <FormErrorMessage>{errors.expirationDate?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ExpirationDateInput;
