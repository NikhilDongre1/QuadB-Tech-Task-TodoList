import {useState} from 'react';
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import {useDispatch, useSelector} from 'react-redux';
import {deleteAll} from './redux/todoapp/actions';

function App() {
 
  const dispatch = useDispatch();
  const todos = useSelector((state)=>state.operationsReducer);
  const [editFormVisibility, setEditFormVisibility]=useState(false);
  const [editTodo, setEditTodo]=useState('');
  const handleEditClick=(todo)=>{
    setEditFormVisibility(true);
    setEditTodo(todo);
  }
  const cancelUpdate=()=>{
    setEditFormVisibility(false);
  }
    return (
    <div className="wrapper mt-5">
      <br></br>
      <h1 className="text-center">TODO-APP </h1>
      <TaskInput editFormVisibility={editFormVisibility} editTodo={editTodo}
      cancelUpdate={cancelUpdate}/>
      <TaskList handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
      {todos.length > 1 && (
        <button className='btn btn-danger btn-md delete-all mx-5'
        onClick={()=>dispatch(deleteAll())}>DELETE ALL</button>
      )}
    </div>
  );
}

export default App;
