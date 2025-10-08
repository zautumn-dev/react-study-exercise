import {memo} from 'react';

const ToggleSounds = memo(function({allowSound, setAllowSound}) {
  return (
      <button
          className="btn-sound"
          onClick={() => setAllowSound((allow) => !allow)}
      >
        {allowSound ? '🔈' : '🔇'}
      </button>
  );
});

export default ToggleSounds;
