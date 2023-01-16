import { Heading, Box, Card, CardBody } from "@chakra-ui/react";

export default function EmptyState(props) {
  const { text, icon } = props;
  return (
    <Card align="center" p={4}>
      <CardBody align="center">
        <Box fontSize="5xl">{icon}</Box>
        <Heading fontSize="lg">{text}</Heading>
      </CardBody>
    </Card>
  );
}
