import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";

interface DateInputProps {
  id: string;
  register: any;
  errors: any;
  cursor: any;
}

const DateInput = ({ id, register, errors, cursor }: DateInputProps) => (
  <FormControl id={id} isInvalid={!!errors[id]}>
    <Input
      type="date"
      {...register(id)}
      defaultValue={new Date().toISOString().split("T")[0]}
      cursor={cursor}
    />
    <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
  </FormControl>
);

export default DateInput;
