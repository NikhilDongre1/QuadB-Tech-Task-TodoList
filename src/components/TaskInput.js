import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../redux/actions';

export const TaskInput = ({ editFormVisibility, editTodo, cancelUpdate }) => {
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    setEditValue(editTodo.todo);
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();
    const todoObj = {
      id: time,
      todo: todoValue,
      completed: false
    };
    setTodoValue('');
    dispatch(addTodo(todoObj));
  };

  const editSubmit = (e) => {
    e.preventDefault();
    const editedObj = {
      id: editTodo.id,
      todo: editValue,
      completed: editTodo.completed
    };
    dispatch(updateTodo(editedObj));
    cancelUpdate();
  };

  return (
    <div className="container-sm mx-20" style={{ flexDirection: "column", alignItems: "flex-start", maxWidth: "600px" }}>
      {!editFormVisibility ? (
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add your todo item"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-secondary">
                ADD
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={editSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Update your todo item"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-secondary">
                UPDATE
              </button>
              <button type="button" className="btn btn-primary" onClick={cancelUpdate}>
                BACK
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
