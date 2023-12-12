"use client"
import { AuthContextProvider } from '@/context/AuthContext';
import { ProductPage } from '@/components';
import React, { useState, useEffect } from 'react';

const Product = ({params}) => {
  const prod_id = params["product-id"];

  return (
    <AuthContextProvider>
      <ProductPage prod_id={params["product-id"]}></ProductPage>
    </AuthContextProvider>
  );
};

export default Product;