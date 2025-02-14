import { requestPostApiCall, requestGetApiCall } from "./ApiServices";

const handleError = (error, operation) => {
  // Log error details for debugging purposes
  console.error(`Error during ${operation} API call:`, error);

  const serverResponse = error.response?.data;
  if (serverResponse?.code) {
    console.error(
      `Server Error Code: ${serverResponse.code}, Message: ${serverResponse.message}`
    );
  }
  // Return a standardized error response
  return null;
};

export const registerUser = async (formData, callback) => {
  const urlEndPoint = `register`;
  const payload = {
    firstname: formData.firstName,
    email: formData.email,
    password: formData.password,
    genre: formData.genre,
  };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload, callback);
    return response || null;
  } catch (error) {
    return handleError(error, "registerUser");
  }
};

export const loginUser = async (loginData, callback) => {
  const urlEndPoint = `login`;
  const payload = {
    email: loginData.email,
    password: loginData.password,
  };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload);
    if (callback) callback(response?.data);
    return response || null;
  } catch (error) {
    return handleError(error, "loginUser");
  }
};

export const fetchProfile = async () => {
  const urlEndPoint = `profile`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchProfile");
  }
};

export const sendOTP = async (formData, callback) => {
  const urlEndPoint = `send-otp`;
  const payload = { email: formData.email };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload, callback);
    return response || null;
  } catch (error) {
    return handleError(error, "sendOTP");
  }
};

export const validateOTP = async (formData, callback) => {
  const urlEndPoint = `validate-otp`;
  const payload = {
    email: formData.email,
    enteredOTP: formData.enteredOTP,
  };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload, callback);
    return response || null;
  } catch (error) {
    return handleError(error, "validateOTP");
  }
};

export const fetchAllBooks = async () => {
  const urlEndPoint = `AllBooks`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchAllBooks");
  }
};

export const fetchAllGenreBooks = async () => {
  const urlEndPoint = `ALLGenreBooks`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchAllGenreBooks");
  }
};

export const fetchUserBookmarks = async () => {
  const urlEndPoint = `UserBookMarks`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchUserBookmarks");
  }
};

export const deleteBookMarks = async (formData, callback) => {
  const urlEndPoint = `DeleteBookMarks`;
  const payload = { bookMarkID: formData.bookmarkId };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload, callback);
    return response || null;
  } catch (error) {
    return handleError(error, "deleteBookMarks");
  }
};

export const insertReadLater = async (formData, callback) => {
  const urlEndPoint = `insertReadlater`;
  const payload = { bookID: formData.bookID };

  try {
    await requestPostApiCall(urlEndPoint, payload, callback);
  } catch (error) {
    handleError(error, "insertReadLater");
  }
};

export const deleteReadLater = async (formData, callback) => {
  const urlEndPoint = `deleteReadlater`;
  const payload = { bookID: formData.bookID };

  try {
    const response = await requestPostApiCall(urlEndPoint, payload, callback);
    return response || null;
  } catch (error) {
    return handleError(error, "deleteReadLater");
  }
};

export const fetchReadLaterBooks = async () => {
  const urlEndPoint = `readlater`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchReadLaterBooks");
  }
};

export const getCountries = async () => {
  const urlEndPoint = `getcountries`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "getCountries");
  }
};

export const getStates = async (country, callback) => {
  const urlEndPoint = `getstates`;
  const params = { country };

  try {
    const response = await requestGetApiCall(urlEndPoint, params);
    if (callback) callback(response);
    return response || null;
  } catch (error) {
    return handleError(error, "getStates");
  }
};

export const getCountryCodes = async () => {
  const urlEndPoint = `country_code`;
  try {
    const response = await requestGetApiCall(urlEndPoint);

    // Validate the response structure
    if (!response || response.status !== "success") {
      console.error(
        `Error fetching country codes: ${response?.message || "Unknown error"}`
      );
      return null;
    }

    // Ensure data is an array of country codes
    return response.data || [];
  } catch (error) {
    console.error("Error in getCountryCodes:", error);
    return null;
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
    if (callback) callback(response?.data);
    return response || null;
  } catch (error) {
    return handleError(error, "updateProfile");
  }
};

export const updateVoiceSelection = async (voiceSelection) => {
  const urlEndPoint = `VoiceSelection?gendervoice=${voiceSelection}`;

  try {
    const response = await requestPostApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "updateVoiceSelection");
  }
};

export const updatePlaySpeed = async (playbackSpeed) => {
  const urlEndPoint = `PlaySpeed?PlaySpeed=${playbackSpeed}`;

  try {
    const response = await requestPostApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "updatePlaySpeed");
  }
};

export const fetchInProgressBooks = async () => {
  const urlEndPoint = `InprogressBook`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchInProgressBooks");
  }
};

export const searchBooks = async (searchQuery) => {
  const urlEndPoint = `search`;
  console.log("Search Query:", searchQuery);

  const params = { search_query: encodeURIComponent(searchQuery) };
  try {
    const response = await requestGetApiCall(urlEndPoint, params);
    console.log("API Response:", response); // Debugging
    return response;
  } catch (error) {
    console.error("Error in searchBooks:", error);
    return handleError(error, "searchBooks");
  }
};
export const fetchSearchHistory = async () => {
  const urlEndPoint = `search_history`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchSearchHistory");
  }
};

export const fetchSearchCount = async () => {
  const urlEndPoint = `search_count`;
  try {
    const response = await requestGetApiCall(urlEndPoint);
    return response || null;
  } catch (error) {
    return handleError(error, "fetchSearchCount");
  }
};
