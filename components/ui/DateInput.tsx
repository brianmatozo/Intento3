import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";

interface DateInputProps {
  id: string;
  register: any;
  errors: any;
}

const DateInput = ({ id, register, errors }: DateInputProps) => (
  <FormControl id={id} isInvalid={!!errors[id]}>
    <Input
      type="date"
      {...register(id)}
      defaultValue={new Date().toISOString().split("T")[0]}
    />
    <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
  </FormControl>
);

export default DateInput;
