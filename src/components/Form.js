import {useState} from 'react';

export default function Form() {

  const [formData, setFormData] = useState({
    value: '',
    quantity: 1,
    packed: false,
    id: Date.now(),
  });

  const [disabled, setDisabled] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    // 恢复状态
    setDisabled(_ => true);
    setFormData(_ => ({
      value: '',
      quantity: 1,
      packed: false,
      id: Date.now(),
    }));
  }

  function updateFormData(key, val) {

    setFormData(formData => ({...formData, [key]: val}));

    const disabledStatus = val.trim() === '';

    console.log(111, disabledStatus);
    setDisabled(_ => disabledStatus);
  }

  return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
            value={formData.quantity}
            onChange={e => updateFormData('quantity', +e.target.value)}
        >
          {Array.from({length: 20}, (_, i) => Number(i + 1))
              .map(num => <option value={num} key={num} label={String(num)}/>)}
        </select>
        <input
            type="text"
            placeholder="Item..."
            value={formData.value}
            onChange={(e) => updateFormData('value', e.target.value)}
        />
        <button disabled={disabled}>Add</button>
      </form>
  );
}
