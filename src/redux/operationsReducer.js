 
import {
    ADD_TODO,
    DELETE_ALL,
    REMOVE_TODO,
    UPDATE_CHECKBOX,
    UPDATE_TODO,
    SET_TODOS
} from './actions';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

export const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            const addedTodos = [...state, action.payload];
            localStorage.setItem('todos', JSON.stringify(addedTodos));
            return addedTodos;
        case DELETE_ALL:
            localStorage.setItem('todos', JSON.stringify([]));
            return [];
        case REMOVE_TODO:
            const filteredTodos = state.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(filteredTodos));
            return filteredTodos;
        case UPDATE_TODO:
            const updatedArray = state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        todo: action.payload.todo,
                        completed: action.payload.completed
                    };
                }
                return item;
            });
            localStorage.setItem('todos', JSON.stringify(updatedArray));
            return updatedArray;
        case UPDATE_CHECKBOX:
            const todoArray = state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed
                    };
                }
                return item;
            });
            localStorage.setItem('todos', JSON.stringify(todoArray));
            return todoArray;
        case SET_TODOS:
            localStorage.setItem('todos', JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }
};
