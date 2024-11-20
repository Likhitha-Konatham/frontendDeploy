//------------------------- Token -------------------------//
export const setToken = async (token) => {
  try {
    localStorage.setItem("access_token", token);
  } catch (error) {
    console.log("Error setting token", error);
  }
};

export const getToken = async () => {
  try {
    let token = localStorage.getItem("access_token");
    return token;
  } catch (error) {
    console.log("Error getting token", error);
  }
};

//------------------------- Name -------------------------//
export const setName = async (name) => {
  try {
    localStorage.setItem("name", name);
  } catch (error) {
    console.log("error settng name", error);
  }
};

export const getName = async () => {
  try {
    let name = localStorage.getItem("name");
    return name;
  } catch (error) {
    console.log("error getting name", error);
  }
};

//------------------------- Profile -------------------------//
export const setProfile = async (profile) => {
  try {
    localStorage.setItem("profile", profile);
  } catch (error) {
    console.log("Error setting profile", error);
  }
};

export const getProfile = async () => {
  try {
    let profile = localStorage.getItem("profile");
    return profile;
  } catch (error) {
    console.log("Error getting profile", error);
  }
};
