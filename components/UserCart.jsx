"use client"
import React, { useEffect, useState } from 'react';
import { UserAuth } from '@/context/AuthContext';
import Link from 'next/link';

const UserCart = ({id}) => {
  const {userID, isSigned, phone} = UserAuth();
  const [customerAddress, setCustomerAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderID, setOrderID] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const getCartProducts = async () => {
    setIsLoading(true);
    const cartData = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-cart-by-customer/" + id);
    const userCart = await cartData.json();
    setIsLoading(false);
    if (userCart.length != 0) {
      setCartItems(userCart[0]["products"]);
      setOrderID(userCart[0]["_id"]);
    }
  }

  useEffect(() => {
    if (isSigned)
      getCartProducts();
  }, [isSigned])


  const removeFromCart = async (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    await fetch("https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-order/" + orderID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"total_amount": getTotalAmount(updatedCart), "products": updatedCart})
    }).then(() => {
      setCartItems(updatedCart);
    });
  };

  const getTotalAmount = (items) => {
    let total = 0;
    items.map((item) => {
      if(item.newColor)
        total=total + item.quantity*(item.price+1000)
      else
        total=total + item.quantity*(item.price)
    })
    return total;
  };

  const formatPriceInRupees = (price) => {
    return `₹${price}`;
  };

  const checkout = async () => {
    let mod = true;
    let products = [];
    let index = 0

    for (let i=0; i<cartItems.length; i++) {
      let prodRes = await fetch("https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-product/" + cartItems[i].product_id);
      let prodDetails = await prodRes.json();
      if (prodDetails) {
        console.log(prodDetails);
        if (prodDetails.stock_quantity < cartItems[i].quantity) {
          mod = false;
          index = i;
          break;
        }
        products.push(prodDetails);
      }
      else {
        mod = false;
        index = i;
      }
    }
    if (mod) {
      for (let i=0; i<cartItems.length; i++) {
        await fetch("https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-product/" + cartItems[i].product_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"stock_quantity": products[i].stock_quantity - cartItems[i].quantity})
        })
      }
      await fetch("https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-order/" + orderID, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({order_date:new Date(), "address":customerAddress, "total_amount": getTotalAmount(cartItems), isCart: false})
      })
      alert(`Thank you! Your order will be shipped to ${customerAddress}. Total amount: ${formatPriceInRupees(getTotalAmount(cartItems))}`);
      window.location.reload();
    }
    else {
      alert(`Item number ${index + 1} does not have any stocks remaining`);
    }
  };

  return (
    <main className="overflow-hidden">
      <div className="mt-28 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>In Cart</h1>
        </div>

        {
          isLoading && (!isSigned) && (id != userID)
          ?
          <div className='py-48'></div>
          :
          (cartItems.length == 0)
          ?
          <center>
            <h1 className='text-4xl font-extrabold mt-28 py-48 text-black-100'>Cart Is Empty</h1>
          </center>
          :
          <div>
            <div className="flex flex-col mt-16 w-9/12 mx-auto">
              <label htmlFor="customerAddress" className='mb-2 text-sm'>Provide Address:</label>
              <textarea
                id="customerAddress"
                name="customerAddress"
                className='block p-2.5 w-full rounded-lg border border-gray-300 self-center'
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                required
              ></textarea>
            </div>

            <center>
              <table className='my-8 border-collapse text-center w-full'>
                <thead>
                  <tr className='border-solid border-y border-slate-400'>
                    <th className='md:w-1/2 py-3'>Product Details</th>
                    <th className='py-3'>Total Price (INR)</th>
                    <th className='py-3'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className='border-solid border-b border-slate-400'>
                      <td>
                        <div className='m-4 flex lg:flex-row flex-col'>
                          <img
                            className='rounded-lg w-[280px]'
                            src={item.image}
                            alt={`Bike ${item.model}`}
                          />
                          <div className='mt-4 lg:mt-2 text-start text-md sm:text-xl ms-4'>
                            <p>
                              <span className='font-bold'>Company: </span>{item.company}
                            </p>
                            <p>
                             <span className='font-bold'>Model: </span>{item.model}
                            </p>
                            <p>
                             <span className='font-bold'>Quantity: </span>{item.quantity}
                            </p>
                            {
                              item.newColor
                              ?
                              <p>
                               <span className='font-bold'>Custom Color: </span>{item.newColor}
                              </p>
                              :
                              ""
                            }
                            <Link href={"/product/" + item.product_id}><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none mt-2 w-full">Product</button></Link>
                          </div>
                        </div>
                      </td>
                      <td className='border-none'>{formatPriceInRupees(item.quantity * (item.price + (item.newColor==""?0:1000)))}</td>
                      <td className='border-none'>
                        <button className="h-10 mx-5 px-5 rounded-full outline-none text-base font-semibold bg-slate-800 text-white hover:bg-slate-700" onClick={() => removeFromCart(index)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total" style={{ marginBottom: '35px' }}>Total: {formatPriceInRupees(getTotalAmount(cartItems))}</div>
              <button disabled={phone.length==0||customerAddress==""} className={`h-10 mx-5 px-5 rounded-full outline-none text-base font-semibold text-white ${customerAddress==""||phone.length==0 ? "bg-slate-500" : "bg-slate-800 hover:bg-slate-700" }`} onClick={checkout}>Proceed to Checkout</button>
              {
                phone.length==0
                ?
                <div className='text-red-600'>Given Phone Number is Invalid</div>
                :
                ""
              }
            </center>

          </div>
        }
      </div>
    </main>
  );
};

export default UserCart;
