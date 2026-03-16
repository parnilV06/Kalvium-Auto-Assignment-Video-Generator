import React from 'react';

const InputForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="input-form">
      <div>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Backend Development"
        />
      </div>

      <div>
        <label htmlFor="lu">Learning Unit</label>
        <input
          type="text"
          id="lu"
          name="lu"
          value={formData.lu}
          onChange={handleChange}
          placeholder="e.g. LU14"
        />
      </div>

      <div>
        <label htmlFor="content">Assignment Details</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Describe what you implemented..."
          rows="5"
        />
      </div>
    </div>
  );
};

export default InputForm;
