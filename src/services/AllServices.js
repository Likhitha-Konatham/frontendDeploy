import { requestPostApiCall, requestGetApiCall } from "./ApiServices";

export const registerUser = async (formData, callback) => {
  const urlEndPoint = `register`;

  // Create the payload
  const payload = {
    firstname: formData.firstName,
    email: formData.email,
    password: formData.password,
    genre: formData.genre, // Ensure genre is an array as expected
  };

  console.log("Payload being sent to API:", payload);

  try {
    // Make the API call using requestPostApiCall
    const response = await requestPostApiCall(urlEndPoint, payload, callback);

    // Log and return the response
    if (!response) {
      console.error("Unexpected response from requestPostApiCall:", response);
      return undefined;
    }

    console.log("API Response:", response);
    return response; // Ensure this returns the API's response for further handling
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const loginUser = async (loginData, callback) => {
  const urlEndPoint = `login`;
  const payload = {
    email: loginData.email,
    password: loginData.password,
  };

  try {
    // Make the API call
    const response = await requestPostApiCall(urlEndPoint, payload);

    if (!response) {
      console.error("Unexpected response from requestPostApiCall:", response);
      return undefined;
    }

    console.log("API Response:", response);

    // Invoke the callback with the response data, if provided
    if (callback) callback(response.data);

    return response; // Return the response for further handling
  } catch (error) {
    console.error("Error during API call:", error);

    // Handle server-side or client-side errors
    const serverResponse = error.response?.data;
    if (serverResponse?.code) {
      console.error(
        "Server Error Code:",
        serverResponse.code,
        "Message:",
        serverResponse.message
      );
    }

    throw error; // Re-throw the error for caller functions to handle
  }
};

export const fetchProfile = async () => {
  const urlEndPoint = `profile`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    console.log("allServices fetch profile:", response);
    return response; // Return the response
  } catch (error) {
    throw error; // Let the caller handle the error
  }
};

export const sendOTP = async (formData, callback) => {
  const urlEndPoint = `send-otp`;

  // Create the payload
  const payload = {
    email: formData.email,
  };

  console.log("Payload being sent to API:", payload);

  try {
    // Make the API call using requestPostApiCall
    const response = await requestPostApiCall(urlEndPoint, payload, callback);

    // Log and return the response
    if (!response) {
      console.error("Unexpected response from requestPostApiCall:", response);
      return undefined;
    }

    console.log("API Response:", response);
    return response; // Ensure this returns the API's response for further handling
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const validateOTP = async (formData, callback) => {
  const urlEndPoint = `validate-otp`;

  // Create the payload
  const payload = {
    email: formData.email,
    enteredOTP: formData.enteredOTP, // Ensure genre is an array as expected
  };

  console.log("Payload being sent to API:", payload);

  try {
    // Make the API call using requestPostApiCall
    const response = await requestPostApiCall(urlEndPoint, payload, callback);

    // Log and return the response
    if (!response) {
      console.error("Unexpected response from requestPostApiCall:", response);
      return undefined;
    }

    console.log("API Response:", response);
    return response; // Ensure this returns the API's response for further handling
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const fetchAllBooks = async (callback) => {
  const urlEndPoint = `AllBooks`; // API endpoint for all books
  try {
    // Make the GET API call
    const response = await requestGetApiCall(urlEndPoint);
    return response; // Return the response for further handling
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const fetchAllGenreBooks = async (callback) => {
  const urlEndPoint = `ALLGenreBooks`; // API endpoint for all genres
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response; // Return the response
  } catch (error) {
    throw error; // Let the caller handle the error
  }
};

export const fetchUserBookmarks = async () => {
  const urlEndPoint = `UserBookMarks`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response; // Return the response
  } catch (error) {
    throw error; // Let the caller handle the error
  }
};

export const insertReadLater = async (formData, callback) => {
  console.log("bookid", formData.bookID);
  const urlEndPoint = `insertReadlater`;
  const payload = {
    bookID: formData.bookID,
  };

  await requestPostApiCall(urlEndPoint, payload, callback);
};

export const fetchReadLaterBooks = async (callback) => {
  const urlEndPoint = `readlater`; // API endpoint for Read Later books
  try {
    // Make the GET API call
    const response = await requestGetApiCall(urlEndPoint);
    return response; // Return the response for further handling
  } catch (error) {
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const getCountries = async (callback) => {
  const urlEndPoint = `getcountries`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response; // Return the response for further handling
  } catch (error) {
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const getStates = async (country, callback) => {
  const urlEndPoint = `getstates`;
  const params = { country }; // Include the country parameter

  try {
    const response = await requestGetApiCall(urlEndPoint, params);
    if (callback) callback(response); // Trigger the callback with the response
    return response; // Return the response for further handling
  } catch (error) {
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const updateProfile = async (profileData, callback) => {
  const urlEndPoint = `update_profile`;

  const payload = {
    firstName: profileData.firstname,
    lastName: profileData.lastName,
    email: profileData.email,
    mobileNumber: profileData.mobileNumber,
    state: profileData.state,
    country: profileData.country,
    address: profileData.address,
    city: profileData.city,
  };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload);
    if (!response) {
      console.error("Unexpected response from requestPostApiCall:", response);
      return undefined;
    }

    console.log("Update Profile API Response:", response);

    // Trigger the callback with the response data, if provided
    if (callback) callback(response.data);

    return response; // Return the response for further handling
  } catch (error) {
    console.error("Error during updateProfile API call:", error);

    // Handle server-side or client-side errors
    const serverResponse = error.response?.data;
    if (serverResponse?.code) {
      console.error(
        "Server Error Code:",
        serverResponse.code,
        "Message:",
        serverResponse.message
      );
    }

    throw error; // Re-throw the error for caller functions to handle
  }
};

export const updateVoiceSelection = async (voiceSelection) => {
  const urlEndPoint = `VoiceSelection?gendervoice=${voiceSelection}`; // Keep the endpoint as is

  // Sending the voice selection as a query parameter instead of in the body
  const params = {
    gendervoice: voiceSelection, // Ensure it's sent as a query param
  };

  try {
    // API call with query parameters using requestPostApiCall
    const response = await requestPostApiCall(urlEndPoint, params); // Assuming requestPostApiCall handles query params
    return response;
  } catch (error) {
    console.error("Error during VoiceSelection API call:", error);
    throw error; // Re-throw the error for caller functions to handle
  }
};

export const updatePlaySpeed = async (playbackSpeed) => {
  const urlEndPoint = `PlaySpeed?PlaySpeed=${playbackSpeed}`; // Keep the endpoint as is

  // Sending the playbackSpeed as a query parameter instead of in the body
  const params = {
    PlaySpeed: playbackSpeed, // Ensure it's sent as a query param
  };

  try {
    // API call with query parameters using requestPostApiCall
    const response = await requestPostApiCall(urlEndPoint, params); // Assuming requestPostApiCall handles query params in this way
    return response;
  } catch (error) {
    console.error("Error during PlaySpeed API call:", error);
    throw error; // Re-throw the error for caller functions to handle
  }
};
