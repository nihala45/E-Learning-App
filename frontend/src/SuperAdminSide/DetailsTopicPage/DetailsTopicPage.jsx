import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailsTopicPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // Example static data - you can replace this with data fetched from an API
  const moduleData = {
    id: moduleId,
    name: 'Introduction to React',
    description:
      'This module covers the basics of React including components, JSX, and rendering.',
    videos: [
      { id: 1, title: 'What is React?', url: '/video/1' },
      { id: 2, title: 'JSX Explained', url: '/video/2' },
    ],
    pdfs: [
      { id: 1, title: 'React Basics PDF', file: '/pdfs/react_basics.pdf' },
      { id: 2, title: 'JSX Cheatsheet', file: '/pdfs/jsx_cheatsheet.pdf' },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-3">{moduleData.name}</h1>
      <p className="text-gray-700 mb-6">{moduleData.description}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
      <div className="space-y-3 mb-8">
        {moduleData.videos.map((video) => (
          <div
            key={video.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm"
          >
            <span>{video.title}</span>
            <button
              onClick={() => navigate(video.url)}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Watch
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">PDFs</h2>
      <div className="space-y-3">
        {moduleData.pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm"
          >
            <span>{pdf.title}</span>
            <a
              href={pdf.file}
              download
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsTopicPage;
