import React, { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    department: 'EXTC',
    clothingCoverage: 100,
    isSleeveless: false
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://aegis-x-backend-x6pr.onrender.com', formData);
      setResult(res.data.data);
    } catch (err) {
      alert("Policy Violation Detected!");
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1>Aegis-X: Policy Enforcement Dashboard</h1>
      <p>"To nurture the Joy of Excellence in a world of High Technology"</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', background: '#1e293b', padding: '20px', borderRadius: '8px' }}>
        <input 
          type="text" placeholder="Student Name" 
          onChange={(e) => setFormData({...formData, studentName: e.target.value})}
          style={{ padding: '10px' }} required
        />
        
        <select onChange={(e) => setFormData({...formData, department: e.target.value})} style={{ padding: '10px' }}>
          <option value="EXTC">EXTC (Signal Processing)</option>
          <option value="IT">IT</option>
          <option value="COMPS">Computer Science</option>
        </select>

        <label>Body Coverage %: {formData.clothingCoverage}%</label>
        <input 
          type="range" min="0" max="100" 
          value={formData.clothingCoverage}
          onChange={(e) => setFormData({...formData, clothingCoverage: e.target.value})}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            onChange={(e) => setFormData({...formData, isSleeveless: e.target.checked})}
          /> 
          Is wearing Sleeveless? (STRICTLY NOT ALLOWED)
        </label>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}>
          APPLY PRACTICAL LAW
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #3b82f6', borderRadius: '8px' }}>
          <h2>Evaluation Result:</h2>
          <p>Student: {result.studentName}</p>
          <p>Safety Probability: {result.safetyProbability}%</p>
          {result.safetyProbability === 0 ? (
            <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={48} /> 
              <strong>CRITICAL DANGER: Violation of Uniform Rule. High risk of bullying/molestation.</strong>
            </div>
          ) : (
            <div style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={48} />
              <strong>SAFE: Compliance with Saudi Arabian Standards achieved.</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;