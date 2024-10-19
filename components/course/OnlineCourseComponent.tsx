import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Checkbox,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { onlineCourseSchema } from "schema/onlineCourseSchema";
import { z } from "zod";

type OnlineCourseFormData = z.infer<typeof onlineCourseSchema>;

const OnlineCourseComponent = forwardRef<HTMLSelectElement, any>(
  ({ index, ...props }, ref) => {
   
    const {
      control,
      formState: { errors },
    } = useFormContext<{ onlineCourses: OnlineCourseFormData[] }>();

    const formattedCurrentDate = new Date().toISOString().slice(0, 10); 
    const defaultExpirationDate = new Date();
    defaultExpirationDate.setMonth(defaultExpirationDate.getMonth() + 6);
    const formattedDefaultExpirationDate = defaultExpirationDate
      .toISOString()
      .slice(0, 10); // Format to "YYYY-MM-DD"

    return (  
      <Box mt={2}>
        <FormControl id={`onlineCourses.${index}.name`} isInvalid={!!errors.onlineCourses?.[0]?.name}>
          <FormLabel fontSize={"sm"}>Curso</FormLabel>
          <Controller
            name={`onlineCourses.${index}.name`} // Accessing the first course in the onlineCourses array
            control={control}
            defaultValue="Refrigeracion"
            render={({ field }) => (
              <Select {...field} ref={null} size={"sm"}>
                <option value="Refrigeracion">Refrigeracion</option>
                <option value="Lavarropas">Lavarropas</option>
                <option value="Electronica">Electronica</option>
                <option value="Esp. Refrigeracion">Esp. Refrigeracion</option>
                <option value="Esp. Lavarropas">Esp. Lavarropas</option>
                <option value="Rep. Plaquetas">Rep. Plaquetas</option>
              </Select>
            )}
          />
          <FormErrorMessage>
            {errors.onlineCourses?.[0]?.name?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          id={`onlineCourses.${index}.startDate`}
          isInvalid={!!errors.onlineCourses?.[0]?.startDate}
          py={2}
        >
          <FormLabel fontSize={"sm"}>Fecha de inicio</FormLabel>
          <Controller
            name={`onlineCourses.${index}.startDate`} // Accessing the first course's start date
            control={control}
            defaultValue={new Date()} // Default to the current date
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                size={"sm"}
                value={
                  field.value
                    ? new Date(field.value).toISOString().slice(0, 10)
                    : formattedCurrentDate
                } // Format date for input
              />
            )}
          />
          <FormErrorMessage>
            {errors.onlineCourses?.[0]?.startDate?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          id={`onlineCourses.${index}.expirationDate`}
          isInvalid={!!errors.onlineCourses?.[0]?.expirationDate}
        >
          <FormLabel fontSize={"sm"}>Fecha de expiración</FormLabel>
          <Controller
            name={`onlineCourses.${index}.expirationDate`}// Accessing the first course's expiration date
            control={control}
            defaultValue={defaultExpirationDate} // Set to 6 months from now
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                size={"sm"}
                value={
                  field.value
                    ? new Date(field.value).toISOString().slice(0, 10)
                    : formattedDefaultExpirationDate
                } // Format for date input
              />
            )}
          />
          <FormErrorMessage>
            {errors.onlineCourses?.[0]?.expirationDate?.message}
          </FormErrorMessage>
        </FormControl>

        <HStack mt={4}>
          <Box bg={"teal.500"} p={2} rounded={"md"}>
            <FormControl id={`onlineCourses.${index}.certification`}>
              <Controller
                name={`onlineCourses.${index}.certification`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    size={"lg"}
                    value="certification"
                    isChecked={field.value}
                    onChange={field.onChange}
                    colorScheme="teal"
                    textColor={"white"}
                  >
                    Certificación
                  </Checkbox>
                )}
              />
            </FormControl>
          </Box>
          <Box bg={"teal.500"} p={2} rounded={"md"}>
            <FormControl id={`onlineCourses.${index}.matricula`}>
              <Controller
                name={`onlineCourses.${index}.matricula`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    size="lg"
                    value="matricula"
                    isChecked={field.value}
                    onChange={field.onChange}
                    colorScheme="teal"
                    textColor={"white"}
                  >
                    Matrícula
                  </Checkbox>
                )}
              />
            </FormControl>
          </Box>
        </HStack>
      </Box>
    );
  }
);
export default OnlineCourseComponent;
