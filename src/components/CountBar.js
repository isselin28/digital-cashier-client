import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function CountBar({ getCount }) {
  const [count, setCount] = useState(0);

  const handleCount = (action) => {
    if (action === "increase") {
      setCount(count + 1);
    }

    if (action === "decrease" && count > 0) {
      setCount(count - 1);
    }
  };

  getCount(count);

  return (
    <Flex gap="4" align="center">
      <MinusIcon boxSize={3} onClick={() => handleCount("decrease")} />
      <div>{count}</div>
      <AddIcon boxSize={3} onClick={() => handleCount("increase")} />
    </Flex>
  );
}
