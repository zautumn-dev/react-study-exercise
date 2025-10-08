import {Children, useState} from 'react';
import MainListBox from './MainListBox';
import MainWatchedBox from './MainWatchedBox';

export default function Main({children}) {

  return (
      <main className="main">

        {children}

      </main>
  );
}
