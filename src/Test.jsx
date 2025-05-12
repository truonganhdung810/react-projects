import React from "react";
import { useState } from "react";

export default function Test() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteItem = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const handleEditItem = (index, newValue) => {
    const updatedItems = [...items];
    updatedItems[index] = newValue;
    setItems(updatedItems);
  };

  return (
    <div className="parent">
      <div className="left-component">
        <h2>Danh sách</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleEditItem(index, e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <button onClick={() => handleDeleteItem(index)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-component">
        <h2>Thêm phần tử</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập phần tử mới"
          />
          <button type="submit">Thêm</button>
        </form>
      </div>
    </div>
  );
}
