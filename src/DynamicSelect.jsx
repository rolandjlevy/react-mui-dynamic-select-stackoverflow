import React, { useState } from "react";

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

const TypeSelectMenuItem = (props) => (
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
            <TypeSelectMenuItem 
              onClick={(e) => handleClick(e, myTypes[type].items)}
              value={myTypes[type].label} 
              key={type}
            >
              {myTypes[type].label}
            </TypeSelectMenuItem>
          ))}
        </Select>
        
        {childItems.length > 0 ? (
          <ul>
            {childItems.map(child => (<li>{child}</li>))}
          </ul>
        ) : null}
        
      </FormControl>
    </Box>
  );
}
