import { Button, FormControl, FormErrorMessage, FormLabel, Select, Stack } from '@chakra-ui/react'
import React from 'react'
import TextInput from '../ui/TextInput'
import DateInput from '../ui/DateInput'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'


interface ClientFormFieldsProps {
    register: any
    errors: any
}

const ClientFormFields = ({ register, errors }: ClientFormFieldsProps) => {
  return (
    <Stack spacing={4}>
    <TextInput id="fullname" label="Full Name" placeholder="Nombre completo" register={register} errors={errors} icon={<div>🙋‍♂️</div>} />
    <TextInput id="phonenumber" label="Phone Number" placeholder="Numero de telefono" register={register} errors={errors} icon={<PhoneIcon color="gray.300" />} />
    <TextInput id="email" label="Email" placeholder="Correo electronico" register={register} errors={errors} icon={<EmailIcon color="gray.300" />} type="email" />
    <TextInput id="amount" label="Amount" placeholder="Monto de inscripción" register={register} errors={errors} icon={<div>$</div>} type="number" />
    <FormControl isInvalid={!!errors.course}>
      <Select placeholder="Curso.." {...register("course")} cursor={"pointer"}>
        <option value="Refrigeracion">Refrigeracion</option>
        <option value="Lavarropas">Lavarropas</option>
        <option value="Electronica">Electronica</option>
        <option value="Esp. Refrigeracion">Esp. Refrigeracion</option>
        <option value="Esp. Lavarropas">Esp. Lavarropas</option>
        <option value="Rep. Plaquetas">Rep. Plaquetas</option>
      </Select>
      <FormErrorMessage>{errors.course?.message}</FormErrorMessage>
    </FormControl>
    <DateInput id="date" register={register} errors={errors} cursor={"pointer"}/>
    <Button colorScheme="teal" type="submit">Enviar</Button>
  </Stack>
  )
}

export default ClientFormFields