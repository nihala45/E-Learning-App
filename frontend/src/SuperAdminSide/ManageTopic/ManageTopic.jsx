import React, { useEffect, useState } from 'react';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../token';

const ManageCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditMoal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [topics, setTopics] = useState([]);

  const openModal = () => setShowModal(true);

  

  const closeModal = () => {
    setFormData({ name: '', description: '' });
    setShowModal(false);
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;        
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createTopic = async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    const refresh_token = localStorage.getItem(REFRESH_TOKEN);

    console.log('this is nihalaaaaaaa', access_token, "poda pulleee   ottakk food kazhikka");
    console.log('this is shirinnnnnnnnn', refresh_token);

    const { name, description } = formData;
    if (name && description) {
      try {
        const response = await api.post('/superadmin_app/superadmin/createtopic/', {
          name: name, 
          description: description,
        });

        if (response.status === 201) {
          alert('Topic created successfully');
          closeModal();
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
        console.log('Topics fetched:', response.data);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const deleteTopic = async (id) => {
    try{
      const response = await api.delete(`/superadmin_app/admin/topiclist/${id}/`);
      if(response.status === 204){
        console.log('the data is delete propely')
        setTopics(topics.filter((topic) => topic.id !== id))
      }
    }catch{
      console.error('Error deleting topic:', error);
      alert('The data is not here or failed to delete');
    }
  }

  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Topics</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden mb-6 shadow-md divide-y divide-gray-200">
        <thead className="bg-gray-200 text-left text-gray-700 uppercase text-sm">
          <tr>
            <th className="py-2 px-4 border">No</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic, index) => (
            <tr key={topic.id}> 
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{topic.name}</td>
              <td className="py-2 px-4 border">{topic.description}</td>
              <td className="py-2 px-4 border">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md mr-2" 
                onClick={() => deleteTopic(topic.id)}>
                  Delete
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
      >
        Create Topic
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Topic</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Topic Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createTopic}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-transform hover:scale-105"
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
