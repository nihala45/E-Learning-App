import { useState } from "react";
import { HomeIcon, ClipboardDocumentListIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../Redux/Features/user/userSlice';

const Subjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/SuperAdminLogin");
  };

  const subjects = [
    { name: 'Maths', description: 'Learn about numbers, equations, and more.' },
    { name: 'Physics', description: 'Explore the laws of nature and the universe.' },
    { name: 'Chemistry', description: 'Discover the elements and their reactions.' },
    { name: 'Biology', description: 'Study life forms and biological processes.' },
    { name: 'English', description: 'Master the art of language and literature.' },
    { name: 'Social Science', description: 'Understand society and human behavior.' },
    { name: 'Hindi', description: 'Explore the Hindi language and culture.' },
    { name: 'Computer Science', description: 'Learn programming and technology.' }
  ];

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const renderSubjectDetails = () => {
    if (selectedSubject) {
      return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800">{selectedSubject.name}</h2>
          <p className="text-gray-600 mt-2">{selectedSubject.description}</p>
        </div>
      );
    }
    return <p className="text-gray-800">Select a subject to view details.</p>;
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-red-400 to-red-500 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-red-400">Success Edge</div>
        <nav className="flex flex-col p-4 space-y-2 flex-1">
          <SidebarItem
            title="Dashboard"
            icon={<HomeIcon className="h-5 w-5" />}
            onClick={() => navigate("/dashboard")}
          />
          <SidebarItem
            title="Courses"
            icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
            onClick={() => navigate("/courses")}
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Subjects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => handleSubjectClick(subject)}
              >
                <div className="text-center text-xl font-semibold text-gray-800">{subject.name}</div>
              </div>
            ))}
          </div>
          {renderSubjectDetails()}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2 rounded-md text-left hover:bg-red-600 text-red-100"
  >
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </button>
);

export default Subjects;
