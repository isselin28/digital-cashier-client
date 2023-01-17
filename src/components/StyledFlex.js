import { Flex } from "@chakra-ui/react";

function StyledFlex(props) {
  const { children, header, footer } = props;

  let height;
  if (header || footer) {
    height = "10%";
  } else {
    height = "80%";
  }

  return (
    <Flex
      p={4}
      bgColor="#F4F6F6"
      h={height}
      maxH="80vh"
      style={{ overflow: "scroll" }}
      {...props}
    >
      {children}
    </Flex>
  );
}

export default StyledFlex;
