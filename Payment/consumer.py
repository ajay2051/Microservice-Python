from main import redis, Order
import time

key = 'refund_completed'
group = 'payment-group'

try:
    redis.xgroup_create(key, group)
except Exception as e:
    print(f"Group Already Exists. {e}")


while True:
    try:
        results = redis.xreadgroup(group, key, {key: ">"}, None)
        if results:
            for result in results:
                obj = result[1][0][1]
                order = Order.get(obj['pk'])
                order.status = 'refunded'
                order.save()
        print(results)
    except Exception as e:
        print(str(e))
    time.sleep(1)
