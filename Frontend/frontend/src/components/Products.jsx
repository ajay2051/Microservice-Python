import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState("");
  useEffect(() => {
    async () => {
      const response = await fetch("http://localhost:8080/products");
      const content = await response.json();
      setProducts(content);
    };
  }, []);
  const del = async (id) => {
    if (window.confirm("Are you sure to delete this record...?")) {
      await fetch("http://localhost:8080/products/${id}", {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p.id !== id));
    }
  };
  return (
    <div>
      <div className="container">
        <button>
          <Link to="/products-create">Add</Link>
        </button>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Link
                      to="#"
                      className="btn btn-primary"
                      onClick={(e) => del(product.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
