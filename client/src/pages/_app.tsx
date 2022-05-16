/* eslint-disable react-hooks/rules-of-hooks */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  Avatar,
  Box,
  ChakraProvider,
  Container,
  extendTheme,
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
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useState } from "react";
import { LinkItem, NavItem } from "@components";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const { onOpen } = useDisclosure();
  const [navSize, changeNavSize] = useState("large");

  // const getContent = () => {
  //   if ((appProps.router.pathname) !== '/login')
  //     return (
  //       <ChakraProvider theme={theme}>
  //         <Component {...pageProps} />
  //       </ChakraProvider>
  //     );
  // };
  if (['/login'].includes(appProps.router.pathname) || ['/signup'].includes(appProps.router.pathname))
    return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  else {
    return (
      <>
        {/* {getContent()} */}
        <ChakraProvider theme={theme}>
          <Box>
            {/* Navbar */}
            <Flex
              px={{ md: 4 }}
              as={"nav"}
              pos={"relative"}
              position={"static"}
              height={"14"}
              alignItems={"center"}
              justify="center"
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
                  boxSize="50px"
                  align="center"
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/292/clown-face_1f921.png"
                  alt="252.mn - Admin panel"
                />
              </Text>

              {/* User icon */}
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

            {/* Collapsible sidebar */}
            <Box
              bg={useColorModeValue("gray.100", "teal.500")}
              borderRight="2px"
              flexDir="column"
              shadow={"inner"}
              borderRightColor={useColorModeValue("gray.200", "gray.700")}
              w={{ base: "full", md: navSize == "small" ? "20" : "44" }}
              pos="fixed"
              h="full"
              onClick={onOpen}
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
          <Container
            marginTop={"2"}
            marginLeft={{ base: "full", md: navSize == "small" ? "-4" : "0" }}
            maxW={{ base: "full", md: navSize == "small" ? "full" : "full" }}
            // bg={useColorModeValue("gray.100", "teal.500")}
            centerContent
          >
            <Component {...pageProps} />
          </Container>
        </ChakraProvider>
      </>
    );
  }
}

export default MyApp;
