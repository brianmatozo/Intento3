import { Box, Card, Tooltip, Button } from "@chakra-ui/react";
import { useState } from "react";
import { CopyIcon } from "@chakra-ui/icons";
import type { Client } from "models/client";

interface ClientDetailsProps {
  lastClient: Client | null;
}

const ClientLegajo = ({ lastClient }: ClientDetailsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const clientDetails = () =>
    `🧑Nombre completo: 
${lastClient?.fullname ?? ""}

📱Numero de Telefono: 
${lastClient?.phonenumber ?? ""}

📧Correo electronico: 
${lastClient?.email ?? ""}

💰Detalles del Pago: 
$${lastClient?.amount ?? 0} - ${lastClient?.paymentOptions ?? ""} - ${lastClient?.paymentNumber ?? ""}

📍Curso: 
${lastClient?.onlineCourses?.map((course) => course.name).join(" - ") ?? ""} - ${lastClient?.mode ? "Online" : "Presencial"}

👻Vendedores:
Leandro y Brian
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
