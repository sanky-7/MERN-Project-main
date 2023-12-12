import React from 'react'
import Link from 'next/link';

function ProdTable({items, date, address}) {
  const getTotalAmount = () => {
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

  const getDate = () => {
    const dateObj = new Date(date);
    if (dateObj.getMinutes() < 10)
      return String(dateObj.getDate()) + "-" + String(dateObj.getMonth() + 1) + "-" + String(dateObj.getFullYear()) + "\n" + String(dateObj.getHours()) + ":" + "0" + String(dateObj.getMinutes());
    else
      return String(dateObj.getDate()) + "-" + String(dateObj.getMonth() + 1) + "-" + String(dateObj.getFullYear()) + "\n" + String(dateObj.getHours()) + ":" + String(dateObj.getMinutes());
  }

  const isDelivered = () => {
    const dateObj = new Date(date);
    const currDate = new Date();
    const dayDiff = (currDate.getTime() - dateObj.getTime())/(1000 * 3600 * 24);
    console.log(date);
    if (dayDiff >= 5)
      return true;
    return false;
  }

  return (
    <center className='mt-4 mb-24'>
      <div className="flex justify-center items-center gap-1">
        <span className="w-1/2 h-[2px] bg-slate-400"></span>
        <span className="font-semibold text-gray-500">{getDate()}</span>
        <span className="w-1/2 h-[2px] bg-slate-400"></span>
      </div>
      <table className='my-8 border-collapse text-center w-10/12'>
        <thead>
          <tr className='border-solid border-y border-slate-400'>
            <th className='md:w-1/2 py-3'>Product Details</th>
            <th className='py-3'>Total Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
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
                    <Link href={"/product/" + item.product_id}><button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none mt-2 w-full">Product</button></Link>
                  </div>
                </div>
              </td>
              <td className='border-none'>{formatPriceInRupees(item.quantity * (item.price + (item.newColor==""?0:1000)))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-2/5'>
         <span className='font-bold'>Address: </span>{address}
      </div>
      <div className="total"><span className='font-bold'>Total: </span>{formatPriceInRupees(getTotalAmount())}</div>
      <p className={`${isDelivered() ? "text-green-500" : "text-red-500" } font-bold`}>{isDelivered() ? "Delivered":"Not Delivered"}</p>

    </center>
  )
}

export default ProdTable;