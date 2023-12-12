"use client"
import React, { useState, useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';

const ProductPage = ({prod_id}) => {
  const {userID, isSigned, isSeller} = UserAuth();
  const [product, setProduct] = useState({});
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [newColor, setNewColor] = useState("");

  const getProduct = async () => {
    const prodRes = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-product/" + prod_id);
    let prodData = await prodRes.json();
    const sellerRes = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-seller/" + prodData.seller_id);
    const sellerData = await sellerRes.json();
    prodData["seller"] = sellerData.name;
    setProduct(prodData);
    setIsLoading(false);
  }

  const handleAddToCart = async () => {
    const cartRes = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-cart-by-customer/" + userID);
    let cartDetails = await cartRes.json();
    let cartItems = [];
    let mod = false;
    let quantityInCart = 0;
    if (cartDetails.length != 0) {
      cartItems = cartDetails[0]["products"];
      cartItems.map((item, index) => {
        if (item.product_id == prod_id  && item.newColor == newColor) {
          cartItems[index]["quantity"] += Number(quantity);
          mod = true;
        }
        if (item.product_id == product._id) {
          quantityInCart+=item.quantity;
        }
      })

      if (!mod)
        cartItems.push({
        "product_id": prod_id,
        "seller_id": product.seller_id,
        "company": product.company,
        "model": product.model,
        "price": product.price,
        "quantity": Number(quantity),
        "image": product.image,
        "color": product.color,
        "newColor": newColor
        });


      if (quantityInCart<=product.stock_quantity) {
        await fetch("https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-order/" + cartDetails[0]._id , {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"products": cartItems, "total_amount": cartDetails[0].total_amount +  Number(quantity)*(Number(product.price) + Number(price))})
        });
        alert(`Added ${product.company}  ${product.model} to your cart.`);
      }
      else {
        alert("Quantity is more than the stock.");
      }
    }
    else {
      cartItems.push({
      "product_id": prod_id,
      "seller_id": product.seller_id,
      "company": product.company,
      "model": product.model,
      "price": product.price,
      "quantity": Number(quantity),
      "image": product.image,
      "color": product.color,
      "newColor": newColor
      });
      let cart = { 
      "customer_id":userID,
      "order_date":new Date(),
      "total_amount":Number(quantity)*(Number(product.price) + Number(price)),
      "address":"",
      "products":cartItems,
      "isCart":true
      }

      await fetch("https://bike-showroom-backend-l81h.onrender.com/createRoute/create-order/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(cart)
      });

      alert(`Added ${product.company}  ${product.model} to your cart.`);
    }
  };

  useEffect(() => {
    getProduct();
  }, [])
  

  return (
    <main className="overflow-hidden">
      <div className='mt-28 padding-x padding-y max-width'>
        {
          isLoading
          ?
          <div className='py-48'></div>
          :
          <div>
            <div className="home__text-container">
              <h1 className='text-4xl font-extrabold'>{product.company + " " + product.model}</h1>
            </div>
            <div className='flex lg:flex-row flex-col justify-center mt-8' key={product.id}>
              <img className='rounded-lg lg:h-[400px] w-auto' src={product.image} alt={product.name}/>
              <div className='md:ms-16 md:mt-2 mt-16'>
                <p className='mb-8 text-center'>₹<span className='text-3xl font-extrabold'>{product.price * quantity}</span><span className='text-2xl text-gray-400'> + {price * quantity}</span></p>
                <p><span className='font-extrabold'>Company: </span>{product.company}</p>
                <p><span className='font-extrabold'>Model: </span>{product.model}</p>
                <p><span className='font-extrabold'>Color: </span>{product.color}</p>
                <p><span className='font-extrabold'>Seller: </span>{product.seller}</p>
                <label className="block mb-2 font-extrabold">Customize Color : </label>
                <select className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(event) => {if(event.target.value == "None"){setPrice(0); setNewColor("");}else{setPrice(1000); setNewColor(event.target.value);}}}>
                  <option value="None">None</option>
                  <option value="Red">Red</option>
                  <option value="Black">Black</option>
                  <option value="Blue">Blue</option>
                  <option value="White">White</option>
                  <option value="Grey">Grey</option>
                  <option value="Pink">Pink</option>
                </select>
                <label className="block mb-2 font-extrabold">Choose quantity:</label>
                <input type='number' className="text-center focus:ring-blue-500 focus:border-blue-500 block w-full py-2 rounded-md" defaultValue={1} onChange={(event) => {setQuantity(event.target.value)}}/>
                <p className='mt-2'><span className='font-extrabold'>Remaining: </span>{product.stock_quantity}</p>
                {
                  isSigned && !isSeller
                  ?
                  <button disabled={product.stock_quantity==0 || quantity>product.stock_quantity || quantity<=0 } className={`text-white ${product.stock_quantity==0 || quantity>product.stock_quantity || quantity<=0 ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-800"}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full`} onClick={() => handleAddToCart()}>Add to Cart</button>
                  :
                  ""
                }
              </div>
            </div>
          </div>
        }
      </div>
    </main>
  );
};

export default ProductPage;