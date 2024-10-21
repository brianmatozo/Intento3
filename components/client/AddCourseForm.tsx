import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input, Select, VStack } from "@chakra-ui/react";
import { onlineCourse } from "models/online";

interface AddCourseFormProps {
  onAddCourse: (newCourse: Omit<onlineCourse, '_id'>) => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onAddCourse }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<onlineCourse, "_id">>();

  // Date formatting logic
  const formattedCurrentDate = new Date().toISOString().slice(0, 10); 
  const defaultExpirationDate = new Date();
  defaultExpirationDate.setMonth(defaultExpirationDate.getMonth() + 6); 
  const formattedDefaultExpirationDate = defaultExpirationDate
    .toISOString()
    .slice(0, 10); // Format to "YYYY-MM-DD"

  const onSubmit = (data: Omit<onlineCourse, '_id'>) => {
    onAddCourse({
      ...data,
      startDate: new Date(data.startDate),
      expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
      certification: false, // Initial values for certification and matricula
      matricula: false,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nuevo Curso</FormLabel>
          <Select
            defaultValue="Refrigeracion"
            placeholder="Elegir..."
            {...register("name", { required: "Elegir una opcion" })}
          >
            <option value="Refrigeracion">Refrigeracion</option>
            <option value="Lavarropas">Lavarropas</option>
            <option value="Electronica">Electronica</option>
            <option value="Esp. Refrigeracion">Esp. Refrigeracion</option>
            <option value="Esp. Lavarropas">Esp. Lavarropas</option>
            <option value="Rep. Plaquetas">Rep. Plaquetas</option>
          </Select>
          {/* <FormErrorMessage>{errors.name && <p>{errors.name.message}</p>}</FormErrorMessage> */}
        </FormControl>

        <FormControl isInvalid={!!errors.startDate} hidden>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            defaultValue={formattedCurrentDate}
            {...register("startDate")}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.expirationDate} hidden>
          <FormLabel>Expiration Date (Optional)</FormLabel>
          <Input
            type="date"
            defaultValue={formattedDefaultExpirationDate}
            {...register("expirationDate")}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Add Course
        </Button>
      </VStack>
    </Box>
  );
};

export default AddCourseForm;
