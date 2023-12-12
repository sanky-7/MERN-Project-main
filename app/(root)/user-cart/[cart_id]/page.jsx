"use client"
import React, { useEffect, useState } from 'react';
import { UserCart } from '@/components';
import { AuthContextProvider } from '@/context/AuthContext';

const CartPage = ({params}) => {

  return (
    <AuthContextProvider>
      <UserCart id={params.cart_id}></UserCart>
    </AuthContextProvider>
  );
};

export default CartPage;