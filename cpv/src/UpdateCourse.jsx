import { useState } from 'react';
import api from './api';

function UpdateCoursePage() {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // PUT to /courses/{code} with new title
      const response = await api.put(`/courses/${code}`, { title });
      console.log('Course updated:', response.data);
      setCode('');
      setTitle('');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Existing course code"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="New course title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Update Course</button>
    </form>
  );
}

export default UpdateCoursePage;
