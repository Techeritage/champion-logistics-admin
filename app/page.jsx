"use client";
import Image from "next/image";
import React from "react";

export default function HomePage() {
  const numberToWords = ["One", "Two", "Three", "Four", "Five"];
  return (
    <main className="pl-[300px] py-20 px-[3%]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-clashmd">Homepage</h1>
        <button className="bg-primary mr-5 rounded-full text-base font-clashmd text-white w-[157px] h-[53px] flex items-center justify-center">
          Update
        </button>
      </div>
      {/**Hero */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Header
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Header 1</label>
              <input
                type="text"
                name="header1"
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="header1"
                className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[89px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Banner image</label>
              <div className="bg-[#f4f4f4]/50 relative rounded-[10px] h-[255px]">
                <button
                  onClick={() => document.getElementById("file-upload").click()}
                  className="w-[56px] absolute right-5 top-5 flex items-center justify-center  h-[56px] rounded-full bg-[#F0F2F5]"
                >
                  <input
                    type="file"
                    name=""
                    id="file-upload"
                    className="hidden"
                  />
                  <Image
                    src="upload.svg"
                    width={28}
                    height={28}
                    alt="upload icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**About */}
      <section className="w-full pl-7 mt-16">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[50%] translate-x-[-50%] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            About
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid grid-cols-[1.3fr,1fr] gap-5">
              <div className="grid gap-3">
                <label className="text-sm font-clashmd">Header 2</label>
                <input
                  type="text"
                  name="header1"
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-sm font-clashmd">Sub- Header 2</label>
                <input
                  type="text"
                  name="header1"
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="header1"
                className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[89px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-5 gap-5">
              {[0, 0, 0, 0, 0].map((_, index) => (
                <div className="grid gap-3" key={index}>
                  <label className="text-sm font-clashmd">
                    {" "}
                    {`Image ${numberToWords[index]}`}
                  </label>
                  <div className="bg-[#f4f4f4]/50 relative rounded-[16px] h-[166px]">
                    <button
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="w-[56px] absolute right-3 top-3 flex items-center justify-center  h-[56px] rounded-full bg-[#F0F2F5]"
                    >
                      <input
                        type="file"
                        name=""
                        id="file-upload"
                        className="hidden"
                      />
                      <Image
                        src="upload.svg"
                        width={28}
                        height={28}
                        alt="upload icon"
                      />
                    </button>
                  </div>
                  <div className="grid gap-3 mt-4">
                    <label className="text-sm font-clashmd">
                      {`Sub content ${numberToWords[index]}`}
                    </label>
                    <textarea
                      type="text"
                      name="header1"
                      className="bg-[#f4f4f4] text-sm resize-none rounded-[16px] min-h-[113px] p-2 py-3 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/**Services */}
      <section className="w-full pl-7 mt-16">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Services
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid grid-cols-[1.3fr,1fr] gap-5">
              <div className="grid gap-3">
                <label className="text-sm font-clashmd">Header 3</label>
                <input
                  type="text"
                  name="header1"
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-sm font-clashmd">Sub- Header 3</label>
                <input
                  type="text"
                  name="header1"
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="header1"
                className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[89px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[0, 0, 0].map((_, index) => (
                <div className="grid gap-3" key={index}>
                  <label className="text-sm font-clashmd">
                    {" "}
                    {`Image ${numberToWords[index]}`}
                  </label>
                  <div className="bg-[#f4f4f4]/50 relative rounded-[16px] h-[166px]">
                    <button
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="w-[56px] absolute right-3 top-3 flex items-center justify-center  h-[56px] rounded-full bg-[#F0F2F5]"
                    >
                      <input
                        type="file"
                        name=""
                        id="file-upload"
                        className="hidden"
                      />
                      <Image
                        src="upload.svg"
                        width={28}
                        height={28}
                        alt="upload icon"
                      />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <label className="text-sm font-clashmd">
                      Key Point One
                    </label>
                    <input
                      type="text"
                      name="header1"
                      className="bg-[#f4f4f4] text-sm rounded-[16px] h-[55px] p-5 focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-3">
                    <label className="text-sm font-clashmd">
                      Key Point Two
                    </label>
                    <input
                      type="text"
                      name="header1"
                      className="bg-[#f4f4f4] text-sm rounded-[16px] h-[55px] p-5 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/**FAQS */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            FAQs
          </div>
          {/**Form */}
          <div className="grid gap-7">
            {[0, 0, 0, 0].map((_, index) => (
              <div key={index} className="grid gap-4">
                <div className="grid gap-3">
                  <label className="text-sm font-clashmd">{`Content ${numberToWords[index]}`}</label>
                  <input
                    type="text"
                    name="header1"
                    className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                  />
                </div>
                <div className="grid gap-3">
                  <label className="text-sm font-clashmd">
                    {`Sub - Content ${numberToWords[index]}`}
                  </label>
                  <textarea
                    type="text"
                    name="header1"
                    className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[89px] p-5 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
