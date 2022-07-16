import React from 'react';

function WeatherItem({ title, value, unit }) {
  return (
    <div className='font-thin uppercase'>
      <div className='flex flex-col justify-center text-center'>
        <span className='font-thin uppercase tracking-widest '>{title}</span>
        <h3 className='text-4xl font-thin'>{value}</h3>
        <p className='text-sm font-thin'>{unit}</p>
      </div>
    </div>
  );
}

export default WeatherItem;
