import React from 'react'

import './Tasks.scss';
import Edit from './../../assets/img/edit.svg'
import axios from 'axios';

import AddTaskForm from './AddTaskForm';
import Task from '../Task/Task';


function Tasks({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask}) {
  
  const editTitle = () => {
      const newTitle = window.prompt("New list name:", list.name);
      if(newTitle) {
        onEditTitle(list.id, newTitle);
        axios.patch('http://localhost:3001/lists/' + list.id, {
          name:newTitle
        }).catch(() => {
          alert("server error");
        })
      }
  }

  

  return (
    <div className='tasks'>
        <h2 style={{color:list.color.hex}} className='tasks__title'>{list.name}
        <img onClick={editTitle} src={Edit} alt="edit" />
        </h2>

        <div className="tasks__items">
          {!list.tasks.length && <h2>There is no tasks</h2>}
          {
            list.tasks.map(task => 
              <Task key={task.id} list={list} onComplete={onCompleteTask} onEdit={onEditTask} onRemove={onRemoveTask} {...task}/>
          )}
          
          </div>
          <AddTaskForm list={list} onAddTask={onAddTask}/>
    </div>
  )
}

export default Tasks;