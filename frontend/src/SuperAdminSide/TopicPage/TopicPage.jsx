import React from 'react';
import { useNavigate } from 'react-router-dom';

const modules = [
  { id: 1, name: 'Introduction to React' },
  { id: 2, name: 'JSX and Components' },
  { id: 3, name: 'State and Props' },
];

const TopicsPage = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log('Edit module:', id);
    
  };

  const handleDelete = (id) => {
    console.log('Delete module:', id);
   
  };

  const handleViewTopics = (id) => {
    navigate(`/module/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Modules</h1>
      <div className="space-y-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm"
          >
            <span className="text-lg font-medium">{module.name}</span>
            <div className="flex gap-3">
              <button
                onClick={() => handleViewTopics(module.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View Topics
              </button>
              <button
                onClick={() => handleEdit(module.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(module.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
