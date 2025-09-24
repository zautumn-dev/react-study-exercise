import {useState} from 'react';
import ListItem from './ListItem';

export default function PackingList({items, onHandler}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems = items;

  // localeCompare  --> 比较两个字符串 返回 -1 0 1 常用字符排序
  if (sortBy === 'description') sortedItems = items.slice()
      // a 小于 b 返回-1  a 大于 b 返回 1
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed') sortedItems = items.slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
              <ListItem
                  key={item.id}
                  item={item}
                  onDelItem={onHandler.onDelItem}
                  onSwitchPacked={onHandler.onSwitchPacked}
              />
          ))}
        </ul>

        <div className="actions">
          <select
              value={sortBy}
              onChange={(e) => setSortBy((_) => e.target.value)}
          >
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onHandler.clearItems}>Clear list</button>
        </div>
      </div>
  );
}
