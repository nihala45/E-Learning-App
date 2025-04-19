import { useState } from "react";
import {
  UserIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from '../../Redux/Features/user/userSlice'
import ManageUsers from "../ManageUsers/ManageUsers";
import ManageCourse from "../ManageCourses/ManageCourse";
import ManageTopic from "../ManageTopic/ManageTopic";


const SuperAdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/SuperAdminLogin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <h2 className="text-2xl font-semibold text-gray-800">📊 Welcome to the Dashboard</h2>;
      case "admins":
        return <h2 className="text-2xl font-semibold text-gray-800">🧑‍💼 Admins Details</h2>;
      case "users":
        return <ManageUsers/>
      case "course":
        return <ManageCourse/>;
      case 'topics':
        return <ManageTopic/>
      default:
        return <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      <aside className="w-64 bg-gradient-to-b from-red-400 to-red-500 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-red-400">Success Edge</div>
        <nav className="flex flex-col p-4 space-y-2 flex-1">
          <SidebarItem
            title="Dashboard"
            icon={<HomeIcon className="h-5 w-5" />}
            isActive={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            title="Admins"
            icon={<UserIcon className="h-5 w-5" />}
            isActive={activeTab === "admins"}
            onClick={() => setActiveTab("admins")}
          />
          <SidebarItem
            title="Users"
            icon={<UsersIcon className="h-5 w-5" />}
            isActive={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <SidebarItem
            title="Courses"
            icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
            isActive={activeTab === "course"}
            onClick={() => setActiveTab("course")}
          />
          <SidebarItem
            title="Topics"
            icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
            isActive={activeTab === "topics"}
            onClick={() => setActiveTab("topics")}
          />
        </nav>
        
        <div className="p-4 border-t border-red-400">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:text-red-100 transition"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

     
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          {renderContent()}
       
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ title, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-md text-left transition ${
      isActive ? "bg-red-700 text-white" : "hover:bg-red-600 text-red-100"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </button>
);

export default SuperAdminHome;
