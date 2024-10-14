import { Avatar, Badge, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { Client } from "models/client";
import { useState } from "react";
import { getBadgeColor } from "schema/courseColorSchema";

interface ClientItemProps {
  client: Client;
}

const ClientItem = ({ client }: ClientItemProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <Box p={4} mb={4} borderRadius="md" boxShadow="md" bg="white">
      <Flex align="center" mb={4}>
        <Box display={{base: "none", md: "block"}}>
        <Avatar name={client.fullname} size="lg" mr={4} />
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {client.fullname}
          </Text>
          <Flex direction={{base: "column", md: "row"}}>
            <Tooltip label={isCopied ? "Copied!" : "Click to copy"} placement="top" hasArrow>
              <Box mr={2} cursor="pointer" onClick={() => handleCopy(client.phonenumber)} _hover={{ textDecoration: "underline" }}>
                <Text>{client.phonenumber}</Text>
              </Box>
            </Tooltip>
            <Tooltip label={isCopied ? "Copied!" : "Click to copy"} placement="top" hasArrow>
              <Box mr={2} cursor="pointer" onClick={() => handleCopy(client.email)} _hover={{ textDecoration: "underline" }}>
                <Text>{client.email}</Text>
              </Box>
            </Tooltip>
          </Flex>
          {/* <Badge colorScheme={getBadgeColor(client.courses)} variant="solid" mt={1}>
            {client.courses}
          </Badge> */}
        </Box>
      </Flex>
      <Flex justify="space-between" mt={4}>
        <Box>
          <Text fontWeight="bold">Monto:</Text>
          <Text>${client.amount}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Date:</Text>
          <Text>{new Date(client.date).toLocaleDateString()}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ClientItem;
