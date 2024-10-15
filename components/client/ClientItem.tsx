import { Avatar, Badge, Box, Button, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import CertificationStatus from "components/course/CertificationStatus";
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from "lib/prices";
import { Client } from "models/client";
import React, { useEffect, useState } from "react";
import { getBadgeColor } from "schema/courseColorSchema";
import { MiscellaneousPayment } from "schema/miscPaymentSchemas";

interface ClientItemProps {
  client: Client;
  payments: MiscellaneousPayment[];
}

const ClientItem: React.FC<ClientItemProps> = ({ client, payments })=> {
  const [isCopied, setIsCopied] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [certificationStatus, setCertificationStatus] = useState(false);
  const [matriculaStatus, setMatriculaStatus] = useState(false);

  const [courses, setCourses] = useState(client.onlineCourses || []);

  useEffect(() => {
    const certificationTotal = payments?.filter(p => p.paymentType === 'certification')?.reduce((sum, p) => sum + p.amount, 0) || 0;
    const matriculaTotal = payments?.filter(p => p.paymentType === 'matricula')?.reduce((sum, p) => sum + p.amount, 0) || 0;

    setCertificationStatus(certificationTotal >= CERTIFICATION_PRICE);
    setMatriculaStatus(matriculaTotal >= MATRICULA_PRICE);
  }, [payments]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleStatusChange = async (payment: MiscellaneousPayment) => {
    // Here you would make an API call to save the new payment
    console.log('New payment:', payment);
    // Update the local state (this should be done after successful API call in real implementation)
    if (payment.amount === CERTIFICATION_PRICE) {
      setCertificationStatus(true);
    } else {
      // setMatriculaStatus(true);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const paymentDetails = `${client.amount} - ${client.paymentOptions || "No Declarado"} - ${client.paymentNumber || "No Declarado"}`;
  const handleCopyPayment = () => handleCopy(paymentDetails);
  
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
            <Tooltip label={isCopied ? "Copiado!" : "Copiar?"} placement="top" hasArrow>
              <Box mr={2} cursor="pointer" onClick={() => handleCopy(client.phonenumber)} _hover={{ textDecoration: "underline" }}>
                <Text>{client.phonenumber}</Text>
              </Box>
            </Tooltip>
            <Tooltip label={isCopied ? "Copiado!" : "Copiar?"} placement="top" hasArrow>
              <Box mr={2} cursor="pointer" onClick={() => handleCopy(client.email)} _hover={{ textDecoration: "underline" }}>
                <Text>{client.email}</Text>
              </Box>
            </Tooltip>
          </Flex>
          <div>
            {client.onlineCourses?.map((course, index) => (
              <Badge
                key={index}
                colorScheme={getBadgeColor(course.name)}
                variant="solid"
                mt={1}
                mr={1}
              >
                {course.name}
              </Badge>
            ))}
          </div>
        </Box>
      </Flex>
      <Flex justify="space-between" mt={4}>
        <Box>
          <Text fontWeight="bold">Monto:</Text>
          <Tooltip label={isCopied ? "Copiado!" : "Copiar?"} placement="top" hasArrow>
          <Text cursor={"pointer"} onClick={handleCopyPayment} _hover={{ textDecoration: "underline" }}>{paymentDetails}</Text>
          </Tooltip>
        </Box>
        <Box>
          <Text fontWeight="bold">Ingreso:</Text>
          <Text>{new Date(client.date).toLocaleDateString()}</Text>
        </Box>
      </Flex>

    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} mt={1}>
      <Button onClick={onOpen}>Ver certificados</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
            {courses.map((course, index) => (
              <Box key={index}>
                <Badge
                  colorScheme={getBadgeColor(course.name)}
                  variant="solid"
                >
                  {course.name}
                </Badge>
                <CertificationStatus
                  clientId={client._id}
                  certificationStatus={certificationStatus}
                  matriculaStatus={matriculaStatus}
                  onStatusChange={handleStatusChange}
                />
                <Divider mt={2}/>
              </Box>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>

    </Box>
  );
};

export default ClientItem;
