import "./index.css";
import Header from "./components/Header";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  //  派生状态
  const itemNum = items.length;
  const packedNum = items.reduce((a, b) => (b.packed ? a + 1 : a), 0);
  // round --> 四舍五入最接近的整数
  const packedScale = Math.round((packedNum / itemNum) * 100);

  function onAddItem(newItem) {
    setItems((items) => [...items, { ...newItem }]);
  }

  // toggle ---> 切换
  function onSwitchPacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function onDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function clearItems() {
    setItems((_) => []);
  }

  return (
    <div className="app">
      <Header></Header>
      <Form onAddItem={onAddItem} />
      <PackingList
        items={items}
        onHandler={{
          onSwitchPacked,
          onDeleteItem,
          clearItems,
        }}
      />
      <Stats
        state={{
          itemNum,
          packedScale,
          packedNum,
        }}
      />
    </div>
  );
}

export default App;
