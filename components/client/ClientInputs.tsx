import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  VStack,
  Flex,
  Select,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import { clientSchema } from "schema/clientSchema";

type FormData = z.infer<typeof clientSchema>;

const ClientInputs = () => {
const {
  control,
  formState: { errors },
} = useFormContext<FormData>();

return (
  <Box>
    <VStack spacing={2} align="stretch">
      <FormControl id="fullname" isInvalid={!!errors.fullname}>
        <Controller
          name="fullname"
          control={control}
          defaultValue="" // Ensure initial value is set
          render={({ field }) => (
            <Input {...field} placeholder="Nombre completo" />
          )}
        />
        <FormErrorMessage>{errors.fullname?.message}</FormErrorMessage>
      </FormControl>

      <FormControl id="phonenumber" isInvalid={!!errors.phonenumber}>
        <Controller
          name="phonenumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input {...field} placeholder="Numero de telefono" type="tel" />
            </InputGroup>
          )}
        />
        <FormErrorMessage>{errors.phonenumber?.message}</FormErrorMessage>
      </FormControl>

      <FormControl id="email" isInvalid={!!errors.email}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input {...field} placeholder="Email" />
            </InputGroup>
          )}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <Flex >
      <FormControl id="paymentOptions" isInvalid={!!errors.paymentOptions} flex={3}>
        <Controller
          name="paymentOptions"
          control={control}
          defaultValue="COAPSA"
          render={({ field }) => (
            <Select {...field} ref={null}>
              <option value="Efectivo">Efectivo</option>
              <option value="COAPSA">COAPSA</option>
              <option value="PABLO.BIANCHI">PABLO.BIANCHI</option>
              <option value="Carlos1971Marquez">Carlos1971Marquez</option>
            </Select>
          )}
        />
        <FormErrorMessage>
          {errors.paymentOptions?.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl id="amount" isInvalid={!!errors.amount} flex={5}>
        <Controller
          name="amount"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                $
              </InputLeftElement>
              <Input type="number" {...field} placeholder="Enter amount" />
            </InputGroup>
          )}
        />
        <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
      </FormControl>

      <FormControl id="paymentNumber" isInvalid={!!errors.paymentNumber} flex={4} >
        <Controller
          name="paymentNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup>
              <Input type="text" {...field} placeholder="Nro.Comprobante" />
            </InputGroup>
          )}
        />
        <FormErrorMessage>{errors.paymentNumber?.message}</FormErrorMessage>
      </FormControl>
      </Flex>

      <FormControl id="date">
        <Flex>
        <FormLabel mt={2} display={{ base: "none", md: "block" }}>Hoy</FormLabel>
        <Controller
          name="date"
          control={control}
          defaultValue={new Date().toISOString().slice(0, 16) as any}
          render={({ field }) => (
            <Input
              type="datetime-local"
              {...field}
              value={
                field.value
                  ? new Date(field.value).toISOString().slice(0, 16)
                  : ""
              }
              disabled
            />
          )}
        />
        </Flex>
      </FormControl>
    </VStack>
  </Box>
);
};

export default ClientInputs;
