# Notes

### TODO

  1. Try to replace SelectMenuItem with MenuItem
  2. Make a reusable component which has the Select component with child MenuItem components. It accepts a childItem prop
  3. Have two variables using useState - one for the Select value and one for the childItems array. Each useState is an object which can accept multiple props infinately
  4. The onClick events use the same function but pass a different variable

### Links
- https://www.npmjs.com/package/react-dropdown-cascade
- https://www.npmjs.com/package/rc-cascader
- https://thewebdev.info/2021/12/25/how-to-position-menuitems-under-the-react-material-ui-select-component/
- https://stackoverflow.com/questions/66943324/mui-select-component-with-custom-children-item
- https://codesandbox.io/s/66943324material-ui-select-component-with-custom-children-item-1k57s?file=/demo.tsx

```

const SelectMenuItem = (props) => (
  <MenuItem {...props}>
    <ListItemText primary={props["data-value"]} />
  </MenuItem>
);

{dropdowns.map(dropdown => (
  <SelectMenuItem 
    onClick={(e) => handleClick(e, dropdown.childItems)}
    value={dropdown.name} 
    key={uuid()}
  >
    {dropdown.name}
  </SelectMenuItem>
))}

{childItems.length > 0 ? (
  <ul>
    {childItems.map((child) => (<li key={uuid()}>{child.name}</li>))}
  </ul>
) : null}

import Cascader from 'rc-cascader';
import options from './options';
<Cascader options={options}><button>Cities</button></Cascader>

  const getItems = (arr) => arr.reduce((acc, item) => {
    const childItems = data.filter((child) =>  item.approval_rules_id  === child.approval_rules_parent_id);
    let childObj = null;
    if (childItems.length > 0) {
      childObj = { childItems: getItems(childItems) };
    }
    acc.push({
      approval_rules_id: item.approval_rules_id,
      item,
      ...childObj
    });
    return acc;
  }, []);
        
```