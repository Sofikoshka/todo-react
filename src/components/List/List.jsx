import React from "react";
import axios from 'axios';
import './List.scss';
import classNames from "classnames";

import Badge from '../Badge/Badge';
import Remove from './../../assets/img/remove.svg'

function List({items, isRemovable, onClick, onRemove, onClickItem, activeItem }) {


  const removeList = (item) => {
    if(window.confirm('Are you sure that you wanna delete this list?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  }


    return (
        <ul onClick={onClick} className='list'>
            {
                items.map((item, index) => 
                 <li key={index} className={classNames(item.className, { active : activeItem && activeItem.id === item.id})} 
                 onClick={onClickItem ? () => onClickItem(item): null}>
                    <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                    <span>{item.name} {item.tasks && ` (${item.tasks.length})`}</span>
                    {isRemovable && <img className="list__remove-icon" src={Remove} alt="remove" onClick={() => removeList(item)} />}
                  </li> )
            }
         
          
        
          </ul>
    )
}

export default List;