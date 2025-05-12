import { useState } from "react";
import "./App.css";

function App() {
  const [listCongViec, setListCongViec] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const submitCongViec = (event) => {
    event.preventDefault();
    console.log("Dữ liệu nhập:", inputValue);
    if (inputValue.trim()) {
      setListCongViec([...listCongViec, inputValue]); // Thêm phần tử mới vào mảng
      setInputValue(""); // Xóa input sau khi thêm
    }
  };

  const deleteItem = (index) => {
    console.log(index);
    setListCongViec(listCongViec.filter((_, i) => i !== index)); // Xóa phần tử tại index
  };

  const editItem = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Bắt đầu chỉnh sửa
  const handleEditStart = (index, value) => {
    setEditingIndex(index);
    setEditValue(value);
  };

  // Lưu chỉnh sửa
  const handleEditSave = (event) => {
    event.preventDefault();
    if (editValue.trim()) {
      setIsEditing(false);
      const updatedItems = [...listCongViec];
      updatedItems[editingIndex] = editValue;
      setListCongViec(updatedItems);
    }
    setEditingIndex(null); // Thoát chế độ chỉnh sửa
  };

  return (
    <div className="App">
      <h1>To Do List App</h1>
      <ToDoForm
        submitCongViec={submitCongViec}
        inputValue={inputValue}
        setInputValue={setInputValue}
      ></ToDoForm>

      <div className="custom-list">
        {listCongViec.map((item, index) => (
          <ToDoItem
            key={index}
            index={index + 1}
            work={item}
            deleteItem={deleteItem}
            isEditing={isEditing}
            editItem={editItem}
            editValue={editValue}
            setEditValue={setEditValue}
            handleEditSave={handleEditSave}
          ></ToDoItem>
        ))}
      </div>
    </div>
  );
}

function ToDoItem(props) {
  return (
    <div className="todo-item">
      {props.isEditing === false ? (
        <span className="todo-work">{props.index + ". " + props.work}</span>
      ) : (
        <form onSubmit={props.handleEditSave}>
          <input
            type="text"
            placeholder={props.work}
            value={props.editValue}
            onChange={(e) => props.setEditValue(e.target.value)}
            autoFocus
            style={{ marginRight: "10px", padding: "10px", fontSize: "large" }}
          />
          <button type="submit">Save</button>
        </form>
      )}
      <div className="button-group">
        <button
          className="edit-btn"
          onClick={() => props.editItem(props.index - 1)}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => props.deleteItem(props.index - 1)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ToDoForm(props) {
  return (
    <form className="todo-form" onSubmit={props.submitCongViec}>
      <input
        className="input-work"
        placeholder="Add a new work"
        required
        value={props.inputValue}
        onChange={(e) => props.setInputValue(e.target.value)}
      ></input>
      <button className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;
