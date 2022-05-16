import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <Box textAlign="center" py={50}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        Error
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you are looking for does not seem to exist
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={handleClick}
      >
        Go to Home
      </Button>
    </Box>
  );
}
