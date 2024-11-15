import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { postJob } from './JobPostService';
import JobForm from './JobForm';

const JobPostForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [newJobId, setNewJobId] = useState(null);
  const navigate = useNavigate();

  // Define initial state for the form
  const initialState = {
    title: '',
    company: '',
    location: '',
    category: '',
    employmentType: '',
    employmentStyle: '',
    description: '',
    requirements: '',
    salaryRange: '',
    contactEmail: '',
    linkedinLink: '',
  };

  const [jobData, setJobData] = useState(initialState);

  // Handle form submission for creating a job post
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Use service function to post a new job
      const createdJob = await postJob(jobData);
      setShowModal(true);
      setModalMessage('Publicado correctamente.');
      setNewJobId(createdJob._id); // Save the ID of the new job

      // Reset the form to its initial state
      setJobData(initialState);
    } catch (error) {
      setShowModal(true);
      setModalMessage('No fue posible publicarlo, intente nuevamente.');
    }
  };

  // Handle changes to form inputs
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Close the modal dialog
  const closeModal = () => {
    setShowModal(false);
       // Navigate to the newly created job detail page if newJobId is set
       if (newJobId) {
        navigate(`/dashboard/job/${newJobId}`);
      }
  };

  return (
    <div>
      {/* Render the JobForm component */}
      <JobForm
        jobData={jobData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonLabel="Publicar"
      />
      {/* Render the modal if the showModal state is true */}
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default JobPostForm;
