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

export const updateHomepage = async (name, email, password) => {
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
          name,
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log("Success:", data); // Handle the response data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error); // Handle errors
  }
};
