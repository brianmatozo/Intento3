// components/CertificationStatus.tsx
import React, { useState } from 'react';
import { Badge, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, HStack } from '@chakra-ui/react';
import { PaymentForm } from './PaymentForm';
import PaymentHistory from './PaymentHistory';
import type { miscPayment } from 'models/miscPayments';

interface CertificationStatusProps {
  clientId: string;
  certificationStatus: boolean;
  matriculaStatus: boolean;
  onStatusChange: (payment: Omit<miscPayment, '_id'>) => Promise<void>;
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

  const handlePaymentComplete = async (payment: Omit<miscPayment, '_id'>) => {
    await onStatusChange(payment);
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