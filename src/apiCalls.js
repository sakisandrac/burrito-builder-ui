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
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.statusText}`);
    };
  })
}

export {getOrders, postOrder}