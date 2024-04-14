import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather/trash';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { removeTodo, handleCheckbox } from '../redux/todoapp/actions';

export const TaskList = ({ handleEditClick, editFormVisibility }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.operationsReducer);

  return (
    <div className="container" style={{
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth:"600px"
      
    }}>
      {todos.map((todo) => (
        <div key={todo.id} className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              {editFormVisibility === false && (
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={todo.completed}
                    onChange={() => dispatch(handleCheckbox(todo.id))}
                  />
                  <label className="form-check-label">
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.todo}
                    </span>
                  </label>
                </div>
              )}
              {editFormVisibility === true && (
                <input
                  type="text"
                  className="form-control mb-2"
                  value={todo.todo}
                  disabled
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                />
              )}
            </div>
            <div className="actions-box">
              {editFormVisibility === false && (
                <>
                  <button className="btn btn-link" onClick={() => handleEditClick(todo)}>
                    <Icon icon={edit2} size={20} />
                  </button>
                  <button className="btn btn-link" onClick={() => dispatch(removeTodo(todo.id))}>
                    <Icon icon={trash} size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
