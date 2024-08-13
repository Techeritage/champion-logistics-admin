"use client";
import Image from "next/image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { useState } from "react";

const storage = getStorage(app);

export default function ServiceContainer() {
  //state
  const [sections, setSections] = useState([
    {
      id: 1,
      image: null, // Initially null or can hold a file object or URL
      description: "", // This will hold the description text
    },
    // Add more sections as needed
  ]);

  //handle about upload
  const handleDescriptionChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index].description = value;
    setSections(updatedSections);
  };

  return (
    <div className="pl-[300px] pt-12 pb-20 px-[3%]">
      <div className="flex items-center justify-between sticky bg-white z-10 py-5 top-0">
        <h1 className="text-2xl font-clashmd">Services</h1>
        <button className="bg-primary mr-5 rounded-full text-base font-clashmd text-white w-[157px] h-[53px] flex items-center justify-center">
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
              name="header1"
              className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
            />
          </div>
        </div>
      </section>
      {/**Ser 1 - 3*/}
      {[0, 0, 0].map((_, index) => (
        <section className="w-full pl-7 mt-10">
          <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
            <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
              {`Ser ${index + 1}`}
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
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
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
      ))}
      <section className="w-full pl-7 mt-10">
        <div className="border flex items-center justify-center border-[#898787F4] border-dashed h-[362px] relative rounded-[10px] p-10">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Ser
          </div>
          {/**Form */}
          <div className="py-[15px] w-fit mx-auto px-[50px] rounded-full bg-primary text-white font-clashmd">
            Add a new service
          </div>
        </div>
      </section>
    </div>
  );
}
