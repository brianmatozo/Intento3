import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  register: any;
  errors: any;
  icon?: React.ReactNode;
  type?: string;
}

const TextInput = ({
  id,
  label,
  placeholder,
  register,
  errors,
  icon,
  type = "text",
}: TextInputProps) => (
  <FormControl id={id} isInvalid={!!errors[id]}>
    <InputGroup>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input type={type} {...register(id)} placeholder={placeholder} />
      <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
    </InputGroup>
  </FormControl>
);

export default TextInput;
