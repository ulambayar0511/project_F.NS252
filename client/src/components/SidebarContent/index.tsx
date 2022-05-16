import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import LinkItem from "../LinkItem";
import NavItem from "../NavItem";

interface SidebarProps extends BoxProps {
  onClose?: () => void;
  onOpen?: () => void;
  nav: any;
}

const SidebarContent = ({ onClose, onOpen, nav, ...rest }: SidebarProps) => {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Box
      transition="all 3s ease"
      bg={useColorModeValue("gray.100", "teal.500")}
      borderRight="2px"
      flexDir="column"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: navSize == "small" ? "20" : "44" }}
      pos="fixed"
      h="full"
      onClick={onOpen}
      {...rest}
    >
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItem.map((link) =>
        !(navSize == "small") ? (
          <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.icon}
          </NavItem>
        ) : (
          <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
          </NavItem>
        )
      )}
    </Box>
  );
};

export default SidebarContent;
