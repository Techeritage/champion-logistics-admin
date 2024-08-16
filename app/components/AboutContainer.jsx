"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAboutPage, updateAboutpage } from "../libs/Powerhouse";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { HomeSkeleton } from "./loader";
import toast from "react-hot-toast";
const storage = getStorage(app);

export default function AboutContainer() {
  //state
  //uploading state
  const [uploading, setUploading] = useState({
    headerImage: false,
    profileImage: false,
    // Add more keys as needed
  });
  const [uploadingState, setUploadingState] = useState({});
  const [uploadingState2, setUploadingState2] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  const [header, setHeader] = useState("");
  const [key1, setKey1] = useState({
    bannerImage: "",
    header: "",
    descriptionText: "",
  });

  // Handler to update the state when input values change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKey1((prevPhones) => ({
      ...prevPhones,
      [name]: value,
    }));
  };

  const [key2, setKey2] = useState({
    bannerImage: "",
    header: "",
    descriptionText: "",
  });

  // Handler to update the state when input values change
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setKey2((prevPhones) => ({
      ...prevPhones,
      [name]: value,
    }));
  };
  const [key3, setKey3] = useState({
    header: "",
    content: Array(5).fill(""), // Initialize content with 5 empty strings
  });

  // Handle changes for the header input
  const handleHeaderChange = (event) => {
    setKey3((prev) => ({
      ...prev,
      header: event.target.value,
    }));
  };

  // Handle changes for content inputs
  const handleContentChange = (index, event) => {
    const newContent = [...key3.content];
    newContent[index] = event.target.value; // Update the specific content index
    setKey3((prev) => ({
      ...prev,
      content: newContent,
    }));
  };
  const [key4, setKey4] = useState({
    mission: "",
    vision: "",
    strength: "",
  });

  // Handler to update the state when input values change
  const handleInputChange4 = (event) => {
    const { name, value } = event.target;
    setKey4((prevPhones) => ({
      ...prevPhones,
      [name]: value,
    }));
  };

  //useEffect
  const fetchAboutpage = async () => {
    try {
      const res = await getAboutPage();
      if (res) {
        //set first state
        setHeader(res?.header);
        //set second state
        setKey1(res?.key1);
        //set third state
        setKey2(res?.key2);
        //set third state
        setKey3(res?.key3);
        //set fourth state
        setKey4(res?.key4);

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
    fetchAboutpage();
  }, []);

  const handleFileChange = async (event, imageType) => {
    const files = event.target.files;
    if (!files) return;

    let setUploadingState;
    let setImageState;

    switch (imageType) {
      case "bannerImage":
        setUploadingState = (value) =>
          setUploading((prev) => ({ ...prev, bannerImage: value }));
        setImageState = (url) =>
          setKey1((prev) => ({ ...prev, bannerImage: url })); // Use setKey1 directly
        break;
      case "headerImage":
        setUploadingState = (value) =>
          setUploading((prev) => ({ ...prev, headerImage: value }));
        setImageState = (url) =>
          setKey2((prev) => ({ ...prev, headerImage: url })); // Use setKey1 directly
        break;
      default:
        return;
    }

    setUploadingState(true);

    const newFiles = Array.from(files);
    const uploadPromises = newFiles.map((file) =>
      uploadFile(file, setImageState)
    );
    await Promise.all(uploadPromises);

    setUploadingState(false);
  };

  const handleFileChange2 = async (event) => {
    const files = event.target.files;
    if (!files) return;

    setLoading2(true); // Set loading state to true

    // Update the image state
    const setImageState = (url) =>
      setKey2((prev) => ({ ...prev, bannerImage: url }));

    const newFiles = Array.from(files);
    const uploadPromises = newFiles.map((file) =>
      uploadFile2(file, setImageState)
    );

    try {
      await Promise.all(uploadPromises); // Wait for all uploads to complete
    } catch (error) {
      console.error("Error uploading files:", error); // Handle errors
    } finally {
      setLoading2(false); // Ensure loading state is reset
    }
  };

  const uploadFile = async (file, setImageState) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    setImageState(downloadURL);
  };

  const uploadFile2 = async (file, setImageState) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );

    // Wait for the upload to complete
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    setImageState(downloadURL);
  };

  const handleUpdate = async () => {
    setOnSubmitLoading(true);
    try {
      const res = await updateAboutpage(header, key1, key2, key3, key4);
      if (res.message === "About Page Content updated successfully") {
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
        <h1 className="text-2xl font-clashmd">About</h1>
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
              name="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
            />
          </div>
        </div>
      </section>
      {/**Key 1 */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[50%] translate-x-[-50%] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Key 1
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Banner image</label>
              <div className="relative">
                {uploading.bannerImage && (
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
                {key1.bannerImage ? (
                  <div className="relative">
                    <img
                      src={key1?.bannerImage}
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
                    onChange={(e) => handleFileChange(e, "bannerImage")}
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
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Header 2</label>
              <input
                type="text"
                name="header"
                value={key1.header}
                onChange={handleInputChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="descriptionText"
                value={key1.descriptionText}
                onChange={handleInputChange}
                className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[214px] p-5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
      {/**Key 2 */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Key 2
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Banner image</label>
              <div className="relative">
                {loading2 && (
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
                {key2.bannerImage ? (
                  <div className="relative">
                    <img
                      src={key2.bannerImage}
                      alt="Uploaded banner"
                      className="rounded-[10px] w-full min-h-[255px]"
                    />
                  </div>
                ) : (
                  <div className="bg-[#f4f4f4]/50 h-[255px] relative rounded-[10px]"></div>
                )}
                <button
                  onClick={() =>
                    document.getElementById("file-upload2").click()
                  }
                  className="absolute right-5 top-5 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#F0F2F5]"
                >
                  <input
                    type="file"
                    id="file-upload2"
                    className="hidden"
                    onChange={handleFileChange2}
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
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Header 2</label>
              <input
                type="text"
                name="header"
                value={key2.header}
                onChange={handleInputChange2}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Description Text</label>
              <textarea
                type="text"
                name="descriptionText"
                value={key2.descriptionText}
                onChange={handleInputChange2}
                className="bg-[#f4f4f4] text-sm resize-none rounded-[10px] min-h-[214px] p-5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
      {/**Key 3 */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Key 3
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Header</label>
              <input
                type="text"
                name="header"
                value={key3.header} // Bind the header state
                onChange={handleHeaderChange}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            {key3.content.map((content, index) => (
              <div className="grid gap-3" key={index}>
                <label className="text-sm font-clashmd">{`Content ${
                  index + 1
                }`}</label>
                <input
                  type="text"
                  name={`content${index}`}
                  value={content} // Bind the content state
                  onChange={(e) => handleContentChange(index, e)}
                  className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/**Key 4 */}
      <section className="w-full pl-7 mt-10">
        <div className="border border-[#F4F4F4F4] relative rounded-[10px] p-10 h-full">
          <div className="absolute top-[-17px] left-[150px] border bg-white border-[#f4f4f4]/95 rounded-full py-[5px] px-[30px] text-sm font-clashmd">
            Key 4
          </div>
          {/**Form */}
          <div className="grid gap-7">
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Mission</label>
              <input
                type="text"
                name="mission"
                value={key4.mission}
                onChange={handleInputChange4}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Vision</label>
              <input
                type="text"
                name="vision"
                value={key4.vision}
                onChange={handleInputChange4}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
            <div className="grid gap-3">
              <label className="text-sm font-clashmd">Strength</label>
              <input
                type="text"
                name="strength"
                value={key4.strength}
                onChange={handleInputChange4}
                className="bg-[#f4f4f4] text-sm rounded-[10px] h-[61px] p-5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
