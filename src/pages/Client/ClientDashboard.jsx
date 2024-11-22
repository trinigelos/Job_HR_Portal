import React, { useContext, useState } from 'react';
import { JobContext } from '../Protected/Jobs/JobsContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import JobPreview from '../Protected/Jobs/JobPreview';
import ReusableJobDetail from '../Protected/Jobs/ReusableJobDetail';
import "./ClientDashboard.css";
import foto1 from "./logoCeciliaMenta.png";

const ClientDashboard = () => {
  const { jobPosts, styles } = useContext(JobContext);
  const [selectedJob, setSelectedJob] = useState(null); // State to track selected job



  return (
    <div className='client-dashboard-div'>
      <div className='navbar'>
      <img src={foto1} alt="" />
      </div>
      <div className="searchbar-div-client">
      <h2> Encuentra tu próximo trabajo</h2>

        <SearchBar />
      </div>

      <div className="main-container-columns-div">
        <div className="job-preview-container-div">
          <div className={styles.jobsContainer}>
          {jobPosts.length > 0 ? (
              jobPosts.map((job) => (
                <div
                  key={job._id}
                  className={styles.jobLink}
                  onClick={() => setSelectedJob(job)} // Set selected job when clicked
                >
                  <JobPreview job={job} styles={styles} />
                </div>
              ))
            ) : (
              <div className={styles.noJobsMessage}>
                  <p className='selecciona-trabajo'> No hemos encontrado un trabajo con ese titulo, intenta nuevamente.
                  </p> 
                </div>
            )}
        
          </div>
        </div>
        <div className="job-details-container-div">
          {selectedJob ? (
            <ReusableJobDetail job={selectedJob} styles={styles} />
          ) : (
            <p className='selecciona-trabajo'>Selecciona un trabajo para verlo aqui.</p>
          )}
        </div>
  
      </div>
    </div>
  );
};

export default ClientDashboard;
