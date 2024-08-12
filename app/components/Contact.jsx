"use client";
import React, { useState } from "react";

export default function ContactContainer() {
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

  const handleUpdate = () => {
    console.log(header);
    console.log(chat);
    console.log(address);
    console.log(phones);
  };

  return (
    <main className="pl-[300px] pt-12 pb-20 px-[3%]">
      <div className="flex items-center justify-between sticky bg-white z-10 py-5 top-0">
        <h1 className="text-2xl font-clashmd">Contact</h1>
        <button
          onClick={handleUpdate}
          className="bg-primary mr-5 rounded-full text-base font-clashmd text-white w-[157px] h-[53px] flex items-center justify-center"
        >
          Update
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
                value={phones.phone1}
                onChange={handleInputChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Phone 2</label>
              <input
                type="text"
                name="phone2" // Use unique name to identify the input
                value={phones.phone2}
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
