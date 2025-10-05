import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import StarRating from './components/StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <App/>
      {/*<StarRating option={{size: 24}} defaultRating={5}/>*/}
    </React.StrictMode>,
);
