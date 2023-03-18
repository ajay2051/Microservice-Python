import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import HashModel, get_redis_connection


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
redis = get_redis_connection(
    host="redis-11472.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port=11472,
    password="akBTeqwwSCfb5T5NGh2VobYD3c1TGTHx",
    decode_responses=True
)


class Product(HashModel):
    name: str
    price: float
    quantity: int

    class Meta:
        database = redis


@app.get("/products")
def products():
    return [product_format(pk) for pk in Product.all_pks()]


def product_format(pk: str):
    product = Product.get(pk)
    return {
        "id": product.pk,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity
    }


@app.post("/products")
def create_product(product: Product):
    return product.save()


@app.get("/products/{pk}")
def single_product(pk: str):
    return Product.get(pk)


@app.delete("/products/{pk}")
def delete_product(pk: str):
    return Product.delete(pk)


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
