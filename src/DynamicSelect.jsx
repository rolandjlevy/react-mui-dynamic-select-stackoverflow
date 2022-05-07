import React, { useState } from "react";

import { 
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

const myTypes = {
  TYPE_1: {label:"Type 1", items: [1, 2, 3, 4]},
  TYPE_2: {label:"Type 2", items: [5, 6, 7, 8]},
  TYPE_3: {label:"Type 3", items: [9, 10, 11, 12]},
};

const childrenitems = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4}
];

const handleClick = (e, childItems) => {
  // use setState here to set data for child dropdown
  console.log('handleClick:', childItems);
}

const TypeSelectMenuItem = (props) => {
  return (
    <MenuItem {...props}>
      <ListItemText primary={props["data-value"]} />
    </MenuItem>
  );
};

export default function DynamicSelect() {
  const [state, setState] = useState(myTypes.TYPE_1.label);
  const handleChange = (e) => setState(e.target.value);

  return (
    <Box sx={{ m: 2 }}>
      <FormControl>
        <Select 
          value={state} 
          onChange={handleChange} 
          sx={{ width: 150 }}
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
      </FormControl>
    </Box>
  );
}
