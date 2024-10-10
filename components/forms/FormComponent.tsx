import { Box, Card, Heading, Stack, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Client } from "models/client";
import TextInput from "components/ui/TextInput";
import DateInput from "components/ui/DateInput";
import ClientLegajo from "components/ui/ClientLegajo";

const formSchema = z.object({
  fullname: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
  phonenumber: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.string().email({ message: "Invalid email address" }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  date: z.string().nonempty({ message: "Date is required" }),
});

type FormData = z.infer<typeof formSchema>;

const FormComponent = () => {
  const [lastClient, setLastClient] = useState<Client | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitted Data: ", data);
    try {
      const response = await axios.post("/api/clientForm", data);
      setLastClient(response.data);
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Card p={4}>
        <Heading size={"lg"} mb={4}>Detalles del cliente</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <TextInput id="fullname" label="Full Name" placeholder="Nombre completo" register={register} errors={errors} icon={<div>🙋‍♂️</div>} />
            <TextInput id="phonenumber" label="Phone Number" placeholder="Numero de telefono" register={register} errors={errors} icon={<PhoneIcon color="gray.300" />} />
            <TextInput id="email" label="Email" placeholder="Correo electronico" register={register} errors={errors} icon={<EmailIcon color="gray.300" />} type="email" />
            <TextInput id="amount" label="Amount" placeholder="Monto de inscripción" register={register} errors={errors} icon={<div>$</div>} type="number" />
            <DateInput id="date" register={register} errors={errors} />
            <Button colorScheme="teal" type="submit">Enviar</Button>
          </Stack>
        </form>
      </Card>

      <ClientLegajo lastClient={lastClient} />
    </Box>
  );
};

export default FormComponent;
