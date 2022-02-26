import { combineReducers } from "@reduxjs/toolkit";
import { todoReducer } from "../slices/todos.slices";

const RootReducer = combineReducers({
    todo: todoReducer
});

export type RootState = ReturnType <typeof RootReducer>;

export default RootReducer;