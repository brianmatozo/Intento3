import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const StartDateInput = ({ control, errors }: { control: any; errors: any }) => {
  return (
    <FormControl isInvalid={!!errors.startDate}>
      <FormLabel htmlFor="startDate">Fecha de Inicio</FormLabel>
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => <Input type="date" {...field} />}
      />
      {errors.startDate && (
        <Box color="red.500">{errors.startDate.message}</Box>
      )}
    </FormControl>
  );
};

export default StartDateInput;
