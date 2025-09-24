export default function ListItem({ item, onDelItem, onSwitchPacked }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={(_) => onSwitchPacked(item.id)}
      />
      <span style={{ textDecoration: item.packed && "line-through" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(_) => onDelItem(item.id)}>❌</button>
    </li>
  );
}
