import './index.css';
import {useState} from 'react';

function App() {
  return (
      <TipCalculator/>
  );
}

export default App;

function TipCalculator() {

  const [billPrice, setBillPrice] = useState('');
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  function reset() {
    setBillPrice(_ => '');
    setPercentage1(_ => 0);
    setPercentage2(_ => 0);

  }

  return <div className="App">
    <BillInput bill={{
      billPrice, setBillPrice,
    }}></BillInput>
    <SelectPercentage percentage={{
      percentage: percentage1, setPercentage: setPercentage1,
    }}>
      你要给多少小费
    </SelectPercentage>
    <SelectPercentage percentage={{
      percentage: percentage2, setPercentage: setPercentage2,
    }}>
      你朋友要给多少小费
    </SelectPercentage>
    <Output bill={billPrice} percentage1={percentage1}
            percentage2={percentage2}/>
    <Reset reset={reset}/>
  </div>;
}

function BillInput({bill}) {

  return <div>
    <label>账单价格?</label>
    <input type="number" value={bill.billPrice}
           onChange={(e) => bill.setBillPrice(
               e.target.value ? e.target.value : '')}/>
  </div>;
}

function SelectPercentage({children, percentage, bill}) {

  return <div>
    <label>{children || '小费给多少?'}</label>
    <select value={percentage.percentage}
            onChange={(e) => percentage.setPercentage(_ => e.target.value)}>
      <option value="0">Dissatisfied (0%)</option>
      <option value="5">It was okay (5%)</option>
      <option value="10">It was good (10%)</option>
      <option value="20">Absolutely amazing! (20%)</option>

    </select>
  </div>;
}

function Output({bill, percentage1, percentage2}) {

  console.log(percentage1 + percentage2);

  if (bill === '') return null;

  const sumPercentage = bill * ((+percentage1 + +percentage2) / 100);
  const sumPrice = +bill + sumPercentage;

  return <h3>{`You pay ${sumPrice}(${sumPercentage} tip)`}</h3>;
}

function Reset({reset}) {
  return <button onClick={reset}>清空内容</button>;
}