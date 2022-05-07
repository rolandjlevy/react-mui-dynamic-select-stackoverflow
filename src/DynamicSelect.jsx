import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import data from './data';

import { 
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  FormControl,
  Select,
  Typography
} from '@mui/material';

const myTypes = {
  TYPE_1: {label:"Type 1", items: [1, 2, 3]},
  TYPE_2: {label:"Type 2", items: [4, 5, 6, 7, 8]},
  TYPE_3: {label:"Type 3", items: [9, 10]},
  TYPE_4: {label:"Type 4", items: [11, 12, 13, 14]},
};

const dropdowns = data
  .filter(rule => !rule.approval_rules_parent_id)
  .reduce((acc, item) => {
  item.childItems = data.filter(child => item.approval_rules_id  === child.approval_rules_parent_id);
  acc.push(item);
  return acc;
}, []);

console.log(dropdowns)

const SelectMenuItem = (props) => (
  <MenuItem {...props}>
    <ListItemText primary={props["data-value"]} />
  </MenuItem>
);

export default function DynamicSelect() {
  const [state, setState] = useState(myTypes.TYPE_1.label);
  const [childItems, setChildItems] = useState([]);
  const handleChange = (e) => setState(e.target.value);
  const handleClick = (e, items) => setChildItems(items);

  return (
    <Box>
      <FormControl>
        <Select 
          value={state} 
          onChange={handleChange} 
          sx={{ maxWidth: 250 }}
        >
          {Object.keys(myTypes).map((type, index) => (
            <SelectMenuItem 
              onClick={(e) => handleClick(e, myTypes[type].items)}
              value={myTypes[type].label} 
              key={uuid()}
            >
              {myTypes[type].label}
            </SelectMenuItem>
          ))}
        </Select>
        
        {childItems.length > 0 ? (
          <ul>
            {childItems.map(child => (<li key={uuid()}>{child}</li>))}
          </ul>
        ) : null}
        
      </FormControl>
    </Box>
  );
}
