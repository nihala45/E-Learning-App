import React, { useState } from 'react';

const Chapters = () => {
  // Sample chapters data
  const chapters = [
    { id: 1, title: 'Introduction to React', description: 'Learn the basics of React, components, and JSX.' },
    { id: 2, title: 'State and Props', description: 'Understand how state and props work in React components.' },
    { id: 3, title: 'React Lifecycle Methods', description: 'Learn about the lifecycle of a React component.' },
    { id: 4, title: 'Hooks in React', description: 'Explore React Hooks, including useState and useEffect.' },
    { id: 5, title: 'React Router', description: 'Learn how to use React Router for navigation in React apps.' },
    { id: 6, title: 'Context API', description: 'Understand the Context API for managing global state in React.' },
    { id: 7, title: 'Redux in React', description: 'Learn how to manage complex state with Redux in React apps.' },
    // Add more chapters as needed
  ];

  // State to manage the selected chapter
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Handle click to show details of a chapter
  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Chapters</h1>

      {/* Display the list of chapters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleChapterClick(chapter)}
          >
            <h3 className="text-xl font-semibold text-gray-800">{chapter.title}</h3>
            <p className="text-gray-600 mt-2">{chapter.description}</p>
          </div>
        ))}
      </div>

      {/* Display the selected chapter's details */}
      {selectedChapter && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800">{selectedChapter.title}</h2>
          <p className="text-gray-600 mt-4">{selectedChapter.description}</p>
        </div>
      )}
    </div>
  );
};

export default Chapters;
