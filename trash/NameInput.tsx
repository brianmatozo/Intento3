import { FormControl, FormLabel, Select, Box } from "@chakra-ui/react";
import { Controller } from "react-hook-form"; // Adjust the import path
import { courseSchema } from "schema/coursesSchemas";
import { z } from "zod";

type CourseFormData = z.infer<typeof courseSchema>;


const CourseNameInput = ({ control, errors }: { control: any; errors: any }) => {
  return (
    <FormControl isInvalid={!!errors.name}>
      <FormLabel htmlFor="name">Nombre del Curso</FormLabel>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Select {...field}>
            <option value="Refrigeracion">Refrigeracion</option>
            <option value="Lavarropas">Lavarropas</option>
            <option value="Electronica">Electronica</option>
            <option value="Esp. Refrigeracion">Esp. Refrigeracion</option>
            <option value="Esp. Lavarropas">Esp. Lavarropas</option>
            <option value="Rep. Plaquetas">Rep. Plaquetas</option>
          </Select>
        )}
      />
      {errors.name && (
        <Box color="red.500">{errors.name.message}</Box>
      )}
    </FormControl>
  );
};

export default CourseNameInput;
