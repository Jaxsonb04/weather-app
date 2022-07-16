import clsxm from 'clsx';
import React from 'react';

function WeatherMiniItem({ value, title, unit, ...stuff }) {
  let unitStyle = '';
  if (unit === '°') {
    unitStyle = 'pb-4';
  }
  return (
    <div className={stuff.className}>
      <p className='flex items-end text-center text-3xl font-thin'>
        {value}
        <div
          className={clsxm(
            'text-center text-sm font-thin uppercase',
            unitStyle
          )}
        >
          {unit}
        </div>
      </p>

      <h3 className='text-center text-sm font-thin uppercase'>{title}</h3>
    </div>
  );
}

export default WeatherMiniItem;
