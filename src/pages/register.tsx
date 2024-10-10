// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
// import axios from "axios";
// import bcrypt from "bcryptjs";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type FormData = z.infer<typeof formSchema>;

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       data.password = bcrypt.hashSync(data.password, 10);
//       await axios.post("/api/register", data);
//       alert("Registration successful. Please sign in.");
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md" bg="white">
//       <Heading as="h1" mb={6} textAlign="center">Register</Heading>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={4}>
//           <FormControl isInvalid={!!errors.name}>
//             <FormLabel>Name</FormLabel>
//             <Input type="text" {...register("name")} placeholder="Enter your name" />
//             <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
//           </FormControl>
          
//           <FormControl isInvalid={!!errors.email}>
//             <FormLabel>Email</FormLabel>
//             <Input type="email" {...register("email")} placeholder="Enter your email" />
//             <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
//           </FormControl>
          
//           <FormControl isInvalid={!!errors.password}>
//             <FormLabel>Password</FormLabel>
//             <Input type="password" {...register("password")} placeholder="Enter your password" />
//             <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
//           </FormControl>
          
//           <Button type="submit" colorScheme="teal" width="full">Register</Button>
//         </Stack>
//       </form>
//     </Box>
//   );
// };

// export default Register;
