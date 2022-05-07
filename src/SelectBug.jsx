import React, { useState } from 'react';
import { 
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

import { v4 as uuid } from 'uuid';

import data from './data';

const childDropdowns = {}

const dropdowns = data
  .filter(rule => !rule.approval_rules_parent_id)
  .reduce((acc, item) => {
  const items = data.filter(child => item.approval_rules_id  === child.approval_rules_parent_id);
  childDropdowns[`approval_rules_id_${item.approval_rules_id}`] = {
    name:item.name,
    items
  }
    // add another prop called: approval_rules_id_2_name
    // console.log("item name:", item.name);
  acc.push(item);
  return acc;
}, []);

export default function DynamicSelect() {
  
  const [itemName, setItemName] = useState('approval_rules_id_1');
  
  const handleChange = (e) => {
    const childDropdown = childDropdowns[e.target.value];
    setItemName(childDropdown.name);
    console.log(childDropdown);
  };
  
  return (
    <Box sx={{ minWidth: 120 }}>
      {dropdowns.length > 0 &&
        <FormControl fullWidth>
          <InputLabel id="parent-select-label">Rule</InputLabel>
          <Select
            labelId="parent-select-label"
            id="simple-select"
            value={itemName || ""}
            label="Rule"
            onChange={handleChange}
          >
            {dropdowns.map(item => {
            return (
              <MenuItem
                value={`approval_rules_id_${item.approval_rules_id}`} 
                key={uuid()}>{item.name}</MenuItem>)})}
          </Select>
        </FormControl>
      }
    </Box>
  );
}
