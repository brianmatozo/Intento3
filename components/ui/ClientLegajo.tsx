import { Box, Card, Tooltip, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Client } from "models/client";

interface ClientDetailsProps {
  lastClient: Client | null;
}

const ClientLegajo = ({ lastClient }: ClientDetailsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `
      Nombre completo: ${lastClient?.fullname}
      Numero de Telefono: ${lastClient?.phonenumber}
      Correo electronico: ${lastClient?.email}
      Monto de inscripción: $${lastClient?.amount}
      Vendedores: Brian y Leandro
    `;
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset the tooltip text after 2 seconds
  };

  if (!lastClient) return null;

  return (
    <Card mt={8} p={4}>
      <Tooltip label={isCopied ? "Copied!" : "Click to copy"} placement="top" hasArrow>
        <Box mr={2} cursor="pointer" onClick={handleCopy} _hover={{ textDecoration: "underline" }}>
          <Text>
            Nombre completo: <br />
            {lastClient.fullname} <br />
            Numero de Telefono: <br />
            {lastClient.phonenumber} <br />
            Correo electronico: <br />
            {lastClient.email} <br />
            Monto de inscripción: <br />${lastClient.amount} <br />
            Vendedores: <br />
            Brian y Leandro
          </Text>
        </Box>
      </Tooltip>
    </Card>
  );
};

export default ClientLegajo;
