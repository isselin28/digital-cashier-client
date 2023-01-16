import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import PageContainer from "./components/PageContainer";
import Cashier from "./pages/Cashier";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Item from "./pages/Item";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <PageContainer>
      <Routes>
        <Route exact path="/" element={<Cashier />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/add/:id" element={<Item />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </PageContainer>
  );
};

export default App;
