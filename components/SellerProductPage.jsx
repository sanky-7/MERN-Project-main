"use client"
import { UserAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';

const SellerProductPage = ({id}) => {
  const {userID, phone, isSigned} = UserAuth();
  const [bikes, setBikes] = useState([]);

  const getProducts = async () => {
    const prodRes = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-product-from-seller/" + id);
    const prodJson = await prodRes.json();
    setBikes(prodJson);
  }

  useEffect (() => {
    getProducts();
  }, [])

  const handleRemoveBike = async (bikeId) => {
    await fetch("https://bike-showroom-backend-l81h.onrender.com/deleteRoute/delete-product/" + bikeId, { method: 'DELETE'});
    setBikes(bikes.filter((bike) => bikeId !== bike._id));
  };

  const handleAddBike = async (newBike) => {
    await fetch("https://bike-showroom-backend-l81h.onrender.com/createRoute/create-product/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(newBike)
    });
    setBikes([...bikes, newBike]);
  };

  return (
    <main className='overflow-hidden'>
      {
        !isSigned || userID!=id
        ?
        <div className="py-48"></div>
        :
        <div className="mt-28 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className='text-4xl font-extrabold'>Featured Bikes</h1>
          </div>
          

          <div className="mt-16">
            {bikes.map((bike, index) => (
              <div key={index}>
                <h2 className='text-3xl font-bold mb-4'>{bike.company + " " + bike.model}</h2>
                <div className="flex flex-col lg:flex-row mb-16 md:mx-16 justify-center" key={bike.id}>
                  <img className='rounded-lg lg:w-[500px]' src={bike.image} alt={bike.company + " " + bike.model} />
                  <div className="lg:ms-16 sm:mt-2 mt-16 lg:w-2/5">
                    <p>₹<span className='text-2xl font-bold'>{bike.price}</span></p>
                    <p><span className='font-bold'>Color: </span>{bike.color}</p>
                    <p><span className='font-bold'>Company: </span>{bike.company}</p>
                    <p><span className='font-bold'>Model: </span>{bike.model}</p>
                    <p><span className='font-bold'>Quantity Remaining: </span>{bike.stock_quantity}</p>
                    <p><span className='font-bold'>Seller: </span>{bike.seller}</p>
                    <button className='w-full mt-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none' onClick={() => handleRemoveBike(bike._id)}>Remove Bike</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className='text-4xl font-extrabold text-black-100 mb-8'>Add New Bike</h2>

          <form className='flex flex-col lg:w-2/5' onSubmit={(event) => {
            event.preventDefault();

            const newBike = {
              price: Number(event.target.price.value),
              stock_quantity: Number(event.target.quantity.value),
              color: event.target.color.value,
              image: event.target.image.value,
              company: event.target.company.value,
              model: event.target.model.value,
              seller_id: id,
            };

            handleAddBike(newBike);

            event.target.price.value = '';
            event.target.quantity.value = '';
            event.target.color.value = '';
            event.target.image.value = '';
            event.target.company.value = '';
            event.target.model.value = '';

          }}>
            <label className='font-bold'>Price:</label>
            <input className='mb-4 py-2 rounded-lg px-2' type="number" name="price" required />

            <label className='font-bold'>Quantity:</label>
            <input className='mb-4 py-2 rounded-lg px-2' type="number" name="quantity" required />

            <label className='font-bold'>Color:</label>
            <input className='mb-4 py-2 rounded-lg px-2' type="text" name="color" required />

            <label className='font-bold'>Image URL:</label>
            <input className='mb-4 py-2 rounded-lg px-2' type="url" name="image" required />

            <label className='font-bold'>Company:</label>
            <input className='mb-4 py-2 rounded-lg px-2' type="text" name="company" required />

            <label className='font-bold'>Model:</label>
            <input className='mb-4 py-2 rounded-lg px-2' type="text" name="model" required />
            {
              phone
              ?
              <button className='w-full mt-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none' type="submit">Add Bike</button>
              :
              <div className='text-red-600'>Use a valid phone number to be able to sell</div>
            }
          </form>
        </div>
      }
    </main>
  );
};

export default SellerProductPage;