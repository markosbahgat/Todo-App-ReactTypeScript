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
    const {appendTodo} = todoActions;
    const state = useSelector(todoState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AllTodos());
    }, [dispatch])
    const onSubmit: SubmitHandler<Inputs> = (data:Inputs) => {
        const todo = {todo_id: GenId(), ...data}
        dispatch(appendTodo(todo))

    };
    const openBtn = () => {
        const  section = document.querySelector("section") as HTMLDivElement;
        section.classList.add("show");
      };
  return (
    <div>
        <BoxModel onSubmitForm={onSubmit}/>
        <Todos openBtn={openBtn} todos={state}/>
    </div>
)
}