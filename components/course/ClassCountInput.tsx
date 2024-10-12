import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const ClassCountInput = ({ control, watch }: { control: any; watch: any }) => {
  const mode = watch("mode");

  return (
    <FormControl>
      <FormLabel>Cantidad de Clases</FormLabel>
      <NumberInput min={0} isDisabled={mode}>
        <Controller
          name="classCount"
          control={control}
          render={({ field }) => (
            <NumberInputField
              {...field}
              value={field.value || ''} // Handle controlled input
            />
          )}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

export default ClassCountInput;
