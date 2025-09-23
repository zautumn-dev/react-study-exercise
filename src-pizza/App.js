import { useState } from "react";
import Pizza from "./Pizza";
import Pizzas from "./data";

import "./index.css";

function Header() {
  return (
    <header className="header">
      <h1>Pizzas Header</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {Pizzas.length > 0 ? (
          Pizzas.map((pizza) => (
            <Pizza
              name={pizza.name}
              ingredients={pizza.ingredients}
              price={pizza.price}
              photoName={pizza.photoName}
              soldOut={pizza.soldOut}
              key={pizza.name}
            />
          ))
        ) : (
          <p>我们打烊下班了</p>
        )}
      </ul>
    </main>
  );
}

function Footer() {
  const [currentDate, setCurrentDate] = useState(new Date());

  setTimeout(setCurrentDate, 1000, new Date());

  const currentHour = currentDate.getHours();

  const openHour = 12;
  const closeHour = 22;

  const isOpen = currentHour > openHour && currentHour < closeHour;

  return (
    <footer className="footer">
      {/* {currentDate.toLocaleString()}{" "}
      {isOpen ? "当前是营业时间" : "本店已经打烊了"} */}
      {isOpen && (
        <div className="order">
          <p>
            now is {currentDate.toLocaleString()} we're open until until{" "}
            {closeHour}:00. come visit us or order
          </p>
          <button className="btn">Order</button>
        </div>
      )}
    </footer>
  );
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
