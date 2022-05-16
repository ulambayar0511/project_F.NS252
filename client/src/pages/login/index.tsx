import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { api } from "@handler";
import { localstorage } from "@storage";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.auth.Login(email, password);
        if (res.data.status == "success") {
          localstorage.setAccessToken(res.data.data);
          router.push("/");
          resolve(true);
        } else {
          alert("Failed!");
          reject();
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            console.log("No server Response!");
          } else if (
            err.response?.status === 400 ||
            err.response?.status === 401
          ) {
            alert("Invalid password!");
            console.log(err.response?.data);
          } else {
            alert("Internal server error!");
            console.log(err.response?.data);
          }
        }
      }
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Not a member? <Link color={"blue.400"} href={"/signup"}>Signup</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.currentTarget.value)
                }
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
