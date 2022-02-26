import React from 'react'
import './style.scss';
import { ITodo } from '../../models/todo.model';

interface Props {
    openBtn: () => void,
    todos: ITodo[],
}

const Todos: React.FC<Props> = ({openBtn, todos}) => {
    const intialDate = new Date();
    
  return (
            <div className="tasks-container"> 
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
                    <div id="open" className="button" onClick={openBtn}>
                        <i className="fas fa-plus"></i>
                    </div>
                      <span className="main-span">{intialDate.toLocaleDateString( "en-US" ,{ weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
                      <p className="main-p">16 tasks</p>
                      <hr style={{height:"2px"}}/>
                      <label className="todo">
                          <input className="todo__state" type="checkbox" />
                          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon">
                            <use xlinkHref="#todo__line" className="todo__line" />
                            <use xlinkHref="#todo__box" className="todo__box" />
                            <use xlinkHref="#todo__check" className="todo__check" />
                            <use xlinkHref="#todo__circle" className="todo__circle" />
                          </svg>
                          <div className="todo__text">Do a very important task</div>
                          <i className="fa-solid fa-star"></i>
                      </label>
                      {todos?.map(todo => ( 
                          <label className="todo" key={todo.todo_id}>
                            <input className="todo__state" type="checkbox" />
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" className="todo__icon">
                              <use xlinkHref="#todo__line" className="todo__line" />
                              <use xlinkHref="#todo__box" className="todo__box" />
                              <use xlinkHref="#todo__check" className="todo__check" />
                              <use xlinkHref="#todo__circle" className="todo__circle" />
                            </svg>
                                <i className="fa-solid fa-star"></i>
                                <div className="todo__text">{todo.todoTitle} {todo.todoDate}<i className="far fa-edit"></i>
                                <i className="far fa-trash-alt" style={{zIndex:"10000", position:"relative", float:"right"}}></i>
                            </div>
                          </label>
                      ))}
              </div>
        </div>
  );
}

export default Todos;