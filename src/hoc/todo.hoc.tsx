import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import BoxModel from '../components/boxModel/BoxModel';
import AllTodos from '../middelwares/getTodo.middelware';
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '../models/inputsData.model';
import { v4 as GenId } from 'uuid';
import Todos from 'components/todos/todos';
import { todoActions, todoState } from '../slices/todos.slices';
import { useSelector } from 'react-redux';

interface Props extends React.HTMLProps<HTMLAllCollection> {

}

export const TodoHOC: React.FC<Props> = () => {
    
    const [ShowTodos, setShowTodos] = React.useState<boolean>(true);
    const {appendTodo, localStore} = todoActions;
    const state = useSelector(todoState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AllTodos());
        if(state.length >= 1){
            localStorage.setItem("todos", JSON.stringify(state))
        }else if(state.length === 0 && localStorage.getItem("todos")){
            const todos = JSON.parse(localStorage.getItem("todos")||'')
            dispatch(localStore(todos))
        }
    }, [dispatch, state, localStore])

    const onSubmit: SubmitHandler<Inputs> = (data:Inputs) => {
        const todo = {todo_id: GenId(), ...data}
        dispatch(appendTodo(todo))
    };
    const openBtn = () => {
        const  section = document.querySelector("section") as HTMLDivElement;
        section.classList.add("show");
    };
    const CloseBtn = () => {
        setShowTodos(ShowTodos => !ShowTodos);
        const  section = document.querySelector("section") as HTMLDivElement;
        const textArea = section.querySelector("textarea") as HTMLTextAreaElement;
        section.classList.remove("show");
        textArea.value = "";
    };
    const sendBtn = () => {
        setShowTodos(ShowTodos => !ShowTodos);
        const  section = document.querySelector("section") as HTMLDivElement;
        section.classList.remove("show");
    };

  return (
    <div>
        <BoxModel onSubmitForm={onSubmit} CloseBtn={CloseBtn} sendBtn={sendBtn}/>
        <Todos openBtn={openBtn} todos={state} ShowTodos={ShowTodos} setShowTodos={setShowTodos}/>
    </div>
)
}