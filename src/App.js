import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import UserDashboard from "./components/user-dashboard/UserDashboard";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import UserRegistration from "./components/admin-dashboard/user-crud/user-registration/UserRegistration";
import FindUser from "./components/admin-dashboard/user-crud/find-user/FindUser";
import FindAllUsers from "./components/admin-dashboard/user-crud/find-all-users/FindAllUsers";
import DeleteUser from "./components/admin-dashboard/user-crud/delete-user/DeleteUser";
import UpdateUser from "./components/admin-dashboard/user-crud/update-user/UpdateUser";
import CreateBank from "./components/admin-dashboard/bank-crud/create-bank/CreateBank";
import FindAllBanks from "./components/admin-dashboard/bank-crud/find-all-banks/FindAllBanks";
import FindBank from "./components/admin-dashboard/bank-crud/find-bank/FindBank";
import UpdateBank from "./components/admin-dashboard/bank-crud/update-bank/UpdateBank";
import DeleteBank from "./components/admin-dashboard/bank-crud/delete-bank/DeleteBank";
import FindLedger from "./components/admin-dashboard/bank-crud/find-ledger/FindLedger";
import FindAllLedgers from "./components/admin-dashboard/bank-crud/find-all-ledgers/FindAllLedgers";
import KycRequests from "./components/admin-dashboard/kyc-requests/KycRequests";
import KYC from "./components/user-dashboard/kyc/KYC";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route
          path="/admin-dashboard/user-registration"
          element={<UserRegistration />}
        />
        <Route path="/admin-dashboard/find-user" element={<FindUser />} />
        <Route
          path="/admin-dashboard/find-all-users"
          element={<FindAllUsers />}
        />
        <Route path="/admin-dashboard/delete-user" element={<DeleteUser />} />
        <Route path="/admin-dashboard/update-user" element={<UpdateUser />} />
        <Route path="/admin-dashboard/create-bank" element={<CreateBank />} />
        <Route
          path="/admin-dashboard/find-all-banks"
          element={<FindAllBanks />}
        />
        <Route path="/admin-dashboard/find-bank" element={<FindBank />} />
        <Route path="/admin-dashboard/update-bank" element={<UpdateBank />} />
        <Route path="/admin-dashboard/delete-bank" element={<DeleteBank />} />
        <Route path="/admin-dashboard/find-ledger" element={<FindLedger />} />
        <Route
          path="/admin-dashboard/find-all-ledgers"
          element={<FindAllLedgers />}
        />
        <Route path="/admin-dashboard/kyc-requests" element={<KycRequests />} />
        <Route path="/user-dashboard/kyc" element={<KYC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
