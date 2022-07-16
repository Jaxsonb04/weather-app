import React from 'react';

import clsxm from '@/lib/clsxm';

function WeatherCard({
  children,
  ...stuff // properties
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsxm(
        'w-full border border-slate-50/50 bg-slate-50/40 p-4 dark:border-gray-50/5 dark:bg-gray-50/10 dark:text-white sm:p-6 md:p-8',
        stuff.className
      )}
    >
      {children}
    </div>
  );
}

export default WeatherCard;
