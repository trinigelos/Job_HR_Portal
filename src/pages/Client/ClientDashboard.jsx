import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {JobContext} from '../Protected/Jobs/JobsContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import JobPreview from '../Protected/Jobs/JobPreview';
import ReusableJobDetail from '../Protected/Jobs/ReusableJobDetail';
import "./ClientDashboard.css";
import { getJobPost } from '../Protected/CRUD/JobPostService'; // Import your service to fetch a job by ID


const ClientDashboard = () => {
    const {jobPosts, styles} = useContext(JobContext);
    const [selectedJob, setSelectedJob] = useState(null); // State to track selected job

    const navigate = useNavigate();
    const { id } = useParams(); // Extract job ID from the URL if it exists

      // Fetch the job data based on the URL (if `jobId` is present in the URL)
  useEffect(() => {
        console.log(id)
        // If there's a jobId in the URL, we need to set the selected job
        if (id) {
            // Check if the job exists in jobPosts
            const existingJob = jobPosts.find((job) => job._id === id);
            if (existingJob) {
                setSelectedJob(existingJob);
            } else {
                // If the job isn't in `jobPosts`, fetch it from the backend
                const fetchJobById = async () => {
                    try {
                        const job = await getJobPost(id);
                        setSelectedJob(job);
                    } catch (error) {
                        console.error("Failed to fetch job details from backend:", error);
                    }
                };
                fetchJobById();
            }
        }
    }, [id, jobPosts]);

    // Update the URL whenever `selectedJob` changes and is not null
    useEffect(() => {
      if (selectedJob) {
         // Update the URL to include job ID without reloading the page
            navigate(`/clientdashboard/clientjobs/${selectedJob._id}`, { replace: true });
        }
    }, [selectedJob, navigate]);
  
    return (
        <div className='client-dashboard-div'>
           
            <div className="searchbar-div-client">
                <h2>
                    Encuentra tu próximo trabajo</h2>

                <SearchBar/>
            </div>

            <div className="main-container-columns-div">
                <div className="job-preview-container-div">
                    <div className={styles.jobsContainer}>
                        {jobPosts.length > 0
                            ? (jobPosts.map((job) => (
                                <div key={job._id} className={styles.jobLink} onClick={() => setSelectedJob(job)} // Set selected job when clicked
>                                    <JobPreview job={job} styles={styles}/>
                                </div>
                            )))
                            : (
                                <div className={styles.noJobsMessage}>
                                    <p className='selecciona-trabajo'>
                                        No hemos encontrado un trabajo con ese titulo, intenta nuevamente.
                                    </p>
                                </div>
                            )}

                    </div>
                </div>
                <div className="job-details-container-div">
                    {selectedJob
                        ? (<ReusableJobDetail job={selectedJob} styles={styles} />)
                        : id ? <p className='selecciona-trabajo'>Cargando trabajo...</p> : <p className='selecciona-trabajo'>Selecciona un trabajo para verlo aquí.</p>}
                </div>

            </div>
        </div>
    );
};

export default ClientDashboard;