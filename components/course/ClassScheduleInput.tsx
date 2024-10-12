import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";
import { useFormContext, useFieldArray } from "react-hook-form";

const ClassScheduleInput = ({ watch }: { watch: any }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "classSchedule",
  });
  const mode = watch("mode");
  return (
    <FormControl>
      <FormLabel>Class Schedule</FormLabel>
      <Box>
        {fields.map((field, index) => (
          <Box key={field.id} mb={2}>
            <Input
              type="date"
              {...register(`classSchedule.${index}`)}
              defaultValue={field[field.id] || ""}
            />
            <Button ml={2} onClick={() => remove(index)}>Remove</Button>
          </Box>
        ))}
        <Button onClick={() => append({})} isDisabled={mode}>Add Date</Button>
      </Box>
    </FormControl>
  );
};

export default ClassScheduleInput;
