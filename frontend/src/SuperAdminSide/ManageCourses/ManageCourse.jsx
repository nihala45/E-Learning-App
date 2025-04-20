import React, { useEffect, useState } from 'react';
import api from '../../api';

const ManageCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [topicsList, setTopicList] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    topics: '',
    amount: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = async () => {
    try {
      const response = await api.get('/superadmin_app/admin/topiclist/');
      setTopicList(response.data); // Set topics list
      setShowModal(true); // Open modal
    } catch (error) {
      console.error('Failed to fetch topics', error);
      alert('Could not fetch topics');
    }
  };

  const closeModal = () => {
    setFormData({
      name: '',
      description: '',
      amount: '',
      duration: '',
      topics: '',
    });
    setSelectedTopics([]);
    setShowModal(false);
  };

  const createCourse = async (e) => {
    e.preventDefault();
    const { name, description, amount, duration } = formData;

    if (name && description && selectedTopics.length && amount && duration) {
      try {
        const response = await api.post('/superadmin_app/admin/courselist/', {
          name,
          description,
          topics: selectedTopics,
          amount,
          duration,
        });

        if (response.status === 201) {
          alert('Course created successfully');
          closeModal();
        }
      } catch (error) {
        console.error('Error creating course:', error);
        alert(error.response?.data?.error || 'Failed to create course');
      }
    } else {
      alert('Please fill all fields');
    }
  };


  const fetchCourse = async () => {
    try{
      const response = await api.get('/superadmin_app/admin/courselist/');
      if (response.status === 200){
        setCourses(response.data);
        console.log('Course fetched:', response.data);
      }
    }catch(error){
      console.log('Error fetching course:', error)
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Topics</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Duration</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
          <tr key={course.id}>
            <td className="py-2 px-4 border">{course.name}</td>
            <td className="py-2 px-4 border">{course.description}</td>
            <td className="py-2 px-4 border">{course.topics}</td>
            <td className="py-2 px-4 border">{course.amount}</td>
            <td className="py-2 px-4 border">{course.duration}</td>
          </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={openModal}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow"
      >
        Create Course
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create Course</h2>
            <form className="space-y-4" onSubmit={createCourse}>
              <input
                type="text"
                name="name"
                placeholder="Course Name"
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

              <select
                name="topics"
                multiple
                value={selectedTopics}
                onChange={(e) => {
                  const options = Array.from(
                    e.target.selectedOptions,
                    (option) => Number(option.value)
                  );
                  setSelectedTopics(options);
                }}
                className="w-full px-4 py-2 border rounded"
                required
              >
                {topicsList.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
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
