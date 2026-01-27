import { useState } from 'react';
import api from './api';
import "./AddCourse.css"

function DeleteCoursePage() {
  const [code, setCode] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/courses/${code}`);
      console.log('Course deleted:', code);
      setCode("");
      document.querySelector(".courseAdd-error").innerHTML = "";
    } 
    catch (error) {
      if(error.response.data.detail)
        document.querySelector(".courseAdd-error").innerHTML = error.response.data.detail[0].msg;
      // setCode("");
    }
  };

  return (
    <div className="course-page">
    <form onSubmit={handleDelete} className="add-course-main">
      <input
        type="text"
        placeholder="Course code to delete"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button type="submit">Delete Course</button>
    </form>
    <div className="courseAdd-error"></div>
    </div>
  );
}

export default DeleteCoursePage;
