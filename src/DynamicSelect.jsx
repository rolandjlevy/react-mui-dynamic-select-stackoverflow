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
  Select,
  Typography
} from '@mui/material';

const dropdowns = data
  .filter(rule => !rule.approval_rules_parent_id)
  .reduce((acc, item) => {
  item.childItems = data.filter(child => item.approval_rules_id  === child.approval_rules_parent_id);
  acc.push(item);
  return acc;
}, []);

const SelectMenuItem = (props) => (
  <MenuItem {...props}>
    <ListItemText primary={props["data-value"]} />
  </MenuItem>
);

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
          sx={{ minWidth: 200}}
        >
          {dropdowns.map(dropdown => (
            <SelectMenuItem 
              onClick={(e) => handleClick(e, dropdown.childItems)}
              value={dropdown.name} 
              key={uuid()}
            >
              {dropdown.name}
            </SelectMenuItem>
          ))}
        </Select>
      </FormGroup>

      {childItems.length > 0 ? (
        <FormGroup>
          <Select
            value={dropdownValueChildren} 
            onChange={handleChangeChildren}
            sx={{ minWidth: 200, marginTop: 2}}
          >
            {childItems.map((child) => (
              <MenuItem 
                onClick={(e) => handleClickChildren(e, child)}
                value={child.name}
                key={uuid()}
              >
                {child.name}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
      ) : null}
        
    </Box>
  );
}