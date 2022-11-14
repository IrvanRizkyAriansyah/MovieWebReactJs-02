import React from 'react'
import Teater from '../assets/teater.jpg'

export default function Header(props) {
	return (
		<div style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(17, 24, 39, 1)), url(${Teater})`,
            backgroundSize: 'cover'
        }} className='relative mt-16 p-6 h-1/2'>
        <h1 className='text-3xl text-white font-bold'>{props.query}</h1>
		</div>
	)
}