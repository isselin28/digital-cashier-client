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
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { EditIcon, ArrowBackIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";
import CountBar from "../components/CountBar";

export default function Item(props) {
  const [item, setItem] = useState({
    name: "",
    price: 0,
    unit: "",
    quantity: 0,
    image: "",
  });
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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
      const response = await fetch(
        `${process.env.REACT_APP_PROD_API}/storage/${id}`
      );

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

      if (response.ok && dataItem) setIsLoaded(true);

      setItem(dataItem);
    }

    fetchData();

    return;
  }, [params.id]);

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
              <Flex direction="row" gap="4" align="center">
                <SkeletonCircle size="60px" isLoaded={isLoaded}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="full"
                    fit="cover"
                    boxSize="60px"
                  />
                </SkeletonCircle>
                <SkeletonText
                  isLoaded={isLoaded}
                  noOfLines={2}
                  spacing="2"
                  skeletonHeight="4"
                >
                  <Heading size="md" noOfLines={1} color="black">
                    {item.name}
                  </Heading>
                  <Text size="md" noOfLines={1} color="black">
                    Rp. {item.price} / {item.unit}
                  </Text>
                </SkeletonText>
                <Spacer />
                <NavLink className="nav-link" to={`/edit/${params.id}`}>
                  <EditIcon boxSize={6} />
                </NavLink>
              </Flex>
              <Flex>
                <Text>Quantity</Text>
                <Spacer />
                <CountBar getCount={setCount} />
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
