import { Box, Card, Tooltip, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Client } from "models/client";

interface ClientDetailsProps {
  lastClient: Client | null;
}

const ClientLegajo = ({ lastClient }: ClientDetailsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const clientDetails = () => `
    Nombre completo:
    ${lastClient?.fullname || ""}
    Numero de Telefono: 
    ${lastClient?.phonenumber || ""}
    Correo electronico: 
    ${lastClient?.email || ""}
    Monto de inscripción: 
    $${lastClient?.amount || 0}
    Curso: 
    ${lastClient?.courses || ""}
    Modalidad: 
    ${lastClient?.mode ? "online" : "presencial"}
    Vendedores: Brian y Leandro
  `;

  const handleCopy = async () => {
    const textToCopy = clientDetails();
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
            {clientDetails()}
          </Text>
        </Box>
      </Tooltip>
    </Card>
  );
};export default ClientLegajo;

