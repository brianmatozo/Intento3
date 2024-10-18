// components/PaymentForm.tsx
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  MiscellaneousPayment,
  miscellaneousPaymentSchema,
} from "schema/miscPaymentSchemas";
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from "lib/prices";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import axios from "axios";

interface PaymentFormProps {
  clientId: string;
  courseId: string;
  paymentType: "certification" | "matricula";
  onPaymentComplete: (payment: MiscellaneousPayment) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  clientId = "",
  paymentType = "certification",
  courseId,
  onPaymentComplete,
}) => {
  const [amount, setAmount] = useState("");
  const targetAmount =
    paymentType === "certification" ? CERTIFICATION_PRICE : MATRICULA_PRICE;

  const methods = useForm<MiscellaneousPayment>();

  const handleSubmit = async (data: MiscellaneousPayment) => {
    const paymentAmount = Number(data.amount);
    try {
      // console.log("Form data before validation:", data);

      const parsedData = miscellaneousPaymentSchema.safeParse({
        ...data,
        amount: paymentAmount,
        clientId,
        paymentType,
        courseId,
        paymentDate: new Date(),
      });
      if (!parsedData.success) {
        console.error("zod error:", parsedData.error);
        throw new Error("Invalid payment data");
      }
      // console.log("Parsed data before sending to backend:", parsedData.data);

      const response = await axios.post("/api/payments", parsedData.data);
      if (!response || response.status !== 201) {
        throw new Error("Failed to save data");
      }

      const savedPayment = response.data;
      console.log("Saved payment:", savedPayment);

      onPaymentComplete(savedPayment);
    } catch (error) {
      console.error("Invalid payment data:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!methods.formState.errors.amount}>
            <FormLabel>
              Payment Amount (Target:{" "}
              {paymentType === "certification"
                ? CERTIFICATION_PRICE
                : MATRICULA_PRICE}
              )
            </FormLabel>
            <Input
              type="number"
              placeholder="Enter amount"
              {...methods.register("amount", {
                required: "Amount is required",
                min: { value: 0, message: "Amount must be positive" },
              })}
            />
            <FormErrorMessage>
              {methods.formState.errors.amount?.message}
            </FormErrorMessage>
          </FormControl>

          <Input
            type="hidden"
            value={clientId}
            {...methods.register("clientId", {
              required: "Client ID is required",
            })}
          />
          <Input
            type="hidden"
            value={paymentType}
            {...methods.register("paymentType", {
              required: "Payment type is required",
            })}
          />
          <Input
            type="hidden"
            value={courseId}
            {...methods.register("courseId", {
              required: "Course ID is required",
            })}
          />

          <Button type="submit" colorScheme="blue">
            Process Payment
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};
