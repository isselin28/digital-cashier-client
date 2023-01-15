import { Center, Flex, Box } from "@chakra-ui/react";

function PageContainer(props) {
  const { children } = props;
  return (
    <Center w="100%">
      <Flex m={0} direction="column" h="100vh" minW="400px">
        <Box flex="1">{children}</Box>
      </Flex>
    </Center>
  );
}

export default PageContainer;
