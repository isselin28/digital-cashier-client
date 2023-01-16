import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Stack,
  Button,
  Text,
  Flex,
  Heading,
  Spacer,
  Box,
  Card,
  CardBody,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const emptyCart = cart.length === 0;

  const onSubmit = () => {
    // submit printer
  };

  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cart"));
    setCart(cartState);

    if (cart) {
      const total = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);

  const removeItem = (id) => {
    const itemIndex = cart.findIndex((item) => item._id === id);
    cart.splice(itemIndex, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <StyledFlex header>
        <NavLink className="nav-link" to="/">
          <ArrowBackIcon boxSize={8} />
        </NavLink>
        <Spacer />
        <Tag size="lg" variant="outline" colorScheme="teal">
          Cart
        </Tag>
      </StyledFlex>
      <StyledFlex direction="column" gap="2">
        {emptyCart && (
          <EmptyState icon="&#128123;" text="Boo! Your cart is empty" />
        )}

        {!emptyCart &&
          cart?.map((item) => {
            return (
              <Card key={item._id}>
                <CardBody>
                  <Stack divider={<Divider />} spacing="2">
                    <Flex>
                      <Heading size="md" noOfLines={1} color="black">
                        {item.name}
                      </Heading>
                      <Spacer />
                      <DeleteIcon
                        color="red.500"
                        onClick={() => removeItem(item._id)}
                      />
                    </Flex>
                    <Flex gap="4" align="center">
                      <div>
                        x {item.quantity} {item.unit}
                      </div>
                      <Spacer />
                      <Box>
                        <Text size="md" noOfLines={1} color="black">
                          Rp. {item.quantity * item.price}
                        </Text>
                      </Box>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}

        {!emptyCart && (
          <Heading size="md" noOfLines={1} color="black" my={4} align="right">
            Total: Rp. {totalPrice}
          </Heading>
        )}
      </StyledFlex>
      <StyledFlex footer>
        <Button onClick={onSubmit} colorScheme="green" flex="1">
          Print Receipt
        </Button>
      </StyledFlex>
    </>
  );
}
