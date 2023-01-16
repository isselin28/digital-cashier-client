import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Button, Spacer, IconButton, Badge } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import StyledFlex from "../components/StyledFlex";
import EmptyState from "../components/EmptyState";

function Cashier() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const cartState = JSON.parse(localStorage.getItem("cart"));
  const countItemCart = cartState?.length;

  // This method fetches the items from the database.
  useEffect(() => {
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

    getItems();

    return;
  }, [items.length]);

  const unit = countItemCart > 1 ? "items" : "item";

  return (
    <>
      <StyledFlex header>
        <IconButton colorScheme="green" icon={<SettingsIcon />} disabled />
        <Spacer />
        <Button colorScheme="green">
          <NavLink className="nav-link" to="/create">
            Create
          </NavLink>
        </Button>
      </StyledFlex>
      <StyledFlex direction="column">
        {items.length > 0 ? (
          <ItemCard menu={items} />
        ) : (
          <EmptyState icon="&#127859;" text="Preparing the menu..." />
        )}
      </StyledFlex>
      <StyledFlex footer align="center">
        <Button colorScheme="green" flex="1" onClick={() => navigate("/cart")}>
          Check Cart
          {countItemCart ? (
            <>
              <Spacer />
              <Badge
                fontSize="15px"
                colorScheme="green"
                variant="solid"
                color="green.50"
              >
                {countItemCart} {unit}
              </Badge>
            </>
          ) : (
            ""
          )}
        </Button>
      </StyledFlex>
    </>
  );
}

export default Cashier;
