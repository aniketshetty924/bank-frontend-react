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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard/:userId" element={<AdminDashboard />} />
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} />
        <Route
          path="/admin-dashboard/:userId/user-registration"
          element={<UserRegistration />}
        />
        <Route
          path="/admin-dashboard/:userId/find-user"
          element={<FindUser />}
        />
        <Route
          path="/admin-dashboard/:userId/find-all-users"
          element={<FindAllUsers />}
        />
        <Route
          path="/admin-dashboard/:userId/delete-user"
          element={<DeleteUser />}
        />
        <Route
          path="/admin-dashboard/:userId/update-user"
          element={<UpdateUser />}
        />
        <Route
          path="/admin-dashboard/:userId/create-bank"
          element={<CreateBank />}
        />
        <Route
          path="/admin-dashboard/:userId/find-all-banks"
          element={<FindAllBanks />}
        />
        <Route
          path="/admin-dashboard/:userId/find-bank"
          element={<FindBank />}
        />
        <Route
          path="/admin-dashboard/:userId/update-bank"
          element={<UpdateBank />}
        />
        <Route
          path="/admin-dashboard/:userId/delete-bank"
          element={<DeleteBank />}
        />
        <Route
          path="/admin-dashboard/:userId/find-ledger"
          element={<FindLedger />}
        />
        <Route
          path="/admin-dashboard/:userId/find-all-ledgers"
          element={<FindAllLedgers />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
