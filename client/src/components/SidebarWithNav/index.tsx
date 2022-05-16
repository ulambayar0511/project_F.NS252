import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { LinkItem, NavItem } from "@components";

export default function SidebarWithHeader({ ...rest }) {
  const { onOpen } = useDisclosure();
  const [navSize, changeNavSize] = useState("large");
  return (
    // Header
    <Box>
      <Flex
        px={{ md: 4 }}
        as={"nav"}
        height={"14"}
        alignItems={"center"}
        justifyContent={{ base: "space-between" }}
        align={"center"}
        padding={3}
        bg={useColorModeValue("GrayText", "black")}
      >
        <IconButton
          background="none"
          _hover={{ background: "none" }}
          display={{ base: "flex" }}
          variant="unstyled"
          aria-label="open menu"
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
          size={"lg"}
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex" }}
          fontSize="2xl"
          align={"center"}
          fontFamily="monospace"
          fontWeight="bold"
        >
          <Image
            align="center"
            src="https://bi.252.mn/32x32bi.png"
            alt="252.mn - Admin panel"
          />
        </Text>

        <HStack spacing={{ base: "0" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} />
                  <VStack
                    display={{ base: "none" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Admin</Text>
                  </VStack>
                  <Box display={{ base: "none" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>

      {/* Collapsable sidebar */}
      <Box
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
        {LinkItem.map((link) =>
          !(navSize == "large") ? (
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
    </Box>
  );
}
