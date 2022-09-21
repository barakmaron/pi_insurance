import React from 'react'

const Button = ({
    text,
    onClick, 
    className
}) => {
  return (
    <button 
    onClick={onClick}
    className={`${className} mx-auto font-bold py-2 px-4 rounded hover:text-white hover:bg-blue-500 hover:border-white border-2 border-black text-blue-500 bg-white`}>
        {text}
    </button>
  )
}

export default Button
