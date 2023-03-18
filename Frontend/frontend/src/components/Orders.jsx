import React, { useEffect, useState } from "react";

const Orders = () => {
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = ["Buy your favourite Product"];
  useEffect(() => {
    async () => {
      try {
        if (id) {
          const response = await fetch(`https://localhost:8080/products/${id}`);
          const content = await response.json();
          const price = parseFloat(content.price) * 1.2;
          setMessage(`Your Product Price is $${price}`);
        }
      } catch (error) {
        setMessage("Buy your favourite Product");
      }
    };
  }, [id]);
  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:9000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        quantity,
      }),
    });
    setMessage("Thank You");
  };
  return (
    <div>
      <h1>{message}</h1>
      <form action="" onSubmit={submit}>
        <input
          type="text"
          placeholder="Product"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Order</button>
      </form>
    </div>
  );
};

export default Orders;
