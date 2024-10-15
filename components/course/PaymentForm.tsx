// components/PaymentForm.tsx
import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { MiscellaneousPayment, miscellaneousPaymentSchema } from 'schema/miscPaymentSchemas';
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from 'lib/prices';

interface PaymentFormProps {
  clientId: string;
  paymentType: 'certification' | 'matricula';
  onPaymentComplete: (payment: MiscellaneousPayment) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ clientId, paymentType, onPaymentComplete }) => {
  const [amount, setAmount] = useState('');
  const targetAmount = paymentType === 'certification' ? CERTIFICATION_PRICE : MATRICULA_PRICE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = Number(amount);

    try {
      const payment = miscellaneousPaymentSchema.parse({
        amount: paymentAmount,
        paymentType,
        clientId,
        paymentDate: new Date(),
      });

      onPaymentComplete(payment);
    } catch (error) {
      console.error('Invalid payment data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Payment Amount (Target: {targetAmount})</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">Process Payment</Button>
      </VStack>
    </form>
  );
};