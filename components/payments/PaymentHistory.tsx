import { Box, List, ListItem, Text } from "@chakra-ui/react";
import type { miscPayment } from "models/miscPayments";

interface PaymentHistoryProps {
  payments: miscPayment[];
  courseId?: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments, courseId }) => {
  return (
    <Box mt={4}>
      
      <Text fontWeight="bold">Historial de Pagos</Text>
      <List spacing={2}>
        {payments
          .filter(p => 
            (p.paymentType === "certification" || p.paymentType === "matricula") && 
            (!courseId || p.courseId?.toString() !== '[object Object]' && p.courseId?.toString() === courseId)
          )
          .map((payment, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between">
              <Text>
                {payment.paymentType === "certification" ? "Certificacion" : "Matricula"}: 
                ${payment.amount} 
              </Text>
              <Text>
                {new Date(payment.paymentDate).toLocaleDateString()}
                {" - "}
                {payment.miscPaymentOptions} - {String(payment.miscPaymentNumber)}
              </Text>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default PaymentHistory;