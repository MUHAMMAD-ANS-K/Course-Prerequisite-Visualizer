import { useState } from 'react';
import api from './api';

function DeleteCoursePage() {
  const [code, setCode] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // DELETE to /courses/{code}
      await api.delete(`/courses/${code}`);
      console.log('Course deleted:', code);
      setCode('');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="text"
        placeholder="Course code to delete"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button type="submit">Delete Course</button>
    </form>
  );
}

export default DeleteCoursePage;
