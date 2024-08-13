import React from 'react';

const shimmer = 'shimmer-animation';

export function HomeSkeleton() {
  return (
    <main className='pt-5 lg:pt-0'>
      <div className='shimmer-animation px-[3%] mt-5 h-12 w-full rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation px-[3%] mt-5 h-[300px] rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation mt-5 h-[150px] rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation mt-5 h-[300px] rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation mt-5 h-[300px] rounded-2xl bg-gray-200'></div>

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {[0, 1, 2, 3].map((_, index) => (
          <div
            key={index}
            className='shimmer-animation h-[400px] rounded-2xl bg-gray-200'
          ></div>
        ))}
      </div>
      <div className='shimmer-animation mx-[3%] mt-5 h-[200px] rounded-2xl bg-gray-200'></div>
    </main>
  );
}
