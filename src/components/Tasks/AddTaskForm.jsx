import React, {useState} from "react";
import axios from "axios";
import Add from './../../assets/img/add.svg'
import './Tasks.scss';

function AddTaskForm({list, onAddTask})  {

    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    }
    const addTask = () => {
        const obj = {
        listId: list.id,
        text: inputValue,
        completed: false};
            setIsLoading(false);
            axios.post('http://localhost:3001/tasks', obj).then(({data}) => {
                
                onAddTask(list.id, obj);
                toggleFormVisible();
            })
            .catch(()=> {
                alert("Error during adding new task")
            })
            .finally(()=> {
                setIsLoading(true);
            });

       
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? <div className="tasks__form-new" onClick={toggleFormVisible}>
                <img src={Add} alt="add new task" />
                <span>New task</span>
            </div> : <div className="tasks__form-block">
            <input value={inputValue}
            onChange={e => setInputValue(e.target.value)} 
            className='field' type="text" placeholder="Enter new task" />
            <button onClick={addTask} className="button">
                { isLoading ? "Adding.." : "Add new task"}
            </button>
            <button className="button button-grey" onClick={toggleFormVisible}>Cancel</button>
            </div>}
          </div>
    )
}

export default AddTaskForm;