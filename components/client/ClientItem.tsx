import { Avatar, Badge, Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from "lib/prices";
import { Client } from "models/client";
import { miscPayment } from "models/payments";
import { useEffect, useState } from "react";
import { MiscellaneousPayment } from "schema/miscPaymentSchemas";
import CertificationModal from "../ui/CertificationModal";
import { getBadgeColor } from "schema/courseColorSchema";
import { onlineCourse } from "models/online";
import axios from "axios";
import AddCourseForm from "./AddCourseForm";

interface ClientItemProps {
    client: Client;
    payments: miscPayment[];
  }
const ClientItem: React.FC<ClientItemProps> = ({ client, payments: initialPayments }) => {
const [isCopied, setIsCopied] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [courseStatuses, setCourseStatuses] = useState<{ [key: string]: { certification: boolean; matricula: boolean } }>({});
const [courses, setCourses] = useState(client.onlineCourses || []);
const [payments, setPayments] = useState(initialPayments);

useEffect(() => {
  const updatedStatuses: { [key: string]: { certification: boolean; matricula: boolean } } = {};

  courses.forEach((course) => {
    const certificationTotal = payments
      .filter(p => p.paymentType === 'certification' && p.courseId?.toString() === course._id)
      .reduce((sum, p) => sum + p.amount, 0) || 0;

    const matriculaTotal = payments
      .filter(p => p.paymentType === 'matricula' && p.courseId?.toString() === course._id)
      .reduce((sum, p) => sum + p.amount, 0) || 0;

    updatedStatuses[course._id] = {
      certification: certificationTotal >= CERTIFICATION_PRICE,
      matricula: matriculaTotal >= MATRICULA_PRICE
    };
  });
  setCourseStatuses(updatedStatuses);
}, [payments, courses]);

const handleStatusChange = async (payment: MiscellaneousPayment) => {
  const courseId = payment.courseId?.toString();
  setPayments((prevPayments) => [...prevPayments, payment]);

  const updatedStatus = { ...courseStatuses };
  if (updatedStatus[courseId]) {
    const certificationTotal = payments
      .filter(p => p.paymentType === 'certification' && p.courseId?.toString() === courseId)
      .reduce((sum, p) => sum + p.amount, 0) + payment.amount;

    const matriculaTotal = payments
      .filter(p => p.paymentType === 'matricula' && p.courseId?.toString() === courseId)
      .reduce((sum, p) => sum + p.amount, 0) + payment.amount;

    updatedStatus[courseId].certification = certificationTotal >= CERTIFICATION_PRICE;
    updatedStatus[courseId].matricula = matriculaTotal >= MATRICULA_PRICE;
  }
  setCourseStatuses(updatedStatus);
};

const handleCopy = async (text: string) => {
  await navigator.clipboard.writeText(text);
  setIsCopied(true);
  setTimeout(() => setIsCopied(false), 2000);
};

const handleAddCourse = async (newCourse: Omit<onlineCourse, '_id'>) => {
  try {
    const response = await axios.post(`/api/clients/${client._id}/add-course`, newCourse);
    console.log('Course added:', response.data);
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

const paymentDetails = `${client.amount} - ${client.paymentOptions || "No Declarado"} - ${client.paymentNumber || "No Declarado"}`;
const handleCopyPayment = () => {
  handleCopy(paymentDetails);
};

return (
  <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} mt={1}>
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
    {/* <ClientHeader client={client} onCopyPayment={handleCopyPayment} isCopied={isCopied} /> */}
    <Button onClick={() => setIsOpen(true)} mt={1}>Ver certificados</Button>
    <CertificationModal
      client={client}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      courses={courses}
      payments={payments}
      courseStatuses={courseStatuses}
      onStatusChange={handleStatusChange}
    />
    <AddCourseForm onAddCourse={handleAddCourse} />
  </Box>
);
};
  
  export default ClientItem;  