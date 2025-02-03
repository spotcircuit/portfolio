import { useState } from 'react';
import LeadUploadForm from '../components/LeadUploadForm';

export default function Dashboard() {
  const [status, setStatus] = useState(null);

  const triggerProcessing = async () => {
    const res = await fetch('/api/process-leads', { method: 'POST' });
    const data = await res.json();
    setStatus(data);
  };

  const checkStatus = async () => {
    const res = await fetch('/api/status');
    const data = await res.json();
    setStatus(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lead-to-Video Email Dashboard</h1>
      <p>Upload your lead list (JSON format expected) and trigger processing.</p>
      
      <LeadUploadForm />

      <div style={{ marginTop: '2rem' }}>
        <button onClick={triggerProcessing}>Process Leads</button>
        <button onClick={checkStatus} style={{ marginLeft: '1rem' }}>
          Check Status
        </button>
      </div>

      {status && (
        <div style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>
          <h3>Status:</h3>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
