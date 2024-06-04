import React, { useState, useEffect } from 'react';
import listSvg from './assets/img/list.svg';
import {List, AddList, Tasks} from './components/index';
import axios from 'axios';

import "./index.scss";

function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

      const onAddList = obj => {
          const newList = [
            ...lists, obj

          ];
          setLists(newList);
      }

      const onAddTask = (listId, taskObj) => {
        const newList = lists.map(item => {
          if(item.id === listId) {
            item.tasks = [...item.tasks, taskObj];
          }
          return item;
        });
        setLists(newList);
    }

      const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
          if (item.id === id) {
              item.name = title;
      }
        return item;
    });
        setLists(newList);
      };

      const onRemoveTask = (listId, taskId) => {
       
        
        if(window.confirm('Are u sure u wanna delete this task?')) {
          const newList = lists.map(item => {
            if(item.id === listId) {
              item.tasks = item.tasks.filter(task => task.id !== taskId);
            }
            return item;
          })
          setLists(newList);
          axios.delete('http://localhost:3001/tasks/' + taskId
            ).catch(() => {
              alert("server error");
            })
        }
      }

      const onEditTask = (listId, taskObj) => {
            const newTaskText = window.prompt("New task text", taskObj.text);
            if(!newTaskText) {
              return;
            }
          const newList = lists.map(item => {
            if(item.id === listId) {
              item.tasks = item.tasks.map(task => {
                if (task.id === taskObj.id) {
                  task.text = newTaskText;
                }
                return task;
              });
            }
            return item;
          })
          setLists(newList);
          axios.patch('http://localhost:3001/tasks/' + taskObj.id, {text:newTaskText }
            ).catch(() => {
              alert("server error");
            })
        
      }
      const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
          if (list.id === listId) {
            list.tasks = list.tasks.map(task => {
              if (task.id === taskId) {
                task.completed = completed;
              }
              return task;
            });
          }
          return list;
        });
        setLists(newList);
        axios
          .patch('http://localhost:3001/tasks/' + taskId, {
            completed
          })
          .catch(() => {
            alert('Не удалось обновить задачу');
          });
      };
  return (
    <div className='app'>

    
    <div className="todo">
      <div className='todo__sidebar'>
            
          <List items={[
            {
            
            icon: (<img className='list__icon-list'src={listSvg} alt="list icon"/>),
            name: 'All tasks',
            
            }
            
          ]}/>
          {lists ? (
          <List
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            onClickItem={item =>{
                setActiveItem(item);
              }
            }
            activeItem={activeItem}
            isRemovable
          />
        ) : (
          'Загрузка...'
        )}
        <AddList onAdd={onAddList} colors={colors} />
        
      </div>
      <div className="todo__tasks">{lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} onEditTask={onEditTask} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />}</div>
    </div>
        
    </div>
  );
}

export default App;
