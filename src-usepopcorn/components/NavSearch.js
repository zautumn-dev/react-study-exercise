import React, {useEffect, useRef} from 'react';

function NavSearch({query, setQuery}) {
  const inputEl = useRef(null);

  function handleKeyEnter(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {

    function callback(e) {
      // document.activeElement
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/activeElement
      if (document.activeElement === inputEl.current) return;
      if (e.code !== 'Enter') return;
      inputEl.current.focus();
      //   同时清理已经输入的值
      setQuery('');
    }

    document.addEventListener('keydown', callback);

    // 加载页面就让他聚焦
    callback({code: 'Enter'});

    return () => document.removeEventListener('keydown', callback);
  }, [setQuery]);

  return (
      <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleKeyEnter}
          ref={inputEl}
      />
  );
}

export default NavSearch;