import React, { useEffect } from 'react';
import './style.scss'
import { useForm } from 'react-hook-form';
import { Form } from "react-bootstrap";
import { EPriority } from '../../models/priority.model';
import { Inputs } from '../../models/inputsData.model';

interface Props extends React.HTMLProps<HTMLAllCollection> {
    onSubmitForm: (data: Inputs) => void,
}

const BoxModel: React.FC<Props> = ({onSubmitForm}) => { 
    
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<Inputs>();
    useEffect(() => {
        isSubmitSuccessful && reset()
    }, [isSubmitSuccessful, reset])

    const CloseBtn = () => {
        const  section = document.querySelector("section") as HTMLDivElement;
        const textArea = section.querySelector("textarea") as HTMLTextAreaElement;
        section.classList.remove("show");
        textArea.value = "";
    };
    const sendBtn = () => {
        const  section = document.querySelector("section") as HTMLDivElement;
        section.classList.remove("show");
      }
    return ( 
        <section>
        <div className="popup-outer">
            <div className="popup-box">
                <i id="close" className="fas fa-close" onClick={CloseBtn}></i>
                <h1>Todo Details</h1>
                <form onSubmit={handleSubmit(onSubmitForm)} className="input_form">
                <div className="input_container">
                    <input type="text" id={`${errors.todoTitle && "error"}`}  className="input_field" placeholder='Todo Title....'  {...register("todoTitle", {  required: true })}/>
                    <i className="fa-solid fa-table-list fa-lg"></i>
                    {errors.todoTitle?.type === 'required' && <span style={{color:"red"}}>Please Enter Todo Title</span>}
                </div>
                    <textarea spellCheck="true" placeholder="Enter Your Todo Description...." {...register("todoDescription", { required: true })}></textarea>
                    <div className="input_container">
                        <input type="text" id={`${errors.todoTitle && "error"}`}  className="input_field" placeholder='Todo Date e.g 20/10/2022'  {...register("todoDate", {  required: true })}/>
                        <i className="fa-solid fa-calendar-plus fa-lg"></i>
                        {errors.todoDate?.type === 'required' && <span style={{color:"red"}}>Please Enter Todo Date</span>}
                    </div>
                    <Form.Group>
                        <Form.Select
                        aria-label="Default select example"
                        {...register("todoPriority", { required: true })}
                        className="input_Select"
                        >
                            <option>Select Priority</option>
                            <option value={EPriority.HIGH}>{EPriority.HIGH}</option>
                            <option value={EPriority.MEDIUM}>{EPriority.MEDIUM}</option>
                            <option value={EPriority.LOW}>{EPriority.LOW}</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="button">
                        <button  className="cancel" onClick={CloseBtn}>Cancel</button>
                        <button className="send" onClick={sendBtn} type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
     );
}
 
export default BoxModel;