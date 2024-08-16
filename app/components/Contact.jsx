"use client";
import React, { useEffect, useState } from "react";
import { HomeSkeleton } from "./loader";
import { getContactPage, updateContactpage } from "../libs/Powerhouse";
import toast from "react-hot-toast";

export default function ContactContainer() {
  //state
  const [loading, setLoading] = useState(true);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  const [header, setHeader] = useState("");
  const [address, setAddress] = useState("");
  const [phones, setPhones] = useState({
    phone1: "",
    phone2: "",
  });
  const [chat, setChat] = useState({
    mail: "",
    instagram: "",
    twitter: "",
  });

  // Handler to update the state when input values change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPhones((prevPhones) => ({
      ...prevPhones,
      [name]: value,
    }));
  };

  // Handler to update the state when input values change
  const handleChatChange = (event) => {
    const { name, value } = event.target;
    setChat((prevChat) => ({
      ...prevChat,
      [name]: value,
    }));
  };

  //useEffect
  const fetchContactpage = async () => {
    try {
      const res = await getContactPage();
      if (res) {
        //set first state
        setHeader(res?.header);
        //set second state
        setChat(res?.chatUs);
        //set third state
        setPhones(res?.callUs);
        //set address
        setAddress(res?.address);

        setLoading(false);
      } else {
        console.log(res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactpage();
  }, []);

  const handleUpdate = async () => {
    setOnSubmitLoading(true);
    try {
      const res = await updateContactpage(header, address, phones, chat);
      if (res.message === "Contact Page Content updated successfully") {
        toast.success("Content Updated");
        setOnSubmitLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured. Please try agian!");
      setOnSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pl-[300px] pt-12 pb-20 px-[3%]">
        <HomeSkeleton />
      </div>
    );
  }

  return (
    <main className="pl-[300px] pt-12 pb-20 px-[3%]">
      <div className="flex items-center justify-between sticky bg-white z-10 py-5 top-0">
        <h1 className="text-2xl font-clashmd">Contact</h1>
        <button
          onClick={handleUpdate}
          disabled={onSubmitLoading}
          className="bg-primary mr-5 rounded-full disabled:cursor-not-allowed text-base font-clashmd text-white w-[157px] h-[53px] flex items-center justify-center"
        >
          {onSubmitLoading ? (
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            "Update"
          )}
        </button>
      </div>
      {/**Header */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Header
          </div>
          {/**Form */}
          <div className="grid gap-3">
            <label className="text-sm font-clashmd">Header 1</label>
            <input
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
            />
          </div>
        </div>
      </section>
      {/**Call us */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[50%] translate-x-[-50%] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Call us
          </div>
          {/**Form */}
          <div className="grid gap-5">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Phone 1</label>
              <input
                type="text"
                name="phone1" // Use unique name to identify the input
                value={phones?.phone1}
                onChange={handleInputChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Phone 2</label>
              <input
                type="text"
                name="phone2" // Use unique name to identify the input
                value={phones?.phone2}
                onChange={handleInputChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
      {/**Chat with us*/}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[50%] translate-x-[-50%] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Chat with us
          </div>
          {/**Form */}
          <div className="grid gap-5">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Mail</label>
              <input
                type="text"
                name="mail"
                value={chat.mail}
                onChange={handleChatChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={chat.instagram}
                onChange={handleChatChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={chat.twitter}
                onChange={handleChatChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
      {/**Visit us*/}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[50%] translate-x-[-50%] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Visit us
          </div>
          {/**Form */}

          <div className="grid gap-3">
            <label className="text-sm font-clashmd">Office Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
