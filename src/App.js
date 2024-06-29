import { useState, useEffect } from 'react';
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.operationsReducer);
  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [editTodo, setEditTodo] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (storedTodos.length > 0) {
      dispatch({ type: 'SET_TODOS', payload: storedTodos });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEditClick = (todo) => {
    setEditFormVisibility(true);
    setEditTodo(todo);
  }

  const cancelUpdate = () => {
    setEditFormVisibility(false);
  }

  return (
    <div className="wrapper h" data-bs-theme="dark">
      <br />
      <h1 className="text-center">TODO-APP</h1>
      <p>Before you start anything, learn how to finish it.</p>
      <TaskInput editFormVisibility={editFormVisibility} editTodo={editTodo} cancelUpdate={cancelUpdate} />
      <TaskList handleEditClick={handleEditClick} editFormVisibility={editFormVisibility} />
      {todos.length > 1 && (
        <button className='btn btn-danger btn-md delete-all mx-5' onClick={() => dispatch(deleteAll())}>
          DELETE ALL
        </button>
      )}
    </div>
  );
}

export default App;
