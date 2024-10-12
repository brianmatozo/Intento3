import {
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  Box,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react"; // Assuming next-auth is used for authentication

interface UserPopoverProps {
  name: string;
  email?: string;
}

const UserPopover = ({ name, email }: UserPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar name={name} cursor="pointer" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box mb={3}>
            <Text fontSize="sm">Nombre: {name || "Not provided"}</Text>
          </Box>
          <Box mb={3}>
            <Text fontSize="sm">Email: {email || "Not provided"}</Text>
          </Box>
          <Button colorScheme="red" width="full" onClick={() => signOut()}>
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
