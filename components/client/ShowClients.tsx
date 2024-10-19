// components/client/ShowClients.tsx
import { Box, Button, Card, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ClientItem from "components/client/ClientItem";
// import ClientItem from "components/client/ClientItem";
import { Client } from "models/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  searchText: z.string().optional(),
});

type SearchFormInputs = z.infer<typeof searchSchema>;

const ShowClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
  });

  const fetchClients = async (searchText?: string) => {
    try {
      const response = await axios.get("/api/clients", {
        params: { searchText },
      });
      setClients(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("failed to fetch clients");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const onSubmit = (data: SearchFormInputs) => {
    setLoading(true);
    fetchClients(data.searchText);
  };

  if (loading) {
    return (
      <Box maxW={"xl"} mx={"auto"} mt={8}>
        <Spinner size={"xl"} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxW={"xl"} mx={"auto"} mt={8}>
        <Text color={"red.500"}>{error}</Text>
      </Box>
    );
  }

  return (
    <Box maxW="xl" mx="auto" mt={8}>
      <Card p={4}>
        <Heading size={"lg"} mb={4}>
          Alumnos
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={4} display={"flex"} alignItems={"center"}>
            <Input placeholder="Buscar.." {...register("searchText")} />
            <Button type="submit">Buscar</Button>
          </Box>
        </form>

        {clients.length > 0 ? (
          clients.map((client) => (
               <ClientItem key={client._id as string} client={client} payments={client.miscellaneousPayments || []} />
          ))
        ) : (
          <Text>No hay alumnos</Text>
        )}
      </Card>
    </Box>
  );
};

export default ShowClients;
