import React, {useState} from 'react';

function MainBox({children}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
      <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? '–' : '+'}
        </button>

        {isOpen && children}
      </div>
  );
}

export default MainBox;