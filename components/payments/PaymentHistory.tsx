import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { miscPayment } from "models/payments";

const PaymentHistory: React.FC<{ payments: miscPayment[] }> = ({ payments }) => {
    return (
      <Box mt={4}>
        <Text fontWeight="bold">Payment History</Text>
        <List spacing={2}>
          {payments.map((payment, index) => (
            <ListItem key={index}>
              {payment.paymentType === "certification" ? "Certification" : "Matricula"}: 
              {payment.amount} - {new Date(payment.paymentDate).toLocaleDateString()}
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

export default PaymentHistory;