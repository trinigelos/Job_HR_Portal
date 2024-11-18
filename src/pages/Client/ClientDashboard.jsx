import React, { useContext, useState } from 'react';
import { JobContext } from '../Protected/Jobs/JobsContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import JobPreview from '../Protected/Jobs/JobPreview';
import ReusableJobDetail from '../Protected/Jobs/ReusableJobDetail';
import "./ClientDashboard.css";

const ClientDashboard = () => {
  const { jobPosts, styles } = useContext(JobContext);
  const [selectedJob, setSelectedJob] = useState(null); // State to track selected job

  return (
    <div className='client-dashboard-div'>
      <div className='navbar'></div>
      <div className="searchbar-div-client">
        <SearchBar />
      </div>

      <div className="main-container-columns-div">
        <div className="job-preview-container-div">
          <div className={styles.jobsContainer}>
            {jobPosts.map((job) => (
              <div
                key={job._id}
                className={styles.jobLink}
                onClick={() => setSelectedJob(job)} // Set selected job when clicked
              >
                <JobPreview job={job} styles={styles} />
              </div>
            ))}
          </div>
        </div>
        <div className="job-details-container-div">
          {selectedJob ? (
            <ReusableJobDetail job={selectedJob} styles={styles} />
          ) : (
            <p>Select a job to see details here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;