// JobDetail.jsx
import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {formatDate} from "../../components/components";
import {JobDescription} from "../../components/components";
import { getJobPost, deleteJobPost } from './CRUD/JobPostService';
import Modal from "../../components/Modal";

const JobDetail = () => {
    const {jobId} = useParams(); // Extract jobId from the route parameters
    const [job, setJob] = useState(null);

    //to display Modals of messages whenever actions get done
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


  // To display delete confirmation modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const navigate = useNavigate();

    // Fetch job details from the backend
    useEffect(() => {
        const fetchJob = async() => {
            try {
                const data = await getJobPost(jobId);
                setJob(data);
            } catch (error) {
                console.error("Failed to fetch job details", error);
            }
        };
        fetchJob();
    }, [jobId]);

    // Handle the close button to go back without reloading
  const handleClose = () => {
    navigate(-1); 
    };
    

     // Handle delete job post
  const handleDelete = async () => {
    try {
        await deleteJobPost(jobId); 

        closeDeleteConfirmation();
        //display modal that has succesfully deleted the job
        setShowModal(true);
        setModalMessage('Eliminado correctamente');
    } catch (error) {
      console.error("Failed to delete job post", error);
    }
    };


    // closes Modal after deleting
    const closeModal = () => {
        setShowModal(false);
        navigate("/dashboard/jobs"); 

    };

      // Modal to confirm deleting
      const confirmDelete = () => {
        setShowDeleteConfirmation(true); 
      };
    
    //whenever ok gets clicked
    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false); 
      };        
    

    if (!job) {
        return <div>Parece que este trabajo no está disponible, lo sentimos.</div>;
    }

    return (
        <div className="job-detail-container">
            <div className="actionbuttons">
            <Link to={`/dashboard/edit-job/${job._id}`}>
            <button className="edit-job-button">
                        <span class="material-symbols-outlined edit-btn">edit</span>
                    </button>
                </Link>
                <button onClick={handleClose} className="close-job-button">
          <span className="material-symbols-outlined close-btn">close</span>
        </button>
        <button onClick={confirmDelete} className="delete-job-button">
          <span className="material-symbols-outlined trash-btn">delete</span>
                </button>
              
             </div>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>
                <strong>Ubicación:</strong>
                {job.location}</p>
            <p>
                <strong>Disponibilidad:</strong>
                {job.employmentType}</p>
            <p>
                <strong>Modalidad:</strong>
                {job.employmentStyle}</p>
            <p>
                <strong>Descripción:</strong>
                <JobDescription description={job.description}/></p>
            {job.salaryRange && <p>
                <strong>Salario:</strong>
                {job.salaryRange}</p>}
            {job.contactEmail && <p>
                <strong>Email de contacto:</strong>
                {job.contactEmail}</p>}
            {job.linkedinLink && (
                <p>
                    <a
                        href={job.linkedinLink}
                        className="linkedin-link"
                        target="_blank"
                        rel="noopener noreferrer">
                        <strong>LinkedIn</strong>
                    </a>
                </p>
            )}
            <p>
                <strong>Publicado:</strong>
                {formatDate(job.createdAt)}</p>
            
            {/* Confirm Delete Modal */}
      {showDeleteConfirmation && (
        <Modal
          message="¿Estás seguro de que deseas eliminar este trabajo?"
          onClose={closeDeleteConfirmation}
          actions={
            <>
              <button onClick={handleDelete} className="confirm-delete-button">
                Sí, eliminar
              </button>
              <button onClick={closeDeleteConfirmation} className="cancel-delete-button">
                Cancelar
              </button>
            </>
          }
        />
      )}

      {/* Success Modal */}
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
        </div>
    );
};

export default JobDetail;
