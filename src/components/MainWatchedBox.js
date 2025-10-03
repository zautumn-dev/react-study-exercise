import React, {useState} from 'react';

function MainWatchedBox({children}) {

  const [isOpenWatchedBox, setIsOpenWatchedBox] = useState(true);

  return (
      <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpenWatchedBox((open) => !open)}
        >
          {isOpenWatchedBox ? '–' : '+'}
        </button>
        {isOpenWatchedBox && (
            <>
              {children}
            </>
        )}
      </div>
  );
}

export default MainWatchedBox;