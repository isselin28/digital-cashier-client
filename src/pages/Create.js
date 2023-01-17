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
  Image,
  Box,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";

function generatePlaceholder(name) {
  const colors = ["F6AD55", "68D391", "4FD1C5", "E9D8FD", "F687B3"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const itemInitial = name[0]?.toUpperCase() || "A";
  const placeholderURL = `https://via.placeholder.com/150/${randomColor}/FFFFFF/?text=${itemInitial}`;

  return placeholderURL;
}

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    unit: "-",
    image: "",
  });

  const navigate = useNavigate();
  const placeholderURL = generatePlaceholder(form.name);

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    const newItem = { ...form };

    if (form.image === "") {
      newItem.image = placeholderURL;
    }

    // When a post request is sent to the create url, we'll add a new record to the database.

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

    setForm({ name: "", price: "", unit: "", image: "" });
    navigate("/");
  }

  const isDisabled = form.name === "";

  const processImageUpload = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function () {
      const base64data = reader.result;
      setForm({
        ...form,
        image: base64data,
      });
    };
  };

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
              <Image
                alt="img"
                borderRadius="full"
                boxSize="150px"
                src={form.image || placeholderURL}
                fit="cover"
              />
              <Stack spacing="4">
                <div>
                  <FormLabel requiredIndicator>Image:</FormLabel>
                  <Box>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={processImageUpload}
                    />
                  </Box>
                </div>
                <div>
                  <FormLabel optionalIndicator>Name:</FormLabel>
                  <Input
                    bgColor="white"
                    borderColor="#bbb"
                    placeholder="Chicken wings spicy"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <FormLabel requiredIndicator>Price:</FormLabel>
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
                <div>
                  <FormLabel requiredIndicator>Unit:</FormLabel>
                  <Input
                    bgColor="white"
                    borderColor="#bbb"
                    placeholder="box"
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  />
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
