import {useEffect} from 'react';

export function useKeyDownEvent(keyCode, keyDownCallback = () => {}) {

  useEffect(function() {

    document.addEventListener(keyCode, keyDownCallback);

    return () => document.removeEventListener(keyCode, keyDownCallback);

  }, [keyCode, keyDownCallback]);
}