import './index.css';
import Header from './components/Header';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

function App() {
  return <div className="app">
    <Header></Header>
    <Form/>
    <PackingList/>
    <Stats/>
  </div>;
}

export default App;