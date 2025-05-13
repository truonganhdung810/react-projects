import { useState } from 'react'
import './App.css'

function App() {
  const [listCongViec, setListCongViec] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const submitCongViec = (event) => {
    event.preventDefault()
    console.log('Dữ liệu nhập:', inputValue)
    if (inputValue.trim()) {
      setListCongViec([...listCongViec, inputValue]) // Thêm phần tử mới vào mảng
      setInputValue('') // Xóa input sau khi thêm
    }
  }

  const deleteItem = (index) => {
    console.log(index)
    setListCongViec(listCongViec.filter((_, i) => i !== index)) // Xóa phần tử tại index
  }

  const editItem = (index) => {
    setEditValue(listCongViec[index])
    setIsEditing(true)
    setEditingIndex(index)
  }

  // Bắt đầu chỉnh sửa
  const handleEditStart = (index, value) => {
    setEditingIndex(index)
    setEditValue(value)
  }

  // Lưu chỉnh sửa
  const handleEditSave = (event) => {
    event.preventDefault()
    if (editValue.trim()) {
      setIsEditing(false)
      const updatedItems = [...listCongViec]
      updatedItems[editingIndex] = editValue
      setListCongViec(updatedItems)
    }
    setEditingIndex(null) // Thoát chế độ chỉnh sửa
  }

  const setCancelEdit = (index) => {
    setIsEditing(false)
    setEditingIndex(null)
  }

  return (
    <div className="App">
      <h1>To Do List App</h1>
      <ToDoForm
        submitCongViec={submitCongViec}
        inputValue={inputValue}
        setInputValue={setInputValue}
      ></ToDoForm>
      {listCongViec.length !== 0 ? (
        <div className="custom-list">
          {listCongViec.map((item, index) => (
            <ToDoItem
              key={index}
              index={index}
              work={item}
              deleteItem={deleteItem}
              isEditing={isEditing}
              editItem={editItem}
              editValue={editValue}
              setEditValue={setEditValue}
              editingIndex={editingIndex}
              handleEditSave={handleEditSave}
              setCancelEdit={setCancelEdit}
            ></ToDoItem>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

function ToDoItem(props) {
  return (
    <div className="todo-item">
      {props.isEditing === false || props.editingIndex !== props.index ? (
        <div className="todo-item">
          <span className="todo-work">{props.index + '. ' + props.work}</span>
          <div className="button-group">
            <button
              className="edit-btn"
              onClick={() => props.editItem(props.index)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => props.deleteItem(props.index)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form className="edit-item" onSubmit={props.handleEditSave}>
          <input
            type="text"
            value={props.editValue}
            onChange={(e) => props.setEditValue(e.target.value)}
            autoFocus
            style={{ padding: '10px', fontSize: 'large' }}
          />
          <div className="button-group">
            <button className="edit-btn" type="submit">
              Save
            </button>
            <button
              className="cancel-btn"
              type="button"
              onClick={() => props.setCancelEdit(props.editingIndex)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
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
  )
}

export default App
