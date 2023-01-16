import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Button,
  Tag,
  FormLabel,
  FormControl,
  Spacer,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import StyledFlex from "../components/StyledFlex";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/storage/${id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const item = await response.json();
      if (!item) {
        window.alert(`Item is not found`);
        navigate("/");
        return;
      }

      setForm(item);
    }

    fetchData();

    return;
  }, [params.id]);

  console.log("form", form);

  async function onSubmit(e) {
    e.preventDefault();
    const editedItem = {
      name: form.name,
      price: form.price,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This method will delete a record
  async function onDelete(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <>
      <StyledFlex header>
        <NavLink className="nav-link" to="/">
          <ArrowBackIcon boxSize={8} />
        </NavLink>
        <Spacer />
        <Tag size="lg" variant="outline" colorScheme="teal">
          Edit item
        </Tag>
      </StyledFlex>
      <StyledFlex>
        <FormControl>
          <Card>
            <CardBody>
              <Stack spacing="4">
                <div>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    bgColor="white"
                    borderColor="#bbb"
                    placeholder="Chicken wings spicy"
                    value={form.name}
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
                      value={form.price}
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
        <Button onClick={() => onDelete(params.id)} colorScheme="red" flex="1">
          Delete
        </Button>
        <Button onClick={onSubmit} colorScheme="green" flex="1">
          Save
        </Button>
      </StyledFlex>
    </>
  );
}
