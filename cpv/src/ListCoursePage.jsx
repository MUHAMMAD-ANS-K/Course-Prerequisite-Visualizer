import { useState, useEffect } from 'react';
import api from './api';

function ListCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses on component mount
    async function fetchCourses() {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h3>All Courses</h3>
      {courses.map(course => (
        <div key={course.code}>
          {course.code} - {course.title}
        </div>
      ))}
    </div>
  );
}

export default ListCoursesPage;
