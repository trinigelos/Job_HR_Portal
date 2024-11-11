import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllJobPosts } from './CRUD/JobPostService'; // Import the service function
import "./JobList.css";

const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]);

  // Fetch job posts from the backend
  const fetchJobPosts = async (searchTerm = '', location = '') => {
    try {
      const data = await getAllJobPosts(searchTerm, location); // Use the imported function to fetch data
      // Sort posts by createdAt date in descending order
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setJobPosts(sortedData);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  useEffect(() => {
    fetchJobPosts();
  }, []);

  return (
    <div className="jobs-container">
      {jobPosts.map((job) => (
        <Link to={`/dashboard/job/${job._id}`} key={job._id} className="job-link">
          <div className="job-post-preview">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p><strong>Ubicación:</strong> {job.location}</p>
            <p><strong>Disponibilidad:</strong> {job.employmentType}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobList;
