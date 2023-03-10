import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
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
  Image,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const emptyCart = !cart || cart?.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cart"));
    setCart(cartState);

    calcTotal(cartState);
  }, []);

  const calcTotal = useCallback((cart) => {
    const total = cart?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, []);

  const removeItem = (id) => {
    const itemIndex = cart.findIndex((item) => item._id === id);
    cart.splice(itemIndex, 1);

    setCart(cart);
    calcTotal(cart);

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
                    <Flex align="center" gap="4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        borderRadius="full"
                        boxSize="50px"
                        fit="cover"
                      />
                      <div>
                        <Heading size="md" noOfLines={1} color="black">
                          {item.name}
                        </Heading>
                        <Text size="md" noOfLines={1} color="black">
                          Rp. {item.price}
                        </Text>
                      </div>
                      <Spacer />
                      <DeleteIcon
                        color="red.500"
                        boxSize={5}
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
          <Card px={4}>
            <Heading size="md" noOfLines={1} color="black" my={4} align="right">
              Total: Rp. {totalPrice}
            </Heading>
          </Card>
        )}
      </StyledFlex>
      <StyledFlex footer>
        <Button
          onClick={() => navigate("/payment")}
          colorScheme="green"
          flex="1"
          disabled={emptyCart}
        >
          Payment
        </Button>
      </StyledFlex>
    </>
  );
}
