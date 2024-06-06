import React from 'react';

const Stars = ({ style }) => {
  return <div className="star absolute rounded-full bg-purple-400 animate-twinkle" style={style} data-testid="star"></div>;
};

export default Stars;