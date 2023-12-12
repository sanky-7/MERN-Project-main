"use client"
import { UserAuth } from "@/context/AuthContext"
import { auth } from "@/app/firebase";
import { updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";

const UserAccount = ({ id }) => {
  const {userID ,isSeller ,isSigned, isLoading} = UserAuth();
  const [isFetched, setIsFetched] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [changePhone, setChangePhone] = useState(false);
  const [isNoUpdate, setIsNoUpdate] = useState(true);
  const [updateURL, setUpdateURL] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const getUserInfo = async () => {
    let url = "";
    if (isSeller)
      url = "https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-seller/" + id;
    else 
      url = "https://bike-showroom-backend-l81h.onrender.com/updateRoute/update-customer/" + id;

    setUpdateURL(url);

    fetch(url)
    .then(async (res) => {
      const resJson = await res.json();
      setUser(resJson);
      setName(resJson.name);
      setEmail(resJson.email);
      setPhone(resJson.phone);
    })
    .catch((error) => {
      console.log(error);
    });

    setIsFetched(true);
  }

  const updateUserInfo = async () => {
    setUpdateLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name }).then(async () => {
        const data = {"name":name, "email":email, "phone":phone};
        await fetch(updateURL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        setUpdateLoading(false);
        window.location.reload();
      });
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSigned) {
      console.log(isSigned);
      getUserInfo();
    }
  }, [isSigned, isSeller])
  
  const validPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  }

  const validName = (name) => {
    return (name.length!=0);
  }

  useEffect(() => {
    if(validName(name) && validPhone(phone) && !(changeName||changePhone)) {
      setIsNoUpdate(false);
    }
    else {
      setIsNoUpdate(true);
    }
  }, [name, phone, changeName, changePhone])

  return (
    <main className="overflow-hidden text-black-100">
      { 
        (isSigned&&isFetched)
        ?
        (id==userID) 
        ?
        <div>
          <div className="mt-28 padding-x padding-y max-width">
            <h1 className="text-4xl font-extrabold text-center">User Account</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="self-center mb-4">
              <p>Name:</p>
              {
                changeName
                ?
                <div>
                  <input className="text-2xl px-5 h-14 w-96 rounded-full" onChange={(event) => {setName(event.target.value)}} defaultValue={name} />
                  <div className="flex flex-row">
                    {console.log(validName(name))}
                    <p className={`text-red-600 ${validName(name)?"hidden":""}`}>Invalid Name</p>
                    <button className="ms-auto text-primary-blue" onClick={() => {setChangeName(false)}}>Set</button>
                  </div>
                </div>
                :
                <div>
                  <div className="text-2xl px-5 h-14 rounded-full w-96 pt-3">{name}</div>
                  <div className="flex flex-row">
                    <p className={`text-red-600 ${validName(name)?"hidden":""}`}>Invalid Name</p>
                    <button className="ms-auto text-primary-blue" onClick={() => {setChangeName(true)}}>Edit</button>
                  </div>
                </div>
              }
            </div>
            <div className="self-center mb-4 rounded-full">
              <p>Email:</p>
              <div>
                <div className="text-2xl px-5 h-14 rounded-full w-96 pt-3">{email}</div>
              </div>
            </div>
            <div className="self-center mb-4">
              <p>Phone Number:</p>
              {
                changePhone
                ?
                <div>
                  <input className="text-2xl px-5 h-14 w-96 rounded-full" onChange={(event) => {setPhone(event.target.value)}} defaultValue={phone} />
                  <div className="flex flex-row">
                    <p className={`text-red-600 ${validPhone(phone)?"hidden":""}`}>Invalid Phone number</p>
                    <button className="ms-auto text-primary-blue" onClick={() => {setChangePhone(false)}}>Set</button>
                  </div>
                </div>
                :
                <div>
                  <div className="text-2xl px-5 h-14 rounded-full w-96 pt-3">{phone}</div>
                  <div className="flex flex-row">
                    <p className={`text-red-600 ${validPhone(phone)?"hidden":""}`}>Invalid Phone number</p>
                    <button className="text-primary-blue ms-auto" onClick={() => {setChangePhone(true)}}>Edit</button>
                  </div>
                </div>
              }
            </div>
            <div className="flex flex-row justify-center my-4">
              <button className={`${isNoUpdate||(user.name==name && user.phone==phone) ? "bg-slate-600":"bg-slate-800 hover:bg-slate-700"} h-14 w-48 text-white font-bold py-2 px-4 rounded-full w-28 me-2`} onClick={updateUserInfo} disabled={isNoUpdate||(user.name==name && user.phone==phone)}>
                Update
                {
                  updateLoading
                  ?
                  <svg aria-hidden="true" className="inline ms-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  :
                  ""
                }
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 h-14 w-48 text-white font-bold py-2 px-4 rounded-full w-28 ms-2" onClick={() => {setName(user.name); setEmail(user.email); setPhone(user.phone)}}>
                Reset
              </button>
            </div>
          </div>
        </div>
        :
        <div>
          <div className="mt-28 py-48 max-width">
            <h1 className={`text-4xl font-extrabold text-center ${((userID=="")||(userID==id))? "hidden" : ""}`}>Invalid Link</h1>
          </div>
        </div>
        :
        <div>
          <div className="mt-28 py-48 max-width">
            <h1 className={`text-4xl font-extrabold text-center ${isLoading||isSigned ? "hidden" : ""}`}>User Is Signed Out</h1>
          </div>
        </div>
      }
    </main>
  )
}

export default UserAccount;