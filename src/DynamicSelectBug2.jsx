import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import data from './data';

export default function DynamicSelect() {

  const getItems = (arr) => arr.reduce((acc, item) => {
    const childItemsArr = data.filter((child) => item.approval_rules_id  === child.approval_rules_parent_id);
    let childItems = childItemsArr.length > 0 ? getItems(childItemsArr) : [];
    acc.push({...item, childItems });
    return acc;
  }, []);

  const parentItems = data.filter(rule => !rule.approval_rules_parent_id);

  const nestedData = getItems(parentItems);

  const [optionsToRender, setOptionsToRender] = useState([]);
  
  const [selectsToRender, setSelectsToRender] = useState([]);
  
  const handleChangeOption = ({ target: { value } }) => {
    const found = nestedData.find(item => item.approval_rules_id === Number(value));
    console.log({found})
    if (found && found.childItems && found.childItems.length) {
      setOptionsToRender(found.childItems);
    } else {
      alert('end of the line');
    }
  };

  useEffect(() => {
    setOptionsToRender(nestedData);
  }, []);

  const renderSingleDropdown = (options) => {
    return (
      <select className='input-spacing' onChange={handleChangeOption}>
        <option key={uuid()}>Select an option</option>
        {options.map((option) => (
          <option
            value={option.approval_rules_id}
            key={uuid()}
          >
            {option.name}
          </option>
        ))}
      </select>)
  }

  const renderDropdowns = ({ selectedOptions, selectsToRenderTemp = [] }) => {
    
    selectsToRenderTemp.unshift(renderSingleDropdown(selectedOptions));
    
    return selectsToRenderTemp;
  };

  return (
    <div>
      <form className='form-control'>
        {renderDropdowns({selectedOptions: optionsToRender})}
      </form>
    </div>
  );
}