//created merely to apply different styles to JobPreview than in client dashboard
import React, { useContext } from 'react';
import JobPreview from "./JobPreview";
import { JobContext } from './JobsContext';
import "./JobList.module.css"
import { Link } from 'react-router-dom';

const JobList = () => {
  const { jobPosts, styles } = useContext(JobContext);

return (
    <div className={styles.jobsContainer}>
    {jobPosts.map((job) => (
      <Link
        to={`/dashboard/job/${job._id}`} 
        key={job._id}
        className={styles.jobLink}
      >
        <JobPreview job={job} styles={styles} />
      </Link>
    ))}
  </div>
  );
};

export default JobList;
