"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BikeCard = ({bike_id , company, model, image, cost, color, seller }) => {
  const [ sellerName, setSellerName ] = useState("");

  const getSeller = async () => {
    const sellerRes = await fetch('https://bike-showroom-backend-l81h.onrender.com/getRoute/get-seller/' + seller);
    const sellerData = await sellerRes.json();
    setSellerName(sellerData.name);
  }

  useEffect (() => {
    getSeller();
  })


  return (
    <div className="bike-card rounded-lg shadow-md p-4 sm:p-6 md:p-8 bg-slate-300 w-96 m-5">
      <Image
        src={image}
        alt={model}
        width={100}
        height={100}
        className="rounded-lg mb-4 sm:w-full md:w-2/3"
      />
      <h3 className="text-2xl font-bold mb-2 sm:text-3xl md:text-3xl">
        {company + " " + model}
      </h3>
  
      <p className="text-gray-500">Seller Name: {sellerName}</p>
      <p className="text-gray-500">Color: {color}</p>
      <p className="mt-4 block"><span className="align-top">₹</span> <span className="sm:text-3xl md:text-4xl text-2xl font-semibold">{cost}</span></p>
      <Link href={"/product/" + bike_id}><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none mt-2 w-full">Product</button></Link>
    </div>
  );
};

export default BikeCard;
