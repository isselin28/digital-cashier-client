import React, { useState, useEffect } from "react";
import {
  Button,
  Tag,
  FormLabel,
  Spacer,
  Card,
  CardBody,
  useRadioGroup,
  SimpleGrid,
  Input,
  GridItem,
  Heading,
  Text,
  InputLeftAddon,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import StyledFlex from "../components/StyledFlex";
import RadioCard from "../components/RadioCard";

function Payment() {
  const [items, setItems] = useState([]);
  const [payMethod, setPayMethod] = useState("");
  const [total, setTotal] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  // This method fetches the items from the database.
  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cart"));

    async function getItems() {
      const response = await fetch(`http://localhost:5000/storage/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const items = await response.json();
      setItems(items);
    }

    const total = cartState.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setTotal(total);
    getItems();

    const formatCashReceived = Number(cashReceived);
    if (formatCashReceived < total) {
      setChange(0);
    } else {
      setChange(formatCashReceived - total);
    }

    return;
  }, [items.length, cashReceived]);

  const methods = ["cash", "qris", "credit card", "bank transfer"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "paymentMethods",
    defaultValue: "",
    onChange: setPayMethod,
  });

  const group = getRootProps();

  return (
    <>
      <StyledFlex header>
        <NavLink className="nav-link" to="/cart">
          <ArrowBackIcon boxSize={8} />
        </NavLink>
        <Spacer />
        <Tag size="lg" variant="outline" colorScheme="teal">
          Payment
        </Tag>
      </StyledFlex>
      <StyledFlex direction="column" gap="4">
        <SimpleGrid columns={2} gap={3} {...group}>
          {methods.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <GridItem colSpan={1}>
                <RadioCard key={value} {...radio}>
                  <div style={{ "text-transform": "capitalize" }}>{value}</div>
                </RadioCard>
              </GridItem>
            );
          })}
        </SimpleGrid>
        {payMethod && (
          <Card px={4} py={4}>
            <Flex>
              <Text>Total:</Text>
              <Spacer />
              <Heading as="h4" size="md">
                Rp. {total}
              </Heading>
            </Flex>
          </Card>
        )}
        {payMethod === "cash" && (
          <Card>
            <CardBody spacing="2">
              <FormLabel>Cash Received:</FormLabel>
              <InputGroup>
                <InputLeftAddon children="Rp." />
                <Input
                  type="number"
                  placeholder="150000"
                  pattern="[0-9]*"
                  onChange={(e) => setCashReceived(e.target.value)}
                />
              </InputGroup>
              <FormLabel pt="4">Change:</FormLabel>
              <Heading as="h4" size="md">
                Rp. {change}
              </Heading>
            </CardBody>
          </Card>
        )}
      </StyledFlex>
      <StyledFlex footer align="center">
        <Button colorScheme="green" flex="1" onClick={() => navigate("/cart")}>
          Print Receipt
        </Button>
      </StyledFlex>
    </>
  );
}

export default Payment;