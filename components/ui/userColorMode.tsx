import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function DarkModeToggle() {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const label = useColorModeValue('Dark Mode', 'Light Mode');
  
  return (
    <IconButton
      onClick={toggleColorMode}
      icon={icon}
      aria-label={label}
      variant="outline"
      colorScheme="teal"
    />
  );
}

export default DarkModeToggle;
