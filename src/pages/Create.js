import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Tag,
  FormLabel,
  FormControl,
  Stack,
  Spacer,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    price: 0,
  });
  const navigate = useNavigate();

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newItem = { ...form };

    await fetch("http://localhost:5000/storage/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", price: "" });
    navigate("/");
  }

  const isDisabled = form.name === "";

  return (
    <>
      <StyledFlex header>
        <NavLink className="nav-link" to="/">
          <ArrowBackIcon boxSize={8} />
        </NavLink>
        <Spacer />
        <Tag size="lg" variant="outline" colorScheme="teal">
          Create item
        </Tag>
      </StyledFlex>
      <StyledFlex>
        <FormControl isRequired>
          <Card>
            <CardBody>
              <Stack spacing="4">
                <div>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    bgColor="white"
                    borderColor="#bbb"
                    placeholder="Chicken wings spicy"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <FormLabel>Price:</FormLabel>
                  <InputGroup bgColor="white" borderColor="#bbb">
                    <InputLeftAddon children="Rp." />
                    <Input
                      type="number"
                      placeholder="150000"
                      onChange={(e) =>
                        setForm({ ...form, price: Number(e.target.value) })
                      }
                    />
                  </InputGroup>
                </div>
              </Stack>
            </CardBody>
          </Card>
        </FormControl>
      </StyledFlex>
      <StyledFlex footer gap="2">
        <Button
          onClick={onSubmit}
          colorScheme="green"
          flex="1"
          disabled={isDisabled}
        >
          Save
        </Button>
      </StyledFlex>
    </>
  );
}
