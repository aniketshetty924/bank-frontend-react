import axios, { AxiosError } from "axios";

export const getKycService = async () => {
  try {
    const fullToken = response.data.token;
    const user = response.data.user;
    const token = fullToken.split(" ")[1];
    localStorage.setItem("token", fullToken);
    const userId = user.userId;
    const response = await axios.get(
      `http://localhost:4500/api/v1/kyc/user/${userId}`,
      {
        headers: { auth: token },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching KYC:", error);
    throw new AxiosError(error);
  }
};

export const submitKycService = async (document) => {
  try {
    const fullToken = response.data.token;
    const user = response.data.user;
    const token = fullToken.split(" ")[1];
    localStorage.setItem("token", fullToken);
    const userId = user.userId;
    const response = await axios.put(
      `http://localhost:4500/api/v1/kyc/user/${userId}`,
      document,
      {
        headers: {
          auth: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating KYC:", error);
    throw new AxiosError(error);
  }
};
