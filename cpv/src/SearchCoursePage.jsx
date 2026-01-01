import { useState } from 'react';
import api from './api';

function SearchCoursePage() {
  const [code, setCode] = useState('');
  const [course, setCourse] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // GET from /courses/{code}
      const response = await api.get(`/courses/${code}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setCourse(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Course code"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button type="submit">Search Course</button>
      </form>
      {course && (
        <div>
          <p><strong>Code:</strong> {course.code}</p>
          <p><strong>Title:</strong> {course.title}</p>
        </div>
      )}
    </div>
  );
}

export default SearchCoursePage;
