import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ClassCountInput from "components/course/ClassCountInput";
import ClassScheduleInput from "components/course/ClassScheduleInput";
import ExpirationDateInput from "components/course/ExpirationDateInput";
import CourseNameInput from "components/course/NameInput";
import StartDateInput from "components/course/StartDateInput";
import { FormProvider, useForm } from "react-hook-form";
import { courseSchema } from "schema/coursesSchemas";
import { z } from "zod";
import { DevTool } from "@hookform/devtools"

type CourseFormData = z.infer<typeof courseSchema>;

const CourseForm = () => {
  const toast = useToast();
  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "" as CourseFormData["name"],
      startDate: "",
      expirationDate: undefined,
      certification: false,
      matricula: false,
      classCount: undefined,
      mode: false,
      classSchedule: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CourseFormData) => {
    console.log("Submitted Data: ", data);
    try {
      const response = await axios.post("/api/courses", data);

      if (!response.data.ok) {
        throw new Error(response.data.error);
      }

      const result = response.data.data;
      console.log("Course created:", result);

      toast({
        title: "Course created!",
        description: "Course created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: Error | any) {
      console.error("Error:", error);
      toast({
        title: "Error!",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
    p={5}
    borderWidth={1}
    maxW="md"
    mx="auto"
    borderRadius="md"
    boxShadow="md"
    >
      <FormProvider {...methods}>
      <>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <CourseNameInput
              control={methods.control}
              errors={methods.formState.errors}
            />
            <StartDateInput
              control={methods.control}
              errors={methods.formState.errors}
            />
            <ExpirationDateInput
              control={methods.control}
              watch={methods.watch}
              errors={methods.formState.errors}
            />
            <ClassCountInput
              control={methods.control}
              watch={methods.watch}
              errors={methods.formState.errors}
            />

            <ClassScheduleInput watch={methods.watch} />

            <Button mt={4} colorScheme="teal" type="submit">
              Create Course
            </Button>
          </Stack>
        </form>
    <DevTool control={methods.control} />
    </>
      </FormProvider>
    </Box>
  );
};

export default CourseForm;
