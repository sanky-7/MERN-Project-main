
"use client"
import React, { useEffect, useState } from 'react';
import { AuthContextProvider } from '@/context/AuthContext';
import { UserOrders } from '@/components';

const SellerPage = ({params}) => {

  return (
    <AuthContextProvider>
      <UserOrders id={params["user-id"]}></UserOrders>
    </AuthContextProvider>
  );
};

export default SellerPage;