import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailsWithModal() {
  const { chapterId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [pdfName, setPdfName] = useState("");

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVideos([...videos, file]);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && pdfName) {
      setPdfs([...pdfs, { name: pdfName, file }]);
      setPdfName("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Details Page </h1>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Video
        </button>

        {/* Uploaded Videos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Uploaded Videos</h2>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <video
                key={index}
                controls
                className="w-full rounded-lg border"
                src={URL.createObjectURL(video)}
              />
            ))
          ) : (
            <p className="text-gray-500">No videos uploaded.</p>
          )}
        </div>

        {/* Uploaded PDFs */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-700">Uploaded PDFs</h2>
          {pdfs.length > 0 ? (
            pdfs.map((pdf, index) => (
              <div key={index} className="p-3 bg-gray-50 border rounded-lg">
                <p className="font-medium">{pdf.name}</p>
                <p className="text-gray-600 text-sm">{pdf.file.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No PDFs uploaded.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg space-y-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold">Add Content for ID: {id}</h2>

            {/* Video Input */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Upload Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            {/* PDF Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                placeholder="PDF Name"
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
