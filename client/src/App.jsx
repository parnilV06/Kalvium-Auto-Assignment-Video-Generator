import React, { useState } from 'react';
import InputForm from './components/InputForm.jsx';
import Results from './components/Results.jsx';

const App = () => {
  const [formData, setFormData] = useState({
    subject: '',
    lu: '',
    content: ''
  });

  return (
    <div className="app-container">
      <header>
        <h1>Kalvium Assignments Video Generator</h1>
      </header>
      
      <main>
        <InputForm formData={formData} setFormData={setFormData} />
        
        <hr className="divider" />
        
        <Results formData={formData} />
      </main>

      <footer>
        <div className="footer-content">
          <span className="footer-left">Github Repo</span>
          <span className="footer-right">Made by : Parnil Vyawahare</span>
        </div>
      </footer>
    </div>
  );
};

export default App;