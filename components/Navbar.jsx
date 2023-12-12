"use client"
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { AuthContextProvider } from "@/context/AuthContext";
import NavItems from "./NavItems"

const Navbar = () => {
  return (
    <AuthContextProvider>
      <NavItems />
    </AuthContextProvider>
  );
};

export default Navbar;
