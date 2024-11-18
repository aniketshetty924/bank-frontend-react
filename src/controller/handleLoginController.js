import axios from "axios";

export const handleLogin = async (e, loginData) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:4500/api/v1/user/login",
      loginData
    );

    console.log("Response : ", response);
    const fullToken = response.data.token;
    const user = response.data.user;
    const token = fullToken.split(" ")[1];
    localStorage.setItem("token", fullToken);

    const payloadBase64 = token.split(".")[1];
    const payloadJson = JSON.parse(
      atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"))
    );
    const isAdmin = payloadJson.isAdmin;
    console.log("Token", token);
    console.log("isAdmin : ", isAdmin);
    console.log("User : ", user);
    return { token, isAdmin, user };
  } catch (error) {
    console.error("Error loggin in ", error);
  }
};
