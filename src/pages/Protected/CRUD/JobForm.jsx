import React from 'react';

const JobForm = ({ jobData, handleChange, handleSubmit, buttonLabel }) => {
  return (
    <div className="job-form-component">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder="Titulo de trabajo"
          required
        />
        <input
          type="text"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          placeholder="Empresa"
          required
        />
        <input
          type="text"
          name="locationTerm"
          value={jobData.locationTerm}
          onChange={handleChange}
          placeholder="Ubicación"
          required
        />
        <input
          type="text"
          name="category"
          value={jobData.category}
          onChange={handleChange}
          placeholder="Palabra Clave, Categoria, Trabajo relacionado, etc"
        />
        <input
          type="text"
          name="applicationCode"
          value={jobData.applicationCode}
          onChange={handleChange}
          placeholder="Codigo de Referecia en Email"
          required
        />
        <select name="employmentType" value={jobData.employmentType} onChange={handleChange}>
          <option value="empty">-</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        <select name="employmentStyle" value={jobData.employmentStyle} onChange={handleChange}>
          <option value="empty">-</option>
          <option value="Presencial">Presencial</option>
          <option value="Remoto">Remoto</option>
          <option value="Hibrida">Híbrida</option>
        </select>
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          name="salaryRange"
          value={jobData.salaryRange}
          onChange={handleChange}
          placeholder="Rango de sueldo"
        />
        <input
          type="email"
          name="contactEmail"
          value={jobData.contactEmail}
          onChange={handleChange}
          placeholder="Email de contacto"
        />
        <input
          type="url"
          name="linkedinLink"
          value={jobData.linkedinLink}
          onChange={handleChange}
          placeholder="LinkedIn Link"
        />
        <button type="submit" className="submit-btn">
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
