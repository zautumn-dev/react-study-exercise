import ListItem from './ListItem';

const initialItems = [
  {id: 1, description: 'Passports', quantity: 2, packed: false},
  {id: 2, description: 'Socks', quantity: 12, packed: true},
];
export default function PackingList() {

  return (
      <div className="list">
        <ul>
          {
            initialItems.map(item => <ListItem key={item.id} item={item}/>)
          }
        </ul>

        <div className="actions">
          <select>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button>Clear list</button>
        </div>
      </div>
  );
}
