import {
  Card,
  CardBody,
  Box,
  Text,
  Heading,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

function ItemCard(props) {
  const { menu } = props;

  const navigate = useNavigate();
  return (
    <Card my={4} w="100%">
      <CardBody>
        <Stack divider={<Divider />} spacing="2">
          {menu.map((item) => (
            <Box onClick={() => navigate(`/add/${item._id}`)}>
              <Heading size="xs" textTransform="uppercase">
                {item.name}
              </Heading>
              <Text pt="2" fontSize="sm">
                Rp. {item.price}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
