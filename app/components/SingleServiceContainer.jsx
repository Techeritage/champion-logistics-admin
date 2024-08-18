"use client";
import Image from "next/image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { getSingleService, updateSingleService } from "../libs/Powerhouse";
import { HomeSkeleton } from "./loader";
import toast from "react-hot-toast";
import { app } from "../utils/firebase";
const storage = getStorage(app);

export default function SingleServiceContainer({ id }) {
  //uploading state
  const [uploading, setUploading] = useState({
    headerImage: false,
    profileImage: false,
    // Add more keys as needed
  });
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  //state1
  const [header, setHeader] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [keys, setKeys] = useState([]);

  // Remove content if it's empty
  const removeEmptyContent = (keyIndex) => {
    const updatedKeys = [...keys];
    const filteredContents = updatedKeys[keyIndex].contents.filter(
      (content) => content.trim() !== ""
    );

    if (filteredContents.length === 0) {
      // If all contents are empty, delete the key itself
      removeKeyFeature(keyIndex);
    } else {
      updatedKeys[keyIndex].contents = filteredContents;
      setKeys(updatedKeys);
    }
  };

  // Function to remove a specific content
  const removeContent = (keyIndex, contentIndex) => {
    const updatedKeys = [...keys];
    updatedKeys[keyIndex].contents.splice(contentIndex, 1);
    setKeys(updatedKeys);

    // If all contents are removed, remove the key feature as well
    if (updatedKeys[keyIndex].contents.length === 0) {
      removeKey(keyIndex);
    }
  };

  // Remove key if it's empty
  const removeKeyFeature = (keyIndex) => {
    const updatedKeys = keys.filter((_, index) => index !== keyIndex);
    setKeys(updatedKeys);
  };

  // Modify the handleContentChange function to remove empty content blocks
  const handleContentChange = (keyIndex, contentIndex, value) => {
    const updatedKeys = [...keys];
    updatedKeys[keyIndex].contents[contentIndex] = value;

    if (value.trim() === "") {
      // Remove the empty content block
      removeEmptyContent(keyIndex);
    } else {
      setKeys(updatedKeys);
    }
  };

  // Modify the handleHeaderChange function to remove key if title is empty
  const handleHeaderChange = (keyIndex, value) => {
    const updatedKeys = [...keys];
    updatedKeys[keyIndex].title = value;

    if (value.trim() === "") {
      // Remove the key if the title is empty
      removeKeyFeature(keyIndex);
    } else {
      setKeys(updatedKeys);
    }
  };

  // Add new content to a specific key
  const addContent = (keyIndex) => {
    const updatedKeys = [...keys];
    updatedKeys[keyIndex].contents.push("");
    setKeys(updatedKeys);
  };

  // Add a new key
  const addNewKey = () => {
    setKeys([...keys, { title: "", contents: [""] }]);
  };

  useEffect(() => {
    // Fetch the service data using the serviceId
    const fetchServiceData = async () => {
      try {
        const res = await getSingleService(id);
        if (res) {
          //set first state
          setHeader(res?.header);
          setDescriptionText(res?.descriptionText);
          setBannerImage(res?.bannerImage);
          setKeys(res?.keys);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        setLoading;
      }
    };

    if (id) {
      fetchServiceData();
    }
  }, [id]);

  // Handle file change and upload for state1
  const handleFileChange = async (event, imageType) => {
    const files = event.target.files;
    if (!files) return;

    let setUploadingState;
    let setImageState;

    switch (imageType) {
      case "headerImage":
        setUploadingState = (value) =>
          setUploading((prev) => ({ ...prev, headerImage: value }));
        setImageState = (url) => setBannerImage(url);
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

  //submit
  const handleUpdate = async () => {
    setOnSubmitLoading(true);
    try {
      const res = await updateSingleService(
        header,
        bannerImage,
        descriptionText,
        keys,
        id
      );
      if (res.message === "Service updated successfully") {
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
        <h1 className="text-2xl font-clashmd">Services</h1>
        <button
          onClick={handleUpdate}
          disabled={onSubmitLoading}
          className="bg-primary hover:bg-white hover:text-primary transition-all duration-150 border-2 border-primary mr-5 rounded-full disabled:cursor-not-allowed text-base font-clashmd text-white w-[157px] h-[51px] flex items-center justify-center"
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
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="desc"
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="bg-[#f4f4f4] custom-scrollbar text-sm resize-none rounded-[10px] min-h-[89px] p-5 focus:outline-none"
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
                {bannerImage ? (
                  <div className="relative">
                    <img
                      src={bannerImage}
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
                    src="/upload.svg"
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
      {/**Key 1 */}
      <section className="w-full pl-7 mt-10">
        <div>
          {keys.map((key, keyIndex) => (
            <section className="w-full pl-7 mt-10" key={key._id || keyIndex}>
              <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
                <div className="absolute top-[-21px] flex items-center py-2 left-[350px] border bg-white border-[#f4f4f4]/95 rounded-full px-[30px] text-sm font-clashmd">
                  {`Key ${keyIndex + 1}`}
                  <button
                    onClick={() => removeKeyFeature(keyIndex)}
                    className="ml-4 text-red-500 hover:text-red-300 transition-colors duration-150 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid gap-7">
                  <div className="grid gap-3">
                    <label className="text-sm font-clashmd">Header</label>
                    <input
                      type="text"
                      value={key.title}
                      onChange={(e) =>
                        handleHeaderChange(keyIndex, e.target.value)
                      }
                      className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                    />
                  </div>
                  {key.contents.map((content, contentIndex) => (
                    <div className="grid gap-3 items-center" key={contentIndex}>
                      <label className="text-sm font-clashmd">{`Content ${
                        contentIndex + 1
                      }`}</label>
                      <div className="relative min-w-full">
                        <input
                          type="text"
                          value={content}
                          onChange={(e) =>
                            handleContentChange(
                              keyIndex,
                              contentIndex,
                              e.target.value
                            )
                          }
                          className="bg-[#f4f4f4] w-full text-sm rounded-[10px] h-[61px] p-5 focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => removeContent(keyIndex, contentIndex)}
                          className="ml-2 text-red-500 hover:text-red-300 transition-colors duration-150 bg-white rounded-full absolute top-[50%] translate-y-[-50%]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addContent(keyIndex)}
                    className="bg-primary hover:bg-white hover:text-primary transition-all duration-150 border border-primary mx-auto mt-3 rounded-full text-base font-clashmd text-white px-20 h-[53px] flex items-center justify-center"
                  >
                    Add Content
                  </button>
                </div>
              </div>
            </section>
          ))}

          <div className="border flex ml-7 mt-10 items-center justify-center border-[#898787F4] border-dashed h-[150px] relative rounded-[10px] p-10">
            <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
              Key
            </div>
            <button
              onClick={addNewKey}
              className="bg-primary hover:bg-white hover:text-primary transition-all duration-150 border border-primary mx-auto rounded-full text-base font-clashmd text-white px-20 h-[53px] flex items-center justify-center"
            >
              Add New Key Feature
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
