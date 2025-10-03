import React, {useState} from 'react';

function MainListBox({children}) {

  const [isOpenListBox, setIsOpenListBox] = useState(true);

  return (
      <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpenListBox((open) => !open)}
        >
          {isOpenListBox ? '–' : '+'}
        </button>
        {isOpenListBox && children}
      </div>
  );
}

export default MainListBox;