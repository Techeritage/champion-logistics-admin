export const getHomePage = async () => {
  try {
    const res = await fetch(
      "https://champions-logistics-cms.onrender.com/homepage/",
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async () => {
  try {
    const res = await fetch(
      "https://champions-logistics-cms.onrender.com/servicepage/services",
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleService = async (id) => {
  try {
    const res = await fetch(
      `https://champions-logistics-cms.onrender.com/servicepage/services/${id}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContactPage = async () => {
  try {
    const res = await fetch(
      "https://champions-logistics-cms.onrender.com/contactpage/",
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAboutPage = async () => {
  try {
    const res = await fetch(
      "https://champions-logistics-cms.onrender.com/aboutpage/",
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getServicePage = async () => {
  try {
    const res = await fetch(
      "https://champions-logistics-cms.onrender.com/servicepage/",
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateHomepage = async (
  header1,
  descriptionText1,
  bannerImage,
  header2,
  subHeader2,
  descriptionText2,
  aboutImageText,
  header3,
  subHeader3,
  descriptionText3,
  serviceImageText,
  faqs
) => {
  try {
    const response = await fetch(
      "https://champions-logistics-cms.onrender.com/homepage/",
      {
        method: "PUT", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add any other headers you need here
        },
        body: JSON.stringify({
          header1,
          descriptionText1,
          bannerImage,
          header2,
          subHeader2,
          descriptionText2,
          aboutImageText,
          header3,
          subHeader3,
          descriptionText3,
          serviceImageText,
          faqs,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};
export const updateContactpage = async (header, address, callUs, chatUs) => {
  try {
    const response = await fetch(
      "https://champions-logistics-cms.onrender.com/contactpage/",
      {
        method: "PUT", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add any other headers you need here
        },
        body: JSON.stringify({
          header,
          address,
          callUs,
          chatUs,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};

export const updateSingleService = async (
  header,
  bannerImage,
  descriptionText,
  keys,
  id
) => {
  try {
    const response = await fetch(
      `https://champions-logistics-cms.onrender.com/servicepage/service/${id}`,
      {
        method: "PUT", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add any other headers you need here
        },
        body: JSON.stringify({
          header,
          bannerImage,
          descriptionText,
          keys,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};

export const createSingleService = async (
  header,
  bannerImage,
  descriptionText,
  keys
) => {
  try {
    const response = await fetch(
      `https://champions-logistics-cms.onrender.com/servicepage/service`,
      {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add any other headers you need here
        },
        body: JSON.stringify({
          header,
          bannerImage,
          descriptionText,
          keys,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};

export const updateAboutpage = async (header, key1, key2, key3, key4) => {
  try {
    const response = await fetch(
      "https://champions-logistics-cms.onrender.com/aboutpage/",
      {
        method: "PUT", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add any other headers you need here
        },
        body: JSON.stringify({
          header,
          key1,
          key2,
          key3,
          key4,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};

export const updateMainServicepage = async (header) => {
  try {
    const response = await fetch(
      "https://champions-logistics-cms.onrender.com/servicepage/",
      {
        method: "PUT", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          // Add any other headers you need here
        },
        body: JSON.stringify({
          header,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};
