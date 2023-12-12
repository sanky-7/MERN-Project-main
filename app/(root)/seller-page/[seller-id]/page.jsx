"use client"
import React, { useEffect, useState } from 'react';
import { AuthContextProvider } from '@/context/AuthContext';
import { SellerProductPage } from '@/components'

const SellerPage = ({params}) => {
  const seller_id = params["seller-id"];

  return (
    <AuthContextProvider>
      <SellerProductPage id={seller_id}></SellerProductPage>
    </AuthContextProvider>
  );
};

export default SellerPage;