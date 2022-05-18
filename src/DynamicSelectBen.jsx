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
  
  const getParentOptions = (optionId, arrayToSearch) => {
    const foundParent = arrayToSearch.find(
      (option) => option.approval_rules_id === Number(optionId)
    );
    if (foundParent) {
      return arrayToSearch.map((parent) => ({
        ...parent,
        childItems: [],
      }));
    }
    for (let index = 0; index < arrayToSearch.length; index++) {
      const option = arrayToSearch[index];
      if (option.childItems) {
        const result = getParentOptions(optionId, option.childItems);
        return result ? result : [];
      }
    }
  };
  
  const getChildOptions = (optionId, arrayToSearch) => {
    const foundParent = arrayToSearch.find(
      (option) => option.approval_rules_id === Number(optionId)
    );
    if (foundParent) {
      return foundParent.childItems.map((childItem) => ({
        ...childItem,
        childItems: [],
      }));
    }
    for (let index = 0; index < arrayToSearch.length; index++) {
      const option = arrayToSearch[index];
      if (option.childItems) {
        const result = getChildOptions(optionId, option.childItems);
        return result ? result : [];
      }
    }
  };
  
  const handleChangeOption = ({ target: { value } }) => {
    const childOptions = getChildOptions(value, nestedData);
    if (childOptions.length) {
      setOptionsToRender(childOptions);
    } else {
      alert('end of the line');
    }
  };
  
  useEffect(() => {
    const initialOptions = nestedData.map((option) => ({
      ...option,
      childItems: [],
    }));
    setOptionsToRender(initialOptions);
  }, []);
  
  const renderDropdowns = (selectedOption = null, selectsToRender = []) => {
    //  Handle if item has child options
    if (
      selectedOption?.length &&
      selectedOption.every((option) => option?.approval_rules_parent_id)
    ) {
      const parentOptions = getParentOptions(
        selectedOption[0].approval_rules_parent_id,
        nestedData
      );
      selectsToRender.unshift(
        <select className='input-spacing' onChange={handleChangeOption}>
          <option>Select an option</option>
          {selectedOption.map((option) => (
            <option
              value={option.approval_rules_id}
              key={uuid()}
            >
              {option.name}
            </option>
          ))}
        </select>
      );
      return renderDropdowns(parentOptions, selectsToRender);
    }
    // Handle if top level
    if (
      selectedOption &&
      selectedOption.every((option) => !option.approval_rules_parent_id)
    ) {
      selectsToRender.unshift(
        <select className='input-spacing' onChange={handleChangeOption}>
          <option>Select an option</option>
          {selectedOption.map((option) => (
            <option
              value={option.approval_rules_id}
              key={uuid()}
            >
              {option.name}
            </option>
          ))}
        </select>
      );
      return selectsToRender;
    }
  };
  
  return (
    <div>
      <form className='form-control'>{renderDropdowns(optionsToRender)}</form>
    </div>
  );
}