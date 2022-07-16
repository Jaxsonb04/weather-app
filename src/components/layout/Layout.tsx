import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div
      className='bg-cover bg-center [background-image:url("/images/bg-light.jpg")] dark:[background-image:url("/images/bg-dark.jpg")]
  '
    >
      {children}
    </div>
  );
}
