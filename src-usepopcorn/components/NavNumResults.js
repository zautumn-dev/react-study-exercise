import React from 'react';

function NavNumResults({movieLen}) {
  return (
      <p className="num-results">
        Found <strong>{movieLen}</strong> results
      </p>
  );
}

export default NavNumResults;