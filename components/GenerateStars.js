import React, { useEffect, useState } from 'react'
import Stars from './Stars';

function GenerateStars() {
    
    const [stars, setStars] = useState([])
    const generateStars = (numStars) => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
          const size = Math.random() * 10 + 1; // Random size for the star
          const duration = Math.random() * 5 + 2; // Random animation duration
          const style = {
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${Math.random() * 5}s`,
          };
          stars.push(<Stars key={i} style={style} />);
        }
        return stars;
      };
      useEffect(() => {
        setStars(generateStars(100));
      }, []);

      
  return (
    <div className='z-[-1]'>{stars}</div>
  )
}

export default GenerateStars