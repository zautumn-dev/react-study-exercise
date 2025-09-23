export default function ListItem({item}) {

  return <li>
    <input
        type="checkbox"
        value={item.packed}
    />
    <span style={{textDecoration: item.packed && 'line-through'}}>
        {item.quantity} {item.description}
      </span>
    <button>❌</button>
  </li>;
}