import { Box, Card, Tooltip, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Client } from "models/client";
import { CopyIcon } from "@chakra-ui/icons";

interface ClientDetailsProps {
  lastClient: Client | null;
}

const ClientLegajo = ({ lastClient }: ClientDetailsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const clientDetails = () =>
    `🧑Nombre completo: 
${lastClient?.fullname || ""}

📱Numero de Telefono: 
${lastClient?.phonenumber || ""}

📧Correo electronico: 
${lastClient?.email || ""}

💰Detalles del Pago: 
$${lastClient?.amount || 0} - ${lastClient?.paymentOptions || ""}

📍Curso: 
${lastClient?.onlineCourses?.map((course) => course.name) || ""} - ${lastClient?.mode ? "online" : "presencial"}

👻Vendedores:
Brian y Leandro
  `;

  const handleCopy = async () => {
    const textToCopy = clientDetails();
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset the tooltip text after 2 seconds
  };

  if (!lastClient) return null;

  return (
    <Card mt={8} p={4} align={"center"} shadow={"none"}>
      <Tooltip
        label={isCopied ? "Copied!" : "Click to copy"}
        placement="top"
        hasArrow
      >
        <Box mr={2}>
          <Button
            onClick={handleCopy}
            leftIcon={<CopyIcon />}
            colorScheme="teal"
            variant="outline"
          >
            Copiar Detalles del Cliente
          </Button>
        </Box>
      </Tooltip>
    </Card>
  );
};
export default ClientLegajo;
