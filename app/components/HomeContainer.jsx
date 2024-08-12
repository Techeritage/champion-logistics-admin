"use client";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";
import { app } from "../utils/firebase";
const storage = getStorage(app);

export default function HomeContainer() {
  const numberToWords = ["One", "Two", "Three", "Four", "Five"];

  const [uploading, setUploading] = useState({
    headerImage: false,
    profileImage: false,
    // Add more keys as needed
  });

  const [uploadingState, setUploadingState] = useState({});
  const [uploadingState2, setUploadingState2] = useState({});

  //state1 and handler
  const [header, setHeader] = useState({
    header: "",
    desc: "",
    image: "",
  });

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;

    setHeader((prevHeader) => ({
      ...prevHeader,
      [name]: value,
    }));
  };

  // Handle file change and upload
  const handleFileChange = async (event, imageType) => {
    const files = event.target.files;
    if (!files) return;

    let setUploadingState;
    let setImageState;

    switch (imageType) {
      case "headerImage":
        setUploadingState = (value) =>
          setUploading((prev) => ({ ...prev, headerImage: value }));
        setImageState = (url) =>
          setHeader((prevHeader) => ({ ...prevHeader, image: url }));
        break;
      case "profileImage":
        setUploadingState = (value) =>
          setUploading((prev) => ({ ...prev, profileImage: value }));
        setImageState = (url) => setProfileImage(url);
        break;
      // Add more cases as needed
      default:
        return;
    }

    setUploadingState(true); // Start uploading

    const newFiles = Array.from(files);
    const uploadPromises = newFiles.map((file) =>
      uploadFile(file, setImageState)
    );
    await Promise.all(uploadPromises);

    setUploadingState(false); // End uploading
  };

  const uploadFile = async (file, setImageState) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update the specific image state
    setImageState(downloadURL);
  };

  //state2 and handler
  const [about, setAbout] = useState({
    header: "",
    subHeader: "",
    desc: "",
    imageText: Array(5).fill({ image: "", desc: "" }), // Initial empty images and descriptions
  });

  const handleAboutChange = (e) => {
    const { name, value } = e.target;

    setAbout((prevAbout) => ({
      ...prevAbout,
      [name]: value,
    }));
  };

  const handleAboutDescriptionChange = (event, index) => {
    const { value } = event.target;
    setAbout((prevAbout) => ({
      ...prevAbout,
      imageText: prevAbout.imageText.map((item, i) =>
        i === index ? { ...item, desc: value } : item
      ),
    }));
  };

  //about file change
  const handleFileChange2 = async (event, index) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    setUploadingState((prev) => ({ ...prev, [index]: true })); // Set uploading state for this index

    // Upload file and get the URL
    const downloadURL = await uploadFile2(file); // Ensure uploadFile is defined

    setAbout((prevAbout) => ({
      ...prevAbout,
      imageText: prevAbout.imageText.map((item, i) =>
        i === index ? { ...item, image: downloadURL } : item
      ),
    }));

    setUploadingState((prev) => ({ ...prev, [index]: false })); // Reset uploading state
  };

  const uploadFile2 = async (file) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optionally handle upload progress
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        async () => {
          // Handle successful uploads
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  //state3 and handler
  const [services, setServices] = useState({
    header: "",
    subHeader: "",
    desc: "",
    imageText: Array(3).fill({ image: "", desc1: "", desc2: "" }), // Initial empty images and descriptions
  });

  const handleServicesChange = (e) => {
    const { name, value } = e.target;

    setServices((prevAbout) => ({
      ...prevAbout,
      [name]: value,
    }));
  };

  const handleServiceDescriptionChange = (event, index) => {
    const { value } = event.target;
    setServices((prevAbout) => ({
      ...prevAbout,
      imageText: prevAbout.imageText.map((item, i) =>
        i === index ? { ...item, desc1: value } : item
      ),
    }));
  };

  const handleServiceDescriptionChange2 = (event, index) => {
    const { value } = event.target;
    setServices((prevAbout) => ({
      ...prevAbout,
      imageText: prevAbout.imageText.map((item, i) =>
        i === index ? { ...item, desc2: value } : item
      ),
    }));
  };

  //services file change
  const handleFileChange3 = async (event, index) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    setUploadingState2((prev) => ({ ...prev, [index]: true })); // Set uploading state for this index

    // Upload file and get the URL
    const downloadURL = await uploadFile3(file); // Ensure uploadFile is defined

    setServices((prevAbout) => ({
      ...prevAbout,
      imageText: prevAbout.imageText.map((item, i) =>
        i === index ? { ...item, image: downloadURL } : item
      ),
    }));

    setUploadingState2((prev) => ({ ...prev, [index]: false })); // Reset uploading state
  };

  const uploadFile3 = async (file) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optionally handle upload progress
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        async () => {
          // Handle successful uploads
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  //state4 and handlers
  const [faqs, setFaqs] = useState([
    { content: "", subContent: "" },
    { content: "", subContent: "" },
    { content: "", subContent: "" },
    { content: "", subContent: "" },
  ]);

  const handleFaqChange = (event, index, field) => {
    const { value } = event.target;

    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const handleUpdate = () => {
    console.log(header);
    console.log(about);
    console.log(services);
    console.log(faqs);
  };

  return (
    <main className="pl-[300px] pt-12 pb-20 px-[3%]">
      <div className="flex items-center justify-between sticky bg-white z-10 py-5 top-0">
        <h1 className="text-2xl font-clashmd">Homepage</h1>
        <button
          onClick={handleUpdate}
          className="bg-primary mr-5 rounded-full text-base font-clashmd text-white w-[157px] h-[53px] flex items-center justify-center"
        >
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
                value={header.header}
                onChange={handleHeaderChange}
                name="header"
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="desc"
                value={header.desc}
                onChange={handleHeaderChange}
                className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[89px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Banner image</label>
              <div className="relative">
                {uploading.headerImage && (
                  <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex items-center justify-center">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      width="50px"
                      height="50px"
                    >
                      <path
                        fill="none"
                        stroke="#2828D1"
                        strokeWidth="4"
                        strokeMiterlimit="10"
                        d="M25,5 A20,20 0 1,1 24.999,5"
                        strokeDasharray="31.4 31.4"
                        strokeLinecap="round"
                        transform="rotate(225 25 25)"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                )}
                {header.image ? (
                  <div className="relative">
                    <img
                      src={header.image}
                      alt="Uploaded banner"
                      className="rounded-[10px] w-full min-h-[255px]"
                    />
                  </div>
                ) : (
                  <div className="bg-[#f4f4f4]/50 h-[255px] relative rounded-[10px]"></div>
                )}
                <button
                  onClick={() => document.getElementById("file-upload").click()}
                  className="absolute right-5 top-5 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#F0F2F5]"
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "headerImage")}
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
                  name="header"
                  value={about.header}
                  onChange={handleAboutChange}
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-sm font-clashmd">Sub- Header 2</label>
                <input
                  type="text"
                  name="subHeader"
                  value={about.subHeader}
                  onChange={handleAboutChange}
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="desc"
                value={about.desc}
                onChange={handleAboutChange}
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
                  <div className="relative h-[166px]">
                    {about.imageText[index].image ? (
                      <img
                        src={about.imageText[index].image}
                        alt={`Uploaded Image ${numberToWords[index]}`}
                        className="w-full h-full object-cover rounded-[16px]"
                      />
                    ) : (
                      <div className="bg-[#f4f4f4]/50 relative rounded-[16px] h-[166px]"></div>
                    )}

                    {uploadingState[index] && (
                      <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex items-center justify-center h-full">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          width="50px"
                          height="50px"
                        >
                          <path
                            fill="none"
                            stroke="#2828D1"
                            strokeWidth="4"
                            strokeMiterlimit="10"
                            d="M25,5 A20,20 0 1,1 24.999,5"
                            strokeDasharray="31.4 31.4"
                            strokeLinecap="round"
                            transform="rotate(225 25 25)"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        document.getElementById(`file-upload-${index}`).click()
                      }
                      className="w-[56px] absolute right-3 top-3 flex items-center justify-center  h-[56px] rounded-full bg-[#F0F2F5]"
                    >
                      <input
                        type="file"
                        onChange={(e) => handleFileChange2(e, index)}
                        id={`file-upload-${index}`}
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
                      name={`desc-${index}`}
                      value={about.imageText[index]?.desc || ""}
                      onChange={(e) => handleAboutDescriptionChange(e, index)}
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
                  name="header"
                  value={services.header}
                  onChange={handleServicesChange}
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-sm font-clashmd">Sub- Header 3</label>
                <input
                  type="text"
                  name="subHeader"
                  value={services.subHeader}
                  onChange={handleServicesChange}
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="desc"
                value={services.desc}
                onChange={handleServicesChange}
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
                  <div className="relative">
                    {services.imageText[index].image ? (
                      <img
                        src={services.imageText[index].image}
                        alt={`Uploaded Image ${numberToWords[index]}`}
                        className="w-full h-[166px] object-cover rounded-[16px]"
                      />
                    ) : (
                      <div className="bg-[#f4f4f4]/50 relative rounded-[16px] h-[166px]"></div>
                    )}

                    {uploadingState2[index] && (
                      <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex items-center justify-center h-full">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          width="50px"
                          height="50px"
                        >
                          <path
                            fill="none"
                            stroke="#2828D1"
                            strokeWidth="4"
                            strokeMiterlimit="10"
                            d="M25,5 A20,20 0 1,1 24.999,5"
                            strokeDasharray="31.4 31.4"
                            strokeLinecap="round"
                            transform="rotate(225 25 25)"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 25 25"
                              to="360 25 25"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        document.getElementById(`file-upload2-${index}`).click()
                      }
                      className="w-[56px] absolute right-3 top-3 flex items-center justify-center  h-[56px] rounded-full bg-[#F0F2F5]"
                    >
                      <input
                        type="file"
                        onChange={(e) => handleFileChange3(e, index)}
                        id={`file-upload2-${index}`}
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
                      name={`desc1-${index}`}
                      value={services.imageText[index]?.desc1 || ""}
                      onChange={(e) => handleServiceDescriptionChange(e, index)}
                      className="bg-[#f4f4f4] text-sm rounded-[16px] h-[55px] p-5 focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-3">
                    <label className="text-sm font-clashmd">
                      Key Point Two
                    </label>
                    <input
                      type="text"
                      name={`desc2-${index}`}
                      value={services.imageText[index]?.desc2 || ""}
                      onChange={(e) =>
                        handleServiceDescriptionChange2(e, index)
                      }
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
            {faqs.map((faq, index) => (
              <div key={index} className="grid gap-4">
                <div className="grid gap-3">
                  <label className="text-sm font-clashmd">{`Content ${numberToWords[index]}`}</label>
                  <input
                    type="text"
                    id={`content-${index}`}
                    value={faq.content}
                    onChange={(e) => handleFaqChange(e, index, "content")}
                    className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                  />
                </div>
                <div className="grid gap-3">
                  <label className="text-sm font-clashmd">
                    {`Sub - Content ${numberToWords[index]}`}
                  </label>
                  <textarea
                    type="text"
                    id={`subContent-${index}`}
                    value={faq.subContent}
                    onChange={(e) => handleFaqChange(e, index, "subContent")}
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
