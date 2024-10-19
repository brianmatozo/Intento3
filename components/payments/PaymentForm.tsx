// components/PaymentForm.tsx
import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import {
  MiscellaneousPayment,
  miscellaneousPaymentSchema,
} from "schema/miscPaymentSchemas";
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from "lib/prices";
import { FormProvider, useForm } from "react-hook-form";
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
  const priceLimit = paymentType === 'certification' ? CERTIFICATION_PRICE : MATRICULA_PRICE;
  
  try {
    if (paymentAmount > priceLimit) {
      methods.setError("amount", {
        type: "manual",
        message: `El monto excede el precio de la ${paymentType}. Monto máximo: $${priceLimit}`,
      });
      return;
    }

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
    // console.log("Saved payment:", savedPayment);

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
            Monto: (Precio actual:{" "}
            {paymentType === "certification"
              ? CERTIFICATION_PRICE
              : MATRICULA_PRICE}
            )
          </FormLabel>
          <Input
            type="number"
            placeholder="Ingresar el monto"
            {...methods.register("amount", {
              required: "Amount is required",
              min: { value: 0, message: "Amount must be positive" },
            })}
          />
          <FormErrorMessage>
            {methods.formState.errors.amount?.message}
          </FormErrorMessage>
        </FormControl>
        
        <Flex>
        {/* Payment Options Dropdown */}
        <FormControl isInvalid={!!methods.formState.errors.miscPaymentOptions} flex={5}>
          <FormLabel>Metodo</FormLabel>
          <Select
            placeholder="Seleccionar.."
            {...methods.register("miscPaymentOptions", {
              required: "Debe seleccionar una opción de pago",
            })}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="COAPSA">COAPSA</option>
            <option value="PABLO.BIANCHI">PABLO.BIANCHI</option>
            <option value="Carlos1971Marquez">Carlos1971Marquez</option>
          </Select>
          <FormErrorMessage>
            {methods.formState.errors.miscPaymentOptions?.message}
          </FormErrorMessage>
        </FormControl>

        {/* Payment Number Input */}
        <FormControl isInvalid={!!methods.formState.errors.miscPaymentNumber} flex={9}>
          <FormLabel># de Comprobante</FormLabel>
          <Input
            type="text"
            placeholder="Ingresar..."
            {...methods.register("miscPaymentNumber", {
              required: "El número de pago es obligatorio",
            })}
          />
          <FormErrorMessage>
            {methods.formState.errors.miscPaymentNumber?.message}
          </FormErrorMessage>
        </FormControl>
        </Flex>

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

        <Button type="submit" colorScheme="green">
          Ingresar Pago
        </Button>
      </VStack>
    </form>
  </FormProvider>
);
};
