import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import {
  Stack,
  Button,
  Text,
  Flex,
  Heading,
  Spacer,
  Card,
  CardBody,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, EditIcon, ArrowBackIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";

export default function Item(props) {
  const [item, setItem] = useState({ name: "", price: "", quantity: 0 });
  const [count, setCount] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  function addToCart() {
    const cartState = JSON.parse(localStorage.getItem("cart"));

    if (!cartState) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...item, quantity: count }])
      );
    }

    if (cartState) {
      const itemIndex = cartState.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (itemIndex !== -1) {
        cartState[itemIndex].quantity = cartState[itemIndex].quantity + count;
        localStorage.setItem("cart", JSON.stringify(cartState));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartState, { ...item, quantity: count }])
        );
      }
    }

    navigate("/");
  }

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/storage/${id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const dataItem = await response.json();
      if (!dataItem) {
        window.alert(`Item is not found`);
        navigate("/");
        return;
      }

      setItem(dataItem);
    }

    fetchData();

    return;
  }, [params.id]);

  const handleCount = (action) => {
    if (action === "increase") {
      setCount(count + 1);
    }

    if (action === "decrease" && count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <StyledFlex header>
        <NavLink className="nav-link" to="/">
          <ArrowBackIcon boxSize={8} />
        </NavLink>
        <Spacer />
        <Tag size="lg" variant="outline" colorScheme="teal">
          Add item
        </Tag>
      </StyledFlex>
      <StyledFlex direction="column">
        <Card>
          <CardBody>
            <Stack divider={<Divider />} spacing="2">
              <Flex>
                <div>
                  <Heading size="md" noOfLines={1} color="black">
                    {item.name}
                  </Heading>
                  <Text size="md" noOfLines={1} color="black">
                    Rp. {item.price}
                  </Text>
                </div>
                <Spacer />
                <NavLink className="nav-link" to={`/edit/${params.id}`}>
                  <EditIcon boxSize={6} />
                </NavLink>
              </Flex>
              <Flex>
                <Text>Jumlah</Text>
                <Spacer />
                <Flex gap="4" align="center">
                  <MinusIcon
                    boxSize={3}
                    onClick={() => handleCount("decrease")}
                  />
                  <div>{count}</div>
                  <AddIcon
                    boxSize={3}
                    onClick={() => handleCount("increase")}
                  />
                </Flex>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </StyledFlex>
      <StyledFlex footer>
        <Button
          onClick={addToCart}
          colorScheme="green"
          flex="1"
          disabled={count === 0}
        >
          Add to Cart
        </Button>
      </StyledFlex>
    </>
  );
}