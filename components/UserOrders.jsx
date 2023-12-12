"use client"
import React, { useEffect, useState } from 'react';
import ProdTable from './ProdTable';
import { UserAuth } from '@/context/AuthContext';

const UserOrders = ({id}) => {
  const {userID, isSigned} = UserAuth();
  const [customerAddress, setCustomerAddress] = useState('');
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    setIsLoading(true);
    const orderData = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-order-by-customer/" + id);
    const userOrder = await orderData.json();
    setIsLoading(false);
    setOrders(userOrder);
  }

  useEffect(() => {
    if (isSigned)
      getOrders();
  }, [isSigned])



  return (
    <main className="overflow-hidden">
      <div className="mt-28 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Orders</h1>
        </div>
      </div>
      <div>
        {
          isLoading && (!isSigned) && (id != userID)
          ?
          <div className='py-48'></div>
          :
          (orders.length == 0)
          ?
          <center>
            <h1 className='text-4xl font-extrabold mt-28 py-48 text-black-100'>No Orders Yet</h1>
          </center>
          :
          <div>
            {
              orders.map((order, id) => {
                return <ProdTable key={id} items={order.products} date={order.order_date} address={order.address}></ProdTable>
              })
            }
          </div>
        }
      </div>
    </main>
  );
};

export default UserOrders;