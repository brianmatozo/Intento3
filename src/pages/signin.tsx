import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: signInErrors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: registerErrors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleSignIn = async (data: SignInFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      setSignInError("Invalid email or password");
    }else{
      router.push("/");
      return null;
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    try {
      await axios.post("/api/register", { ...data, password: hashedPassword });
      toast({
        title: "Registration successful.",
        description: "Please sign in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsRegistering(false);
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration failed.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md" bg="white">
      <Heading as="h1" mb={6} textAlign="center">
        {isRegistering ? "Register" : "Sign In"}
      </Heading>
      <form onSubmit={isRegistering ? handleSubmitRegister(handleRegister) : handleSubmitSignIn(handleSignIn)}>
        <Stack spacing={4}>
          {isRegistering && (
            <FormControl isInvalid={!!registerErrors.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" {...registerRegister("name")} />
              <FormErrorMessage>{registerErrors.name?.message}</FormErrorMessage>
            </FormControl>
          )}

          <FormControl isInvalid={isRegistering ? !!registerErrors.email : !!signInErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" {...(isRegistering ? registerRegister("email") : registerSignIn("email"))} />
            <FormErrorMessage>{isRegistering ? registerErrors.email?.message : signInErrors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={isRegistering ? !!registerErrors.password : !!signInErrors.password}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" {...(isRegistering ? registerRegister("password") : registerSignIn("password"))} />
            <FormErrorMessage>{isRegistering ? registerErrors.password?.message : signInErrors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            {isRegistering ? "Register" : "Sign In"}
          </Button>

          {signInError && (
            <Text color="red.500" textAlign="center">
              {signInError}
            </Text>
          )}

          <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignIn;
