"use client"
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useState } from "react";

const NavItems = () => {
  const { user, signOutFromAccount, isLoading, userID, isSeller } = UserAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="w-full absolute z-10">
      { 
        isLoading
        ?
        ""
        :
        user
        ?
        <nav className="max-w-[1440px] mx-auto flex items-center sm:px-16 px-6 py-4">
          <Link href="/" className="flex justify-center items-center me-auto">
            <Image
              src="/logo.svg"
              alt="Car Hub Logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>
          <div className="relative inline-block text-left">
            <div>
              <CustomButton
               title={user.displayName}
               btnType="button"
               containerStyles="text-primary-blue rounded-full bg-white min-w-[227px]"
               handleClick={() => {setShowMenu(!showMenu)}}
              />
            </div>
            <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showMenu ? "" : "hidden"}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                {
                  isLoading
                  ?
                  ""
                  :
                  isSeller
                  ?
                  <div className="py-1" role="none">
                    <Link href={"/account/" + userID} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-0">Account</Link>
                    <Link href={"/seller-page/" + userID} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-1">Selling</Link>
                    <button onClick={signOutFromAccount} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white w-full text-start" role="menu-item-2" tabIndex="-1" id="menu-item-3">Sign Out</button>
                  </div>
                  :
                  <div className="py-1" role="none">
                    <Link href={"/account/" + userID} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-0">Account</Link>
                    <Link href={"/user-cart/" + userID} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-1">Cart</Link>
                    <Link href={"/user-orders/" + userID} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-2">Orders</Link>
                    <button onClick={signOutFromAccount} className="text-primary-blue block px-4 py-3 text-sm hover:bg-primary-blue hover:text-white w-full text-start" role="menu-item-3" tabIndex="-1" id="menu-item-3">Sign Out</button>
                  </div>
                }
            </div>
          </div>
        </nav>
        :
        <nav className="max-w-[1440px] mx-auto flex items-center sm:px-16 px-6 py-4">
          <Link href="/" className="flex justify-center items-center me-auto">
            <Image
              src="/logo.svg"
              alt="Car Hub Logo"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>
          <Link href="/sign-up">
            <CustomButton
              title="Sign Up"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] me-5"
            />
          </Link>
          <Link href="/sign-in">
            <CustomButton
              title="Sign In"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
          </Link>
        </nav>
      }
    </header>
  )
}

export default NavItems;