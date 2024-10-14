import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage, Box } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const ClassCountInput = ({ control, watch, errors }: { control: any; watch: any; errors: any }) => {
  const mode = watch("mode");

  return (
    <FormControl isInvalid={!!errors.classCount}>
      <FormLabel>Cantidad de Clases</FormLabel>
      
        <Controller
          name="classCount"
          control={control}
          render={({ field }) => (
            <NumberInput min={1} isDisabled={mode} value={field.value ?? 1} onChange={(valueString, valueNumber) => field.onChange(valueNumber)}>
            <NumberInputField {...field} value={field.value || ''} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      <FormErrorMessage>{errors.classCount?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ClassCountInput;
