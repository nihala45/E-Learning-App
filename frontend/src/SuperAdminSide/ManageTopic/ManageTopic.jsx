import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const ManageCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTopicId, setEditTopicId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [topics, setTopics] = useState([]);

  const navigate = useNavigate();

  const goToTopicPage = (topicId) => {
    navigate(`/TopicPage/${topicId}`);
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setFormData({ name: '', description: '' });
    setShowModal(false);
  };

  const openEditModal = (id) => {
    const topic = topics.find(t => t.id === id);
    if (topic) {
      setFormData({ name: topic.name, description: topic.description });
      setEditTopicId(id);
      setShowEditModal(true);
    }
  };

  const closeEditModal = () => {
    setFormData({ name: '', description: '' });
    setEditTopicId(null);
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createTopic = async () => {
    const { name, description } = formData;
    if (name && description) {
      try {
        const response = await api.post('/superadmin_app/superadmin/createtopic/', {
          name,
          description,
        });
        if (response.status === 201) {
          alert('Topic created successfully');
          closeModal();
          fetchTopics();
        }
      } catch (error) {
        console.error('Error creating topic:', error);
        alert(error.response?.data?.error || 'Failed to create topic');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await api.get('/superadmin_app/admin/topiclist/');
      if (response.status === 200) {
        setTopics(response.data);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const deleteTopic = async (id) => {
    try {
      const response = await api.delete(`/superadmin_app/admin/topiclist/${id}/`);
      if (response.status === 204) {
        setTopics(topics.filter((topic) => topic.id !== id));
      }
    } catch (error) {
      console.error('Error deleting topic:', error);
      alert('The data is not here or failed to delete');
    }
  };

  const editTopic = async () => {
    try {
      const response = await api.put(`/superadmin_app/admin/topiclist/${editTopicId}/`, {
        name: formData.name,
        description: formData.description
      });
      if (response.status === 200 || response.status === 204) {
        alert('Topic updated successfully');
        closeEditModal();
        fetchTopics();
      }
    } catch (error) {
      console.error('Error editing topic:', error);
      alert('The data is not here or failed to edit');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Topics</h1>

      <table className="w-full border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="py-3 px-4 border">No</th>
            <th className="py-3 px-4 border">Name</th>
            <th className="py-3 px-4 border">Description</th>
            <th className="py-3 px-4 border">Action</th>
            <th className="py-3 px-4 border">Section</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic, index) => (
            <tr key={topic.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="py-3 px-4 border">{index + 1}</td>
              <td className="py-3 px-4 border">{topic.name}</td>
              <td className="py-3 px-4 border">{topic.description}</td>
              <td className="py-3 px-4 border flex flex-wrap gap-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-200"
                  onClick={() => deleteTopic(topic.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-200"
                  onClick={() => openEditModal(topic.id)}
                >
                  Edit
                </button>
              </td>
              <td className="py-3 px-4 border">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-200"
                  onClick={() => goToTopicPage(topic.id)}
                >
                  Go to main page
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <button
          onClick={openModal}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-transform hover:scale-105"
        >
          + Create Topic
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Topic</h2>
            <form className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Topic Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createTopic}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Topic</h2>
            <form className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Topic Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editTopic}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourse;
