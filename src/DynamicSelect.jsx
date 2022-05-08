import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import data from './data';

import { 
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  FormControl,
  FormGroup,
  Select
} from '@mui/material';

const dropdowns = data
  .filter(rule => !rule.approval_rules_parent_id)
  .reduce((acc, item) => {
  item.childItems = data.filter(child => item.approval_rules_id  === child.approval_rules_parent_id);
  acc.push(item);
  return acc;
}, []);

export default function DynamicSelect() {
  
  const [dropdownValue, setDropdownValue] = useState(dropdowns[0].name);
  const handleChange = (e) => setDropdownValue(e.target.value);
  const handleClick = (e, items) => {
    setChildItems(items);
    setDropdownValueChildren(items[0].name);
  }

  const [childItems, setChildItems] = useState([]);
  const [dropdownValueChildren, setDropdownValueChildren] = useState('');
  const handleChangeChildren = (e) => {
    setDropdownValueChildren(e.target.value);
  }
  const handleClickChildren = (e, child) => {
    console.log('handleClickChildren:', child);
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
              onClick={(e) => handleClick(e, item.childItems)}
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
                onClick={(e) => handleClickChildren(e, item)}
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