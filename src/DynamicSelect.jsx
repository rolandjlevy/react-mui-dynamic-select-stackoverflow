import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import flatData from './data';

// NON CASCADING
function DynamicSelect() {
  const [optionsToRender, setOptionsToRender] = useState([]);
  const getParentOptions = (id, parentsToRender = []) => {
    const foundElement = flatData.find((item) => item.approval_rules_id === id);
    //  Check is there is a parent
    if (foundElement && foundElement.approval_rules_parent_id) {
      const currentParent = flatData.find(
        (item) =>
          item.approval_rules_id === foundElement.approval_rules_parent_id,
      );
      const allCurrentParents = flatData.filter(
        (item) =>
          item.approval_rules_parent_id ===
          currentParent.approval_rules_parent_id,
      );
      if (allCurrentParents.length) {
        if (currentParent.approval_rules_parent_id) {
          parentsToRender.unshift(allCurrentParents);
        }
        return getParentOptions(
          currentParent.approval_rules_parent_id,
          parentsToRender,
        );
      } else {
        return parentsToRender;
      }
    } else {
      const topLevelOptions = flatData.filter(
        (item) => !item.approval_rules_parent_id,
      );
      parentsToRender.unshift(topLevelOptions);
      return parentsToRender;
    }
  };
  const getCurrentAndChildOptions = (
    id,
    currentAndChildOptionsToRender = [],
  ) => {
    const foundElement = flatData.find((item) => item.approval_rules_id === id);
    // Only push results if the are NOT from the top level
    if (foundElement.approval_rules_parent_id) {
      const currentLevelOptions = flatData.filter(
        (item) =>
          item.approval_rules_parent_id ===
          foundElement.approval_rules_parent_id,
      );
      currentAndChildOptionsToRender.push(currentLevelOptions);
    }
    const doesChildExist = flatData.find(
      (item) =>
        item.approval_rules_parent_id === foundElement.approval_rules_id,
    );
    if (doesChildExist) {
      const result = getCurrentAndChildOptions(
        doesChildExist.approval_rules_id,
        currentAndChildOptionsToRender,
      );
      return result ? result : [];
    } else {
      return currentAndChildOptionsToRender;
    }
  };
  const handleChangeOption = (value) => {
    if (value === 'Select an option') {
      const initialOptions = flatData.filter(
        (option) => !option.approval_rules_parent_id,
      );
      setOptionsToRender([initialOptions]);
    } else {
      const parents = getParentOptions(Number(value));
      const currentAndChildOptions = getCurrentAndChildOptions(Number(value));
      setOptionsToRender([...parents, ...currentAndChildOptions]);
    }
  };
  useEffect(() => {
    const initialOptions = flatData.filter(
      (option) => !option.approval_rules_parent_id,
    );
    setOptionsToRender([initialOptions]);
  }, []);
  
  return (
    <div className='App'>
      <form className='form-control'>
        {optionsToRender.map((selectElement, index) => (
          <select
            className='input-spacing'
            key={index + 1}
            onChange={(event) => handleChangeOption(event.target.value)}
          >
            {!selectElement[0].approval_rules_parent_id && (
              <option>Select an option</option>
            )}
            {selectElement.map((option) => (
              <option
                value={option.approval_rules_id}
                key={option.approval_rules_id}
              >
                {option.name}
              </option>
            ))}
          </select>
        ))}
      </form>
    </div>
  );
}
export default DynamicSelect;
