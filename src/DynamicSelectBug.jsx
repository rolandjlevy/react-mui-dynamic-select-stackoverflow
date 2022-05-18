import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import data from './data';

import { 
  Box,
  MenuItem,
  FormGroup,
  Select
} from '@mui/material';

export default function DynamicSelect() {

  const injectChildItems = (arr) => arr.reduce((acc, item) => {
    item.childItems = data.filter((child) => {
      return item.approval_rules_id  === child.approval_rules_parent_id;
    });
    if (item.childItems.length > 0) {
      // console.log('item.childItems.length:', item.childItems.length);
      item.childItems.forEach(nthChild => {
        const childItems = injectChildItems(item.childItems);
        // console.log('childItems:', childItems);
        nthChild.childItems = [...childItems];
      });
    }
    acc.push(item);
    return acc;
  }, []);
    
  const parentItems = data.filter(rule => !rule.approval_rules_parent_id);
  const dropdowns = injectChildItems(parentItems);
  
  console.log(dropdowns);
  
  const [dropdownValue, setDropdownValue] = useState(dropdowns[0].name);
  const handleChange = (e) => setDropdownValue(e.target.value);
  const handleClick = (items) => {
    setChildItems(items);
    setDropdownValueChildren(items[0].name);
  }

  const [childItems, setChildItems] = useState([]);
  const [dropdownValueChildren, setDropdownValueChildren] = useState('');
  const handleChangeChildren = (e) => {
    setDropdownValueChildren(e.target.value);
  }
  const handleClickChildren = (items) => {
    setGrandChildItems(items);
    setDropdownValueGrandChildren(items[0].name);
  }

  return (
    <Box component="form">
      <FormGroup>
        <Select 
          value={dropdownValue} 
          onChange={handleChange}
          sx={{ maxWidth: 250 }}
        >
          {dropdowns.map(item => (
            <MenuItem 
              onClick={() => handleClick(item.childItems)}
              value={item.name} 
              key={uuid()}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>

      {childItems.length > 0 ? (
        <FormGroup>
          <Select
            value={dropdownValueChildren} 
            onChange={handleChangeChildren}
            sx={{ maxWidth: 250, marginTop: 2 }}
          >
            {childItems.map((item) => (
              <MenuItem 
                onClick={() => handleClickChildren(item.childItems)}
                value={item.name}
                key={uuid()}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
      ) : null}
        
    </Box>
  );
}