import { useState } from "react";
import moon from "./img/icon-moon.svg";
import sun from "./img/icon-sun.svg";

export default function App() {
  return (
    <div className="app">
      <Nav />
    </div>
  );
}

function Nav() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState([]);
  const [complete, setComplete] = useState([]);
  const [isDark, setIsDark] = useState(true);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleActive() {
    const active = items.filter((item) => !item.packed);
    setActive(active);
  }

  function handleComplete() {
    const complete = items.filter((item) => item.packed);
    setComplete(complete);
  }

  function handleClear() {
    setItems([]);
  }
  function handleAllItems() {
    setActive([]);
    setComplete([]);
  }
  function handlebrit() {
    setIsDark((isDark) => !isDark);
  }

  return (
    <div className="nav">
      {" "}
      <Head handlebrit={handlebrit} isDark={isDark} />
      <Form onAddItem={handleAddItems} isDark={isDark} />
      <Display
        items={
          complete.length > 0 ? complete : active.length > 0 ? active : items
        }
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        handleActive={handleActive}
        handleComplete={handleComplete}
        onClear={handleClear}
        handleAllItems={handleAllItems}
        isDark={isDark}
        handlebrit={handlebrit}
      />
    </div>
  );
}

function Head({ isDark, handlebrit }) {
  return (
    <div className="head">
      <h1 className={!isDark && "lig"}> TO DO</h1>
      <img onClick={handlebrit} src={!isDark ? moon : sun} />
    </div>
  );
}

function Form({ items, onAddItem, isDark }) {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const newItem = { name, id: Date.now(), packed: false };
    console.log(newItem);
    onAddItem(newItem);
    setName("");
  }
  return (
    <form onSubmit={handleSubmit} className={!isDark && "forms"}>
      <input
        type="type"
        id="search"
        value={name}
        placeholder="Create a todo"
        onChange={(e) => setName(e.target.value)}
      />
      <button id="add">Add</button>
    </form>
  );
}

function Display({
  items,
  onDeleteItems,
  onToggleItems,
  handleActive,
  handleComplete,
  onClear,
  handleAllItems,
  isDark,
}) {
  return (
    <ul>
      {items.map((item) => (
        <List
          item={item}
          onDeleteItems={onDeleteItems}
          onToggleItems={onToggleItems}
          isDark={isDark}
        />
      ))}
      <Detail
        items={items}
        handleActive={handleActive}
        handleComplete={handleComplete}
        onClear={onClear}
        handleAllItems={handleAllItems}
        isDark={isDark}
      />
    </ul>
  );
}

function List({ item, onDeleteItems, onToggleItems, isDark }) {
  return (
    <li key={item.id} className={!isDark && "list"}>
      <div className="sub-list">
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItems(item.id)}
        />
        <p className={item.packed ? "dec" : ""} id="name">
          {item.name}
        </p>
      </div>
      <p id="del" onClick={() => onDeleteItems(item.id)}>
        X
      </p>
    </li>
  );
}

function Detail({
  items,
  handleActive,
  handleComplete,
  onClear,
  handleAllItems,
  isDark,
}) {
  const numItems = items.length;
  return (
    <div className={!isDark ? "details" : "detail"}>
      <p> {numItems} Items left</p>
      <p onClick={handleAllItems}>All</p>
      <p onClick={handleActive}>Active</p>
      <p onClick={handleComplete}>Completed</p>
      <p onClick={onClear}>Clear All</p>
    </div>
  );
}
