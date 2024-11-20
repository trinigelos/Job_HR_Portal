// JobDetail.jsx
import React, {useState, useEffect, useContext} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import { getJobPost, deleteJobPost } from '../CRUD/JobPostService';
import Modal from "../../../components/Modal";
import "./JobDetail.css"
import ReusableJobDetail from "./ReusableJobDetail";
import { JobContext } from './JobsContext';

const JobDetail = () => {
    const {jobId} = useParams(); // Extract jobId from the route parameters
    const [job, setJob] = useState(null);

    //to display Modals of messages whenever actions get done
    const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const {  styles, fetchJobPosts } = useContext(JobContext);

    const navigate = useNavigate();

    // Fetch job details from the backend
  useEffect(() => {
    console.log("Job ID fetched:", jobId);
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
    navigate("/dashboard/jobs"); 
  };
    

     // Handle delete job post
  const handleDelete = async () => {
    try {
        await deleteJobPost(jobId); 

        closeDeleteConfirmation();
        //display modal that has succesfully deleted the job
        setShowModal(true);
      setModalMessage('Eliminado correctamente');
      fetchJobPosts()
      
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
            <button className="edit-job-button actionbtn">
                        <span class="material-symbols-outlined ">edit</span>
                    </button>
          </Link>

             <button onClick={confirmDelete} className=" actionbtn">
          <span className="material-symbols-outlined ">delete</span>
          </button>
          
                <button onClick={handleClose} className=" actionbtn">
          <span className="material-symbols-outlined ">close</span>
        </button>
     
              
        </div>
        {/* REUSABLE JOB DETAIL COMPONENT GOES HERE:       */}
        <ReusableJobDetail job={job} styles={styles} />
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
