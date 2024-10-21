// components/CertificationStatus.tsx
import React, { useState } from 'react';
import { Badge, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, List, ListItem, Flex, space, HStack } from '@chakra-ui/react';
import { PaymentForm } from './PaymentForm';
import { MiscellaneousPayment } from 'schema/miscPaymentSchemas';
import PaymentHistory from './PaymentHistory';
import { miscPayment } from 'models/miscPayments';

interface CertificationStatusProps {
  clientId: string;
  certificationStatus: boolean;
  matriculaStatus: boolean;
  onStatusChange: (payment: MiscellaneousPayment) => void;
  payments: miscPayment[]
  courseId: string
}

export const CertificationStatus: React.FC<CertificationStatusProps> = ({ clientId, certificationStatus, matriculaStatus, onStatusChange, payments, courseId }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'certification' | 'matricula' | null>(null);

  const openPaymentModal = (type: 'certification' | 'matricula') => {
    setPaymentType(type);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentType(null);
  };

  const handlePaymentComplete = (payment: MiscellaneousPayment) => {
    onStatusChange(payment);
    closePaymentModal();
  };

  return (
    <Box >
      <HStack justifyContent={"center"} spacing={4} mt={2}>
      <Badge
        colorScheme={certificationStatus ? "green" : "red"}
        mr={2}
        cursor="pointer"
        onClick={() => {
          if (!certificationStatus) {
            openPaymentModal('certification');
          }}}>
        {certificationStatus ? "Certificado" : "No Certificado"}
      </Badge>
      <Badge
        colorScheme={matriculaStatus ? "green" : "red"}
        cursor="pointer"
        onClick={() => {
          if (!matriculaStatus) {
            openPaymentModal('matricula');
          }}}>
        {matriculaStatus ? "Matriculado" : "No Matriculado"}
      </Badge>
      </HStack>
      
      {/* <Flex justifyContent={"space-between"}>
      <Box mt={2}>
        <Text fontWeight="bold">Pagos Certificación:</Text>
        <List>
          {payments
            .filter(p => p.paymentType === "certification" && p.courseId?.toString() === courseId)  // Filter by paymentType and courseId
            .map((payment, index) => (
              <ListItem key={index}>
                {payment.amount} - {new Date(payment.paymentDate).toLocaleDateString()}
              </ListItem>
            ))}
        </List>
      </Box>

      <Box mt={2}>
        <Text fontWeight="bold">Pagos Matrícula:</Text>
        <List>
          {payments
            .filter(p => p.paymentType === "matricula" && p.courseId?.toString() === courseId)  // Filter by paymentType and courseId
            .map((payment, index) => (
              <ListItem key={index}>
                {payment.amount} - {new Date(payment.paymentDate).toLocaleDateString()}
              </ListItem>
            ))}
        </List>
      </Box>
      </Flex> */}

      <PaymentHistory payments={payments} courseId={courseId}/>

      {paymentType && (
        <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Pago de {paymentType === 'certification' ? 'Certification' : 'Matricula'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PaymentForm 
                clientId={clientId}
                courseId={courseId}
                paymentType={paymentType}
                onPaymentComplete={handlePaymentComplete}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CertificationStatus;