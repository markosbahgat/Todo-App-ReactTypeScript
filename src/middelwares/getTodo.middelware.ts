import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { IFetchedTodo } from '../models/fetchedTodo.model';

interface TodosError {
    statusCode:number,
    message:string,
}


const AllTodos = createAsyncThunk<
IFetchedTodo[],
    void,
    {rejectValue: TodosError}
>('Todos/FetchAll', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get<IFetchedTodo[]>("https://jsonplaceholder.typicode.com/todos");
        const data :IFetchedTodo[] = response.data;
        return data;

    }catch(error: any){
        return rejectWithValue(error as TodosError)
    }
})



export default AllTodos;