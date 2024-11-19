import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { getJobPost, updateJobPost } from './JobPostService';
import JobForm from './JobForm';
import "./JobForms.css"
import { JobContext } from '../Jobs/JobsContext';


const JobEditForm = () => {
  const { jobId } = useParams(); // Get jobId from the URL parameters
  const [jobData, setJobData] = useState(null); // State to store the job details to be edited
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State to store modal message
  const navigate = useNavigate();
  const { fetchJobPosts } = useContext(JobContext);


  // Fetch job details to prefill the form when component mounts
  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const data = await getJobPost(jobId); // Fetch the specific job post details using its ID
          setJobData(data); // Set the fetched data in the state to prefill the form
        } catch (error) {
          console.error('Failed to fetch job details', error);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  // Handle form submission for updating a job post
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateJobPost(jobId, jobData); // Update the job post using the service
      setShowModal(true);
      setModalMessage('Actualizado correctamente.');
    } catch (error) {
      setShowModal(true);
      setModalMessage('No fue posible actualizar, intente nuevamente.');
    }
  };

  // Handle changes to form inputs and update the job data in state
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Close the modal dialog
  const closeModal = () => {
    fetchJobPosts()
     setShowModal(false);
    navigate(`/dashboard/job/${jobId}`)
  };

  // Show a loading message if the job data has not been fetched yet
  if (!jobData) return <div>Loading...</div>;

  const handleUndo = () => {
    navigate(`/dashboard/job/${jobId}`)
 }

  // Render the form and modal component
  return (
    <div>
      <div className="actionbutton">
      <span className="material-icons actionbtn" onClick={handleUndo} >undo</span>

      </div>
      <JobForm
        jobData={jobData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonLabel="Actualizar"
      />
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default JobEditForm;
