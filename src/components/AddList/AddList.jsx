import React, { useState, useEffect } from "react";
import axios from 'axios';

import List from "../List/List";
import Add from './../../assets/img/add.svg';
import Badge from "../Badge/Badge";

import './AddList.scss'
import Close from './../../assets/img/close.svg'

function AddList ({colors, onAdd}) {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
          selectColor(colors[0].id);
        }
      }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
          alert('Введите название списка');
          return;
        }
        setIsLoading(true);
        axios
          .post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor
          })
          .then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name;
            const listObj = { ...data, color: { name: color } };
            onAdd(listObj);
            onClose();
          })
          .catch(()=> {
            alert("Error during adding new list")
        })
          .finally(() => {
            setIsLoading(false);
          });
      };


    return (
        <div className="add-list">
            <List onClick={() => setVisiblePopup(true)} items={[
            {
              className:'list__add-button',
            icon: (<img src={Add} alt="add icon"/>),
            name: 'Add new directory'
            }
            
        ]}/>

        {visiblePopup && <div className="add-list__popup">
            <img onClick={onClose} src={Close} alt="close" className="add-list__popup-close-btn"/>


            <input value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            className='field' type="text" placeholder="List name" />



            <div className="add-list__popup-colors">
                <ul>
                    
                    {
                        colors.map(color => 
                            <Badge onClick={() => selectColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}/>
                            )
                    }
                </ul>
            </div>
            <button onClick={addList} className="button">{isLoading ? 'Добавление...' : 'Добавить'}</button>
        </div>}
        </div>
    )
}

export default AddList;