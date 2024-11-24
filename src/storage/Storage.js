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

