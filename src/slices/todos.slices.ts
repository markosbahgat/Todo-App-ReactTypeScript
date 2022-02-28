import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AllTodos from "../middelwares/getTodo.middelware";
import { RootState } from '../store/rootReducer';
import { ITodo } from '../models/todo.model';


export interface TodoState {
    todos: ITodo[]
}

const initialState:TodoState = {
 todos:[]
}
const todosSlice = createSlice({
    name:"Todos",
    initialState,
    reducers:{
        appendTodo: (state, {payload}: PayloadAction<ITodo>) => {
            state.todos.push(payload);
        },
        updateTodo: (state, {payload}: PayloadAction<string>) => {

        },
        deleteTodo: (state, {payload}: PayloadAction<string>) => {
            state.todos = state.todos.filter(item => item.todo_id !== payload);
        },
        localStore: (state, {payload} : PayloadAction<ITodo[]>) => {
            state.todos = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AllTodos.pending, (state) => {
        });
        builder.addCase(AllTodos.fulfilled, (state, action) => {
            console.log(state, action)
            
        });
        builder.addCase(AllTodos.rejected, (state, action) => {
            console.log(state, action)

        })
    },
})

export const todoReducer = todosSlice.reducer;
export const todoActions = todosSlice.actions;

export const todoState = (state:RootState) => state.todo.todos;