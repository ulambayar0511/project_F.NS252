import { Button, ButtonProps, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function FollowButtonWithShadow(props: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    console.log(`clicked`);
    router.push("http://localhost:5000/keys");
  };
  return (
    <Flex h="50vh" justifyContent="center" alignItems="center">
      <Button
        {...props}
        /* flex={1} */
        px={"24"}
        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
        onClick={handleClick}
      >
        Generate keys
      </Button>
    </Flex>
  );
}
