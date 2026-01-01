import { useState } from 'react';
import api from './api';

function AddCoursePage() {
  const [codee, setCode] = useState('');    // Course code state
  const [titlee, setTitle] = useState('');  // Course title state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to /courses with code and title
      const response = await api.post('/courses', { code : codee, title: titlee });
      console.log('Course added:', response.data);
      // Optionally clear fields or show success...
      setCode(''); 
      setTitle('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course code"
        value={codee}
        onChange={e => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course title"
        value={titlee}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCoursePage;
