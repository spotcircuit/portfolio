import { useState } from 'react';

export default function LeadUploadForm() {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setMessage(`Selected file: ${selectedFile.name}`);
    } else {
      setMessage('Please select a valid CSV file');
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        // Handle CSV file upload
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setMessage(data.message);
      } else if (inputValue) {
        // Handle JSON input
        const leads = JSON.parse(inputValue);
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leads })
        });
        const data = await res.json();
        setMessage(data.message);
      } else {
        setMessage('Please either upload a CSV file or paste JSON data');
      }
    } catch (err) {
      setMessage('Error processing input. Please check your data format.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h3>Upload Lead List</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="csvFile" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Upload CSV File:
        </label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleFileChange}
          style={{ marginBottom: '1rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="jsonInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Or Paste JSON Data:
        </label>
        <textarea
          id="jsonInput"
          rows={10}
          cols={50}
          placeholder='[{"firstName": "John", "lastName": "Doe", "email": "john@example.com", ...}]'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
      </div>

      <button type="submit">Upload Leads</button>
      {message && <p>{message}</p>}
    </form>
  );
}
