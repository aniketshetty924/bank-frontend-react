import axios from "axios";

export const createUser = async (formData) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const response = await axios.post(
      "http://localhost:4500/api/v1/user/user",
      formData,
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );

    console.log("User response : ", response);
    return response.data;
  } catch (error) {
    console.error("Error registrating in ", error);
  }
};

export const findUserById = async (userId, include) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");

    const url = `http://localhost:4500/api/v1/user/${userId}`;

    const response = await axios.get(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
      params: {
        include: include,
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

export const getAllUsers = async (filters) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const url = "http://localhost:4500/api/v1/user";
    let response = await axios.get(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
      params: filters,
    });
    console.log("Response from backend : ", response.data);
    return response;
  } catch (error) {
    console.log("Error in getAllUsers:", error);
  }
};

export const deleteUserById = async (userId) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const url = `http://localhost:4500/api/v1/user/${userId}`;
    const response = await axios.delete(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    console.log("Response from backend : ", response.data);
    return response;
  } catch (error) {
    console.log("Error in deleting user", error);
  }
};

export const updateUserById = async (userId, parameter, value) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const url = `http://localhost:4500/api/v1/user/${userId}`;
    const response = await axios.put(
      url,
      { parameter, value },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error  in updatin user :  ", error);
  }
};

export const createBank = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");

    const response = await axios.post(
      "http://localhost:4500/api/v1/bank",
      { bankName: formData.bankName, abbreviation: formData.bankAbbreviation },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );

    console.log("Bank response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating bank:", error);
    throw error;
  }
};

export const findAllBanks = async (filters) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const url = "http://localhost:4500/api/v1/bank";
    const response = await axios.get(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
      params: filters,
    });
    console.log("Response from backend : ", response.data);
    return response;
  } catch (error) {
    console.log("Error in get all banks ", error);
  }
};

export const findBankById = async (bankId, include) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");

    const url = `http://localhost:4500/api/v1/bank/${bankId}`;

    const response = await axios.get(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
      params: {
        include: include,
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

export const updateBankById = async (bankId, parameter, value) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");

    const url = `http://localhost:4500/api/v1/bank/${bankId}`;

    const response = await axios.put(
      url,
      { parameter, value },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error  in updatin user :  ", error);
  }
};

export const deleteBankById = async (bankId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const url = `http://localhost:4500/api/v1/bank/${bankId}`;
    const response = await axios.delete(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    console.log("Response from backend : ", response.data);
    return response;
  } catch (error) {
    console.log("Error in deleting user", error);
  }
};

export const findLedgerById = async (ledgerId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");

    const url = `http://localhost:4500/api/v1/ledger/${ledgerId}`;

    const response = await axios.get(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

export const findAllLedgers = async (filters) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized error");
    const url = "http://localhost:4500/api/v1/ledger";
    const response = await axios.get(url, {
      headers: {
        auth: `Bearer ${token}`,
      },
      params: filters,
    });
    console.log("Response from backend : ", response.data);
    return response;
  } catch (error) {
    console.log("Error in get all banks ", error);
  }
};
