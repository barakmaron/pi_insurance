import React from 'react'

const View = ({
    successful,
    failed,
    message
}) => {
  return (
    <div>
        { successful && <div className='bg-green-300 border-2 py-2 px-4 border-green-500 my-2 rounded-2xl text-black'>{message}</div> }
        { failed && <div className='bg-rose-300 border-2 py-2 px-4 border-rose-500 my-2 rounded-2xl text-black'>{message}</div> }
    </div>
  );
};

export default View;
