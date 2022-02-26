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
        updateTodo: (state, action) => {},
        deleteTodo: (state, action) => {},
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