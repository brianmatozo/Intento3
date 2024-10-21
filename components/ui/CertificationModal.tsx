import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import type { onlineCourse } from "models/online";
import type { MiscellaneousPayment } from "schema/miscPaymentSchemas";
import CoursesList from "../payments/CoursesList";
import type { Client } from "models/client";
import type { miscPayment } from "models/miscPayments";

interface CertificationModalProps {
    client: Client;
    isOpen: boolean;
    onClose: () => void;
    courses: onlineCourse[];
    payments: miscPayment[];
    courseStatuses: Record<string, { certification: boolean; matricula: boolean }>;
    onStatusChange: (payment: MiscellaneousPayment) => void;
  }
  
  const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose, courses, payments, courseStatuses, onStatusChange, client }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CoursesList 
              client={client}
              courses={courses} 
              payments={payments} 
              courseStatuses={courseStatuses} 
              onStatusChange={onStatusChange} 
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default CertificationModal;