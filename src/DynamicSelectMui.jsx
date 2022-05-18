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

  const parentItems = data.filter(rule => !rule.approval_rules_parent_id);

  const getItems = (arr) => arr.reduce((acc, item) => {
    const childItemsArr = data.filter((child) => item.approval_rules_id  === child.approval_rules_parent_id);
    let childItems = childItemsArr.length > 0 ? getItems(childItemsArr) : [];
    acc.push({...item, childItems});
    return acc;
  }, []);

  const dropdowns = getItems(parentItems);

  console.log(dropdowns);
  
  const [dropdownValue, setDropdownValue] = useState(parentItems[0].name);
  const handleChange = (e) => setDropdownValue(e.target.value);
  const handleClick = (e) => console.log(e.target.value);

  return (
    <Box component="form">
      <FormGroup>
        <Select 
          value={dropdownValue} 
          onChange={handleChange}
          sx={{ maxWidth: 250 }}
        >
          {parentItems.map(item => (
            <MenuItem 
              onClick={handleClick}
              value={item.name} 
              key={uuid()}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>

    </Box>
  );
}