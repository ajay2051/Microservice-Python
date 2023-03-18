import time

import requests
import uvicorn
from fastapi import FastAPI
from fastapi.background import BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from redis_om import HashModel, get_redis_connection
from starlette.requests import Request

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# This should be different database
redis = get_redis_connection(
    host="redis-11472.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port=11472,
    password="akBTeqwwSCfb5T5NGh2VobYD3c1TGTHx",
    decode_responses=True
)


class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str  # pending, completed, refunded

    class Meta:
        database = redis


@app.get('/orders/{pk}')
def get_orders(pk: str):
    order = Order.get(pk)
    redis.xadd('refund_order', order.dict(), '*')
    return order


@app.post("/orders")
async def create_order(request: Request, background_task: BackgroundTasks):  # send id, quantity
    body = await request.json()
    req = requests.get("http://localhost:8080/products/%s" % body['id'])
    product = req.json()
    order = Order(
        product_id=body['id'],
        quantity=body['quantity'],
        price=product['price'],
        fee=0.2 * product['price'],
        total=product['price'] * 1.2,
        status='pending'
    )
    order.save()
    background_task.add_task(order_completed, order)
    return order


def order_completed(order: Order):
    time.sleep(5)
    order.status = 'completed'
    order.save()
    redis.xadd('order_completed', order.dict(), '*')


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=9000, reload=True)
