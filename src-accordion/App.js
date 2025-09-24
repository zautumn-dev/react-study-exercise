import { useState } from "react";
import "./index.css";

const faqs = [
  {
    id: 1,
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    id: 2,
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    id: 3,
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [currentId, setCurrentId] = useState(undefined);

  function handleSetCurrentId(id) {
    setCurrentId((_) => (currentId !== id ? id : undefined));
  }
  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordionItem
          item={item}
          num={index + 1}
          key={index}
          onClick={handleSetCurrentId}
          isOpen={item.id === currentId}
        />
      ))}
    </div>
  );
}

function AccordionItem({ item, num, onClick, isOpen }) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen && "open"}`}
      onClick={() => onClick(item.id)}
    >
      <p className="number">{num < 10 ? `0${num}` : num}</p>
      <p className="title">{item.title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <p className="content-box">{item.text}</p>}
    </div>
  );
}
