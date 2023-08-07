const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) => response.json());
};

const postOrder = (newOrder) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err)
    throw new Error(`${err}`)
  })
}

export {getOrders, postOrder}