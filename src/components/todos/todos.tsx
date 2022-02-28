import React from 'react'
import './style.scss';
import { ITodo } from '../../models/todo.model';
import { useAppDispatch } from 'app/hooks';
import { todoActions } from '../../slices/todos.slices';
import { EPriority } from 'models/priority.model';

interface Props {
    openBtn: () => void,
    todos: ITodo[],
    setShowTodos: (ShowTodos: boolean | ((ShowTodos: boolean) => boolean)) => void;
    ShowTodos: boolean,
}

const Todos: React.FC<Props> = ({openBtn, todos, setShowTodos, ShowTodos}) => {
    const intialDate = new Date();
    const {deleteTodo, updateTodo} = todoActions;
    const dispatch = useAppDispatch();
    
    const handleClick = () =>{
      setShowTodos(ShowTodos => !ShowTodos);
      openBtn();
    };

    const handleDelete = (todo_id: string) => {
      if (todos.length === 1){
        localStorage.removeItem("todos")
        dispatch(deleteTodo(todo_id))
      }
      else{
        dispatch(deleteTodo(todo_id))

      }
    };
    const sortedTodos = todos.slice().sort((todo) => (todo.todoPriority === EPriority.HIGH) ? -1 : ((todo.todoPriority === EPriority.MEDIUM) ? 0 : 1))
  return (
      <div className="tasks-container" hidden={!ShowTodos}> 
            <svg viewBox="0 0 0 0" style={{ position: "absolute", zIndex: -1, opacity: 0 }}>
                <defs>
                    <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
                      <stop offset="0%" stopColor="#27FDC7" />
                      <stop offset="100%" stopColor="#0FC0F5" />
                    </linearGradient>
                    <linearGradient id="lineGradient">
                      <stop offset="0%" stopColor="#0FC0F5" />
                      <stop offset="100%" stopColor="#27FDC7" />
                    </linearGradient>
                    <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z" />
                    <path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"/>
                    <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5" />
                    <circle id="todo__circle" cx="13.5" cy="12.5" r="10" />
                </defs>
            </svg>
      
              <div className="todo-list">
                <div className='title_container'>
                  <div id="open" className="button" onClick={handleClick}>
                      <i className="fas fa-plus"></i>
                  </div>
                  <div>
                    <span className="main-span">{intialDate.toLocaleDateString( "en-US" ,{ weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
                    <p className="main-p">{todos.length === 0 ? "There is no tasks": todos.length + " Tasks"}</p>
                  </div>
                </div>
                <hr style={{height:"2px"}}/>
                <div className='main_todo_container'>
                <div className='todo_container' style={{display:`${todos.length >= 1 ? "none" : "flex"}`}}>
                  <label className="todo">
                      <input className="todo__state" type="checkbox" />
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon">
                        <use xlinkHref="#todo__line" className="todo__line" />
                        <use xlinkHref="#todo__box" className="todo__box" />
                        <use xlinkHref="#todo__check" className="todo__check" />
                        <use xlinkHref="#todo__circle" className="todo__circle" />
                      </svg>
                      <div className="todo__text">
                        <h4>This is a sample </h4>
                      </div>
                  </label>
                      <div className='icons_container'>
                              <i className="fa-solid fa-star" onClick={() => console.log("star")}></i>
                              <i className="far fa-edit" onClick={() => console.log("edit")}></i>
                              <i className="far fa-trash-alt" onClick={() => console.log("delete")}></i>
                      </div>
                </div>
                {sortedTodos?.map(todo => (
                  <div className='todo_container' key={todo.todo_id}>
                  <label className="todo">
                      <input className="todo__state" type="checkbox" />
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon">
                        <use xlinkHref="#todo__line" className="todo__line" />
                        <use xlinkHref="#todo__box" className="todo__box" />
                        <use xlinkHref="#todo__check" className="todo__check" />
                        <use xlinkHref="#todo__circle" className="todo__circle" />
                      </svg>
                      <div className="todo__text">
                        <h4>{todo.todoTitle + " "} { " "+todo.todoDate}</h4>
                      </div>
                  </label>
                      <div className='icons_container'>
                              <i className="fa-solid fa-star" style={{color:`${todo.todoPriority === "HIGH" ? "red" : (todo.todoPriority === "LOW" ? "gray" : "blue")}`}}></i>
                              <i className="far fa-edit" onClick={() => dispatch(updateTodo(todo.todo_id))}></i>
                              <i className="far fa-trash-alt" onClick={() => handleDelete(todo.todo_id)}></i>
                      </div>
                </div>
                ))}
            </div>
        </div>
  </div>
  );
}

export default Todos;