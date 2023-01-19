import React, { useEffect, useState } from "react";
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
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import StyledFlex from "../components/StyledFlex";
import processImageUpload, { isPlaceholder } from "../utils/imageUpload.utils";
import generatePlaceholder from "../utils/generatePlaceholder";

export default function Create() {
  const [placeholderURL, setPlaceholderURL] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: 0,
    unit: "-",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPlaceholderURL(generatePlaceholder(form.name));
  }, []);

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    const newItem = { ...form };

    if (form.image === "") {
      newItem.image = placeholderURL;
    }

    // When a post request is sent to the create url, we'll add a new record to the database.

    await fetch(`${process.env.REACT_APP_PROD_API}/storage/add`, {
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

  const uploadImage = (e) => {
    const callbackFunction = (newImageData) => {
      setForm({ ...form, image: newImageData });
    };

    processImageUpload(e, callbackFunction);
  };

  const hasImage = !isPlaceholder(form.image);

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
                boxSize="136px"
                src={form.image || placeholderURL}
                fit="cover"
              />
              <Stack spacing="4">
                <div>
                  <FormLabel requiredIndicator>Image:</FormLabel>
                  <Box>
                    {hasImage ? (
                      <Button
                        leftIcon={<DeleteIcon />}
                        colorScheme="red"
                        variant="solid"
                        size="sm"
                        onClick={() =>
                          setForm({
                            ...form,
                            image: placeholderURL,
                          })
                        }
                      >
                        Remove Image
                      </Button>
                    ) : (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                      />
                    )}
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
