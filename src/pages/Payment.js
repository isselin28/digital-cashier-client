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
// import { useNavigate } from "react-router";
import StyledFlex from "../components/StyledFlex";
import RadioCard from "../components/RadioCard";

function Payment() {
  const [payMethod, setPayMethod] = useState("");
  const [total, setTotal] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);
  const [change, setChange] = useState(0);
  // const navigate = useNavigate();

  // This method fetches the items from the database.
  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cart"));

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

  function createPrintData() {
    //Create ESP/POS commands for sample label
    const esc = "\x1B"; //ESC byte in hex notation
    const newLine = "\x0A"; //LF byte in hex notation

    let cmds = esc + "@"; //Initializes the printer (ESC @)
    cmds += esc + "!" + "\x38"; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
    cmds += "BEST DEAL STORES"; //text to print
    cmds += newLine + newLine;
    cmds += esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
    cmds += "COOKIES                   5.00";
    cmds += newLine;
    cmds += "MILK 65 Fl oz             3.78";
    cmds += newLine + newLine;
    cmds += "SUBTOTAL                  8.78";
    cmds += newLine;
    cmds += "TAX 5%                    0.44";
    cmds += newLine;
    cmds += "TOTAL                     9.22";
    cmds += newLine;
    cmds += "CASH TEND                10.00";
    cmds += newLine;
    cmds += "CASH DUE                  0.78";
    cmds += newLine + newLine;
    cmds += esc + "!" + "\x18"; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
    cmds += "# ITEMS SOLD 2";
    cmds += esc + "!" + "\x00"; //Character font A selected (ESC ! 0)
    cmds += newLine + newLine;
    cmds += "11/03/13  19:53:17";

    console.log(cmds);

    print(cmds);
  }

  function print(data) {
    var S = "#Intent;scheme=rawbt;";
    var P = "package=ru.a402d.rawbtprinter;end;";
    var textEncoded = encodeURI(data);
    window.location.href = "intent:" + textEncoded + S + P;
  }

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
              <GridItem key={value} colSpan={1}>
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
              <Heading
                as="h4"
                size="md"
                color={change < 0 ? "red.600" : "green.400"}
              >
                Rp. {change}
              </Heading>
            </CardBody>
          </Card>
        )}
      </StyledFlex>
      <StyledFlex footer align="center">
        <Button colorScheme="green" flex="1" onClick={createPrintData}>
          {/* <a href="intent:data_to_print#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;end;"> */}
          Print Receipt
          {/* </a> */}
        </Button>
      </StyledFlex>
    </>
  );
}

export default Payment;
