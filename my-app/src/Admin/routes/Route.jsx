
// Import Components
import Parent from "../../Admin/Parent";
import EmployeeTarget from "../Components/EmployeeTarget";
import UserCreate from "../Components/UserCreate";
import LeaveManagement from "../Components/LeaveManagement";
import AllEmployees from "../Components/AllEmployees";
import Setting from "../Components/Setting";
import ChangePassword from "../Components/ChangePassword";
import MessagePage from "../Components/MessagePage";
import SelectTarget from "../Components/SelectTarget";
import TargetForm from "../Components/TargetForm";
import ParentEmployee from "../../Employee/ParentEmployee";
import MyDetails from "../../Employee/Components/MyDetails";
import Leaderboard from "../../Employee/Components/Leaderboard";
import Mytarget from "../../Employee/Components/Mytarget";
import LeaveTarget from "../../Employee/Components/LeaveTarget";
import LeaveApplicationForm from "../../Employee/Components/LeaveApplicationForm";
import Login from "../../Auth/Login";
import ErrorPage from "../Components/ErrorPage"

import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import EmployeeDetail from "../Components/EmployeeDetail";
import EditArchive from "../Components/EditArchive";
import DashboardPage from "../Components/DashboardPage";
import WelcomePage from "../../Welcome/WelcomePage";
import EditUserForm from "../Components/EditUserForm";
import BalanceCharts from "../../Employee/Components/BalanceCharts";
import StockDetailPage from "../Components/StockDetailPage";
import AddProgressPage from "../Components/AddProgressPage";

function AppRouter() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Parent/>,
      children: [
        {path:"",element:<WelcomePage/>},
        {path:"DashboardPage",element:<DashboardPage/>},
        { path: "employee-target", element: <EmployeeTarget /> },
        { path: "user-create", element: <UserCreate /> },
        { path: "AllEmployees", element: <AllEmployees /> },
        { path: "Setting", element: <Setting /> },
        { path: "Setting/Change-password", element: <ChangePassword /> },
        { path: "Setting/MessagePage", element: <MessagePage /> },
        { path: "employee-target/SelectTarget", element: <SelectTarget /> },
        {path:"employee-target/:id",element:<EditArchive/>},
        { path: "employee-target/SelectTarget/TargetForm/:id", element: <TargetForm /> },
        { path: "leave-management", element: <LeaveManagement /> },
        {path:"AllEmployees/:id",element:<EmployeeDetail/>},
        {path:"edit-employee/:id",element:<EditUserForm/>},
        {path:"StockDetailPage",element:<StockDetailPage/>},
        {path:"AddProgressPage/:id",element:<AddProgressPage/>}
      ],
    },
    {
      path: "/employee",
      element: <ParentEmployee />,
      children: [
        { path:'BalanceCharts',element:<BalanceCharts/>},
        { path: "Leaderboard", element: <Leaderboard /> },
        { path: "mydetails", element: <MyDetails /> },
        { path: "Mytarget", element: <Mytarget /> },
        { path: "leavetarget", element: <LeaveTarget /> },
        { path: "leavetarget/:id", element: <LeaveApplicationForm /> },
      ],
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path: "*",
      element:<ErrorPage/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;

