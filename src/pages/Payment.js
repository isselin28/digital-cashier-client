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
import createPrintData from "../utils/createPrintData";

function Payment() {
  const [cart, setCart] = useState([]);
  const [payMethod, setPayMethod] = useState("");
  const [total, setTotal] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  // This method fetches the items from the database.
  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cart"));
    setCart(cartState);

    const total = cartState.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setTotal(total);

    const formatCashReceived = Number(cashReceived);
    if (formatCashReceived === 0) {
      setChange(0);
    } else {
      setChange(formatCashReceived - total);
    }

    return;
  }, [cashReceived]);

  const methods = ["cash", "qris", "credit card", "bank transfer"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "paymentMethods",
    defaultValue: "",
    onChange: setPayMethod,
  });

  const group = getRootProps();

  const onSubmit = () => {
    const timeStamp = new Date();
    createPrintData(cart, total, payMethod, cashReceived, timeStamp);
    navigate("/");
    localStorage.removeItem("cart");
  };

  const disabledBtn =
    payMethod === "" || (payMethod === "cash" && !cashReceived);

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
                  placeholder="0"
                  onChange={(e) => setCashReceived(e.target.value)}
                />
              </InputGroup>
              <FormLabel pt="4">Change:</FormLabel>
              <Heading
                as="h4"
                size="md"
                color={change >= 0 ? "green.400" : "red.600"}
              >
                Rp. {change}
              </Heading>
            </CardBody>
          </Card>
        )}
      </StyledFlex>
      <StyledFlex footer align="center">
        <Button
          colorScheme="green"
          flex="1"
          onClick={onSubmit}
          disabled={disabledBtn}
        >
          Print Receipt
        </Button>
      </StyledFlex>
    </>
  );
}

export default Payment;
