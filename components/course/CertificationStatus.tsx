// components/CertificationStatus.tsx
import React, { useState } from 'react';
import { Badge, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { PaymentForm } from './PaymentForm';
import { MiscellaneousPayment } from 'schema/miscPaymentSchemas';

interface CertificationStatusProps {
  clientId: string;
  certificationStatus: boolean;
  matriculaStatus: boolean;
  onStatusChange: (payment: MiscellaneousPayment) => void;
}

export const CertificationStatus: React.FC<CertificationStatusProps> = ({ clientId, certificationStatus, matriculaStatus, onStatusChange }) => {
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
    <Box>
      <Badge
        colorScheme={certificationStatus ? "green" : "red"}
        mr={2}
        cursor="pointer"
        onClick={() => openPaymentModal('certification')}
      >
        {certificationStatus ? "Certificado" : "No Certificado"}
      </Badge>
      <Badge
        colorScheme={matriculaStatus ? "green" : "red"}
        cursor="pointer"
        onClick={() => openPaymentModal('matricula')}
      >
        {matriculaStatus ? "Matriculado" : "No Matriculado"}
      </Badge>

      {paymentType && (
        <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Payment for {paymentType === 'certification' ? 'Certification' : 'Matricula'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <PaymentForm 
                clientId={clientId}
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