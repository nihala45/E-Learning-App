import React, { useEffect, useState } from 'react';
import api from '../../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../token';

const ManageCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const openModal = () => setShowModal(true);
  const [topics, setTopics] = useState([])

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

    console.log('this is nihalaaaaaaa',access_token,"poda pulleee   ottakk food kazhikka")
    console.log('this is shirinnnnnnnnn',refresh_token)

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

  const fetchTopics = async() => {
    try{
      const response = await api.get('/superadmin_app/admin/topiclist/');
      if(response.status === 200){
        setTopics(response.data)
        console.log('Topics fetched:', adminList)
      }
    }catch{
      console.error('Error fetching topics:',error);
    }
  }

  useEffect(() => {
    fetchTopics();
  }, [])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Topics</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">No</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>

        {topics.map((topic,index) =>(
          <tr key={topic.id}> 
            <td className="py-2 px-4 border">{index+1}</td>
            <td className="py-2 px-4 border">{topic.name}</td>
            <td className="py-2 px-4 border">{topic.description}</td>
            <td className="py-2 px-4 border"><button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow'>Delete</button> <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow'>Edit</button></td>
            
          </tr>
        ))}

        </tbody>
      </table>

      <button
        onClick={openModal}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow"
      >
        Create Topic
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create Topic</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Topic Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              ></textarea>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createTopic}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
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
