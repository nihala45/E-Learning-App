import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";


const TopicsPage = () => {
  const { topicId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [showEditModal, setEditModal] = useState(false);
  const [editTopicId, setEditTopicId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate()

  const goToDetailsPage = (chapterId) => {
    navigate(`/DetailsTopicPage/${chapterId}`)
  }
  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setFormData({ title: "", description: "" });
    setShowModal(false);
  };

  const openEditModal = (id) => {
    const chapter = chapters.find(c => c.id === id);
    if (chapter) {
      setFormData({ title: chapter.title, description: chapter.description });
      setEditTopicId(id);               
      setEditModal(true);              
    }
  };

  const closeEditModal = () => {
    setFormData({ title: '', description: '' });
    setEditTopicId(null);
    setEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchChapters = async () => {
    try {
      const response = await api.get("/superadmin_app/admin/chapterlist");
      if (response.status === 200) {
        setChapters(response.data);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const createChapter = async () => {
    const { title, description } = formData;
    if (title && description) {
      try {
        const response = await api.post("/superadmin_app/admin/chapterlist/", {
          topic: topicId,
          title,
          description,
        });

        if (response.status === 201) {
          alert("Chapter created successfully!");
          closeModal();
          fetchChapters();
        }
      } catch (error) {
        console.error("Error creating chapter:", error);
        alert(error.response?.data?.error || "Failed to create chapter");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const editChapter = async () => {
    try {
      const response = await api.put(
        `/superadmin_app/admin/chapterlist/${editTopicId}/`,
        {
          topic: topicId,
          title: formData.title,
          description: formData.description,
        }
      );
      if (response.status === 200 || response.status === 204) {
        alert("Chapter updated successfully");
        closeEditModal();
        fetchChapters();
      }
    } catch (error) {
      console.error("Error editing chapter:", error);
      alert(error.response?.data?.error || "Failed to update chapter");
    }
  };

  const deleteChapter = async (id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        const response = await api.delete(`/superadmin_app/admin/chapterlist/${id}/`);
        if (response.status === 204) {
          alert("Chapter deleted successfully");
          fetchChapters();
        }
      } catch (error) {
        console.error("Error deleting chapter:", error);
        alert("Failed to delete chapter");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Modules</h1>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm"
          >
            <span className="text-lg font-medium">{chapter.title}</span>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" 
              onClick={() => goToDetailsPage(chapter.id)}>
                Details Page
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => openEditModal(chapter.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => deleteChapter(chapter.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-transform hover:scale-105"
          onClick={openModal}
        >
          + Create Topic
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Create Topic
            </h2>
            <form className="space-y-5">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
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
                  onClick={createChapter}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Chapter
            </h2>
            <form className="space-y-5">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
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
                  onClick={editChapter}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;
