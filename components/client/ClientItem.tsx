// components/client/ClientItem.tsx
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
import CertificationStatus from "components/payments/CertificationStatus";
import PaymentHistory from "components/payments/PaymentHistory";
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from "lib/prices";
import { Client } from "models/client";
import { miscPayment } from "models/payments";
import React, { useEffect, useState } from "react";
import { getBadgeColor } from "schema/courseColorSchema";
import { MiscellaneousPayment } from "schema/miscPaymentSchemas";

interface ClientItemProps {
  client: Client;
  payments: miscPayment[];
}

const ClientItem: React.FC<ClientItemProps> = ({ client, payments: initialPayments })=> {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [courseStatuses, setCourseStatuses] = useState<{ [key: string]: { certification: boolean; matricula: boolean } }>({});
  const [certificationStatus, setCertificationStatus] = useState(false);
  const [matriculaStatus, setMatriculaStatus] = useState(false);
// certificationStatus: A state variable to track whether the client has met the certification payment requirement. Initially set to false.
// matriculaStatus: A state variable to track if the client has paid for matricula (enrollment). Initially set to false.
// courses: This state holds the list of online courses associated with the client, initialized from client.onlineCourses (or an empty array if not provided).
  const [courses, setCourses] = useState(client.onlineCourses || []);
  const [payments, setPayments] = useState(initialPayments); // Manage payments locally

  useEffect(() => {
    const updatedStatuses: {[key: string]: { certification: boolean; matricula: boolean }} = {};
    // For each course, calculate the certification/matricula status independently
    courses.forEach((course) => {
      const certificationTotal = payments
      ?.filter(p => p.paymentType === 'certification' && p.courseId?.toString() === course._id)
      ?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const matriculaTotal = payments
      ?.filter(p => p.paymentType === 'matricula' && p.courseId?.toString() === course._id)
      ?.reduce((sum, p) => sum + p.amount, 0) || 0;
      updatedStatuses[course._id] = { 
        certification: certificationTotal >= CERTIFICATION_PRICE, 
        matricula: matriculaTotal >= MATRICULA_PRICE };
    })
    setCourseStatuses(updatedStatuses);
  }, [payments, courses]);

// Purpose of useEffect: This hook recalculates the certification and matricula statuses whenever the payments array changes.
// certificationTotal: Filters the payments array to only include those of type 'certification'. It then sums up the amount of all these payments. If there are no payments of this type, it defaults to 0.
// matriculaTotal: Similarly, it filters for payments of type 'matricula' and sums up their amounts.
// After calculating the totals, it updates the certificationStatus and matriculaStatus based on whether the totals meet or exceed predefined prices (CERTIFICATION_PRICE and MATRICULA_PRICE).

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleStatusChange = async (payment: MiscellaneousPayment) => {
    try {
      const courseId = payment.courseId?.toString();
      setPayments((prevPayments) => [...prevPayments, payment]);
      const updatedStatus = {...courseStatuses }
      if (updatedStatus[courseId]) {
      if(payment.paymentType === 'certification') {
        const newCertificationTotal = payments
        .filter((p) => p.paymentType === 'certification' && p.courseId?.toString() === courseId)
        .reduce((sum, p) => sum + p.amount, 0) + payment.amount;
        updatedStatus[courseId].certification = newCertificationTotal >= CERTIFICATION_PRICE;
      }else if(payment.paymentType === 'matricula') {
        const newMatriculaTotal = payments
        .filter((p) => p.paymentType === 'matricula' && p.courseId?.toString() === courseId)
        .reduce((sum, p) => sum + p.amount, 0) + payment.amount;
        updatedStatus[courseId].matricula = newMatriculaTotal >= MATRICULA_PRICE;
      }}
      setCourseStatuses(updatedStatus);
    }catch(error) {
      console.error('Error updating payments status:', error);
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
          <ModalBody >
            {courses.map((course, index) => (
              <Box key={index}>
                  <Badge
                    colorScheme={getBadgeColor(course.name)}
                    variant="solid"
                    fontSize='1.1em'
                    mt={1}
                    >
                    {course.name}
                  </Badge>
                <CertificationStatus
                  clientId={client._id}
                  certificationStatus={courseStatuses[course._id]?.certification || false}
                  matriculaStatus={courseStatuses[course._id]?.matricula || false}
                  payments={payments.filter(p => p.courseId?.toString() === course._id)}
                  onStatusChange={handleStatusChange}
                  courseId={course._id}
                  />                  
                <Divider mt={2}/>
              </Box>
              ))}

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>

    {/* Display payment history below courses */}
    {/* <PaymentHistory payments={payments} /> */}

    </Box>
  );
};

export default ClientItem;
