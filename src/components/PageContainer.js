import { Box } from "@chakra-ui/react";

function PageContainer(props) {
  const { children } = props;

  const innerHeight = window.innerHeight;

  return (
    <Box w="100%" h="100vh" minW="400px" m={0}>
      <Box h={innerHeight}>{children}</Box>
    </Box>
  );
}

export default PageContainer;
