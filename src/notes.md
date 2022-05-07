# Notes

- https://thewebdev.info/2021/12/25/how-to-position-menuitems-under-the-react-material-ui-select-component/
- https://stackoverflow.com/questions/66943324/mui-select-component-with-custom-children-item
- https://codesandbox.io/s/66943324material-ui-select-component-with-custom-children-item-1k57s?file=/demo.tsx

```
        {childItems.length > 0 ? (
          <ul>
            {childItems.map((child) => (<li key={uuid()}>{child.name}</li>))}
          </ul>
        ) : null}
```