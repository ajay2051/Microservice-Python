import React, { useState } from "react";

const ProductsCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/products",{
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        name,
        price,
        quantity
    })
})
  };
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ProductsCreate;
