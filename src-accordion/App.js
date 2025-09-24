import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
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
  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordionItem item={item} num={index + 1} key={index} />
      ))}
    </div>
  );
}

function AccordionItem({ item, num }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen && "open"}`}
      onClick={(_) => setIsOpen((open) => !open)}
    >
      <p className="number">{num < 10 ? `0${num}` : num}</p>
      <p className="title">{item.title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <p className="content-box">{item.text}</p>}
    </div>
  );
}
