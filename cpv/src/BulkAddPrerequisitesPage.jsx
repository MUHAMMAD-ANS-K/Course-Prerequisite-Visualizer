import React, { useState } from 'react';
import api from './api';

function BulkAddPrerequisitesPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState('');

  const handleBulkAdd = async (e) => {
    e.preventDefault();
    try {
      // Parse input JSON (expecting array of objects like {course: "...", prereqs: ["..."]})
      const data = JSON.parse(jsonInput);
      // POST to /prerequisites/bulk with the parsed data
      const response = await api.post('/prerequisites/bulk', data);
      console.log('Bulk add response:', response.data);
      setResult('Added successfully');
      setJsonInput('');
    } catch (error) {
      console.error('Error in bulk add:', error);
      setResult('Error adding prerequisites');
    }
  };

  return (
    <form onSubmit={handleBulkAdd}>
      <textarea
        placeholder='JSON list of { course, prereqs }'
        value={jsonInput}
        onChange={e => setJsonInput(e.target.value)}
        rows={6}
      />
      <button type="submit">Add Prerequisites</button>
      <p>{result}</p>
    </form>
  );
}

export default BulkAddPrerequisitesPage;
