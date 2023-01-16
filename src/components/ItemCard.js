import { Card, CardBody, Box, Text, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function ItemCard(props) {
  const { menu } = props;

  const navigate = useNavigate();
  return (
    <>
      {menu.map((item, idx) => (
        <Card my={1} w="100%" key={idx}>
          <CardBody>
            <Box onClick={() => navigate(`/add/${item._id}`)}>
              <Heading size="sm" textTransform="uppercase">
                {item.name}
              </Heading>
              <Text pt="2" fontSize="sm">
                Rp. {item.price} / {item.unit}
              </Text>
            </Box>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default ItemCard;
