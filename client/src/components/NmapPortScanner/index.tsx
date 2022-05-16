import {
  Flex,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  Divider,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { models } from "@models";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import useAPI from "src/hooks/useAPI";
import IcoArrow from "../icons/IcoArrow";
import InputForm from "../InputForm";

export default function NmapPortScanner() {
  const [output, setOutput] = useState<models.Output[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onLoading(value);
  };
  // const ipformat =
  //   /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const onLoading = (host: any) => {
    axios
      .get(`http://localhost:5000/portscan?host=${host}&ports=22,80`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res: any) => {
        console.log(res);
        // if (res.data.data !== "host not found") {
        //   setOutput(res.data.data);
        // }
      });
  };

  // useEffect(() => {
  //   onLoading();
  // }, []);

  const handleInputChange = (e: ChangeEvent) => {
    const { host, value }: any = e.target;
    setOutput({
      ...output,
      [host]: value,
    });
  };

  return (
    <Flex marginLeft={"44"} align={"center"} py={8} justify={"center"}>
      <Grid
        boxShadow={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={32}
        px={96}
        py={42}
        gap={8}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        // spacing={8}
        // align={"self-start"}
      >
        <GridItem
          // align={"self-start"}
          rowSpan={2}
          colSpan={4}
          gap={2}
          px={10}
          p={30}
          style={{ float: "right" }}
        >
          <Heading
            textTransform={"uppercase"}
            fontSize={"3xl"}
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Nmap
          </Heading>
          <Text fontSize={"lg"} color={"gray.500"}>
            the Network Mapper - Security Port Scanner
          </Text>
          <Divider orientation="horizontal" />
        </GridItem>
        <GridItem colSpan={4} gap={6} w={"full"}>
          <Flex
            as="form"
            w="100%"
            maxW="500px"
            mx="auto"
            mb={6}
            onSubmit={handleSubmit}
          >
            <Input
              value={value}
              onChange={handleInput}
              placeholder="Search for any IP address"
              aria-label="Search"
              backgroundColor="white"
              size="lg"
              rounded="xl"
              roundedRight={0}
            />
            <IconButton
              onClick={handleSubmit}
              icon={<IcoArrow />}
              type="submit"
              aria-label="Submit"
              bgColor="hsl(0, 0%, 10%)"
              size="lg"
              rounded="xl"
              roundedLeft={0}
              _hover={{ backgroundColor: "hsl(0, 0%, 32%)" }}
              _focus={{ backgroundColor: "hsl(0, 0%, 32%)" }}
              _active={{ backgroundColor: "hsl(0, 0%, 35%)" }}
            />
          </Flex>
        </GridItem>
        {/* <GridItem colSpan={2} gap={4} w={"full"}>
          <Input
            type={"text"}
            id={"host"}
            placeholder={"Enter IP address"}
            color={useColorModeValue("gray.800", "gray.200")}
            bg={useColorModeValue("gray.100", "gray.600")}
            rounded={"full"}
            border={0}
            _focus={{
              bg: useColorModeValue("gray.200", "gray.800"),
              outline: "none",
            }}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            type="submit"
            // onClick={handleClick()}
            bg={"blue.400"}
            rounded={"full"}
            color={"white"}
            flex={"1 0 auto"}
            _hover={{ bg: "blue.500" }}
            _focus={{ bg: "blue.500" }}
          >
            Scan
          </Button>
        </GridItem> */}
      </Grid>
    </Flex>
  );
}
