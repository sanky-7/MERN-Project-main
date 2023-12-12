"use client";
import "/app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { IoLogoGoogle } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  //sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("")

  const gProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const signInUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(auth)
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        router.replace("/");
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setMessage("Incorrect Email or Password");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, gProvider).then(() => {
        router.replace("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center overflow-hidden">
      {/* <ToastMessage /> */}
      <div className="flex items-center flex-col border-slate-900 border-[0px] rounded-[30px] p-10 sm:border-[3px]">
        <div className="text-center">
          <div className="text-4xl font-bold">Login to your Account</div>
        </div>
        <div className="gap-2 w-full mt-10 mb-5 flex justify-center">
          <div
            className="bg-gradient-to-r from-green-500 via-lime-300 to-yellow-400 w-[400px] sm:w-[330px] h-14 rounded-full cursor-pointer p-[2px]"
            onClick={signInWithGoogle}
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold w-full h-full rounded-full bg-slate-800 hover:bg-slate-700">
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-slate-400"></span>
          <span className="font-semibold text-gray-500">OR</span>
          <span className="w-5 h-[1px] bg-slate-400"></span>
        </div>
        <form
          className="flex flex-col items-center gap-3 w-[500px] mt-5"
          onSubmit={signInUser}
          method="POST"
        >
          <input
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="sm:w-full w-4/5 h-14 bg-slate-200 rounded-full outline-none border-none px-5 text-gray-900 placeholder:text-gray-900"
          />
          <input
            id="password"
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Password"
            className="sm:w-full w-4/5 h-14 bg-slate-200 rounded-full outline-none border-none px-5 text-gray-900 placeholder:text-gray-900"
            autoComplete="new-password"
          />
          {/*<div className="text-right w-full text-gray-800 cursor-pointer">
            <span
              className="cursor-pointer"
              // onClick={resetPassword}
            >
              Forget Password?
            </span>
          </div>*/}
          <button className="mt-4 sm:w-5/12 w-4/5 h-14 rounded-full outline-none text-base font-semibold bg-slate-800 text-white hover:bg-slate-700">
            <div className="flex justify-center items-center">
              <div>
                Login
              </div>
              {
                isLoading
                ?
                <svg aria-hidden="true" className="inline ms-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                :
                ""
              }
            </div>
          </button>
          <div className="text-red-600">{message}</div>
        </form>
        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet?</span>
          <Link
            href="/sign-up"
            className="font-semibold text-slate-900 underline underline-offset-2 cursor-pointer"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
