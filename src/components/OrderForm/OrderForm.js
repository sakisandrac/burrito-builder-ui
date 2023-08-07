import { useEffect, useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("");

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    clearInputs();

    if (name && ingredients.length > 0) {
      const newOrder = {
        name: name,
        ingredients: ingredients
      }

      postOrder(newOrder)
      .then(data => {
        console.log('posted', data)
        setConfirm('Order sent successfully!')
        props.addToOrders(data)
      })
      .catch(err => setError(`${err}`))

      setError("")
    } else {
      setError("Please fill out entire order before subimtting!")
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => addIngredient(e)}
      >
        {ingredient}
      </button>
    );
  });

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients(prev => [...prev, e.target.name]);
    setConfirm("");
    setError("");
  }

  const handleChange = (e) => {
    setName(e.target.value);
    setConfirm("");
    setError("");
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => handleChange(e)}
        />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      {error && <p>{error}</p>}
      {confirm && <p>{confirm}</p>}
      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
