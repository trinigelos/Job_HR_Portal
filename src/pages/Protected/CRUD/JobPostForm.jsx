import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { postJob } from './JobPostService';
import JobForm from './JobForm';
import { JobContext } from '../Jobs/JobsContext';

const JobPostForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [newJobId, setNewJobId] = useState(null);
  const navigate = useNavigate();
  const { fetchJobPosts } = useContext(JobContext);


  // Define initial state for the form
  const initialState = {
    title: '',
    company: '',
    applicationCode: '',
    locationTerm: '',
    category: '',
    employmentType: '',
    employmentStyle: '',
    description: '',
    requirements: '',
    salaryRange: '',
    contactEmail: 'cmentaseleccion@gmail.com',
    linkedinLink: '',
  };

  const [jobData, setJobData] = useState(initialState);

   // Function to remove accents and convert text to uppercase
   const normalizeAndUppercase = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  };

  // Handle form submission for creating a job post
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Use service function to post a new job
      const createdJob = await postJob(jobData);
      setShowModal(true);
      setModalMessage('Publicado correctamente.');
      setNewJobId(createdJob._id); // Save the ID of the new job
      fetchJobPosts()

      // Reset the form to its initial state
      setJobData(initialState);
    } catch (error) {
      setShowModal(true);
      setModalMessage('No fue posible publicarlo, intente nuevamente.');
    }
  };

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

   // Apply normalization and uppercase to the title and locationTerm fields
   if (name === 'title' || name === 'locationTerm') {
    setJobData({ ...jobData, [name]: normalizeAndUppercase(value) });
  } else {
    setJobData({ ...jobData, [name]: value });
  }
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
      <div className='prediv-postform'></div>
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
