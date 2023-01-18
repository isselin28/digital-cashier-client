import { Box } from "@chakra-ui/react";

function PageContainer(props) {
  const { children } = props;

  const innerH = window.innerHeight;

  return (
    <Box w="100%" h="100vh" m={0}>
      <Box h={innerH} maxH="100vh">
        {children}
      </Box>
    </Box>
  );
}

export default PageContainer;
