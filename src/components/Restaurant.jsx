import React from 'react';
import Link from 'next/link';

const Restaurant = ({ restaurant }) => {
    const setRestaurant = (restaurantMail) => {
        localStorage.setItem('restaurantMail', restaurantMail);
    }
    return (
        <Link onClick={() => setRestaurant(restaurant.mail)} href={`/${restaurant.id}`} className='flex flex-col mb-4 bg-white text-black p-4 rounded-xl'>
            <h1>{restaurant.name}</h1>
        </Link>
    );
};

export default Restaurant;