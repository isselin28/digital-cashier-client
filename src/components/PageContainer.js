import { Box } from "@chakra-ui/react";

function PageContainer(props) {
  const { children } = props;

  return (
    <Box w="100%" h="100vh" minW="400px" m={0}>
      <Box minH="100vh">{children}</Box>
    </Box>
  );
}

export default PageContainer;
