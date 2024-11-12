import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllJobPosts } from './CRUD/JobPostService'; // Import the service function
import "./JobList.css";

const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const location = useLocation(); // Helps us access the current location and its state

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

    // Restore scroll position if present in state
    if (location.state?.scrollPosition) {
        window.scrollTo(0, location.state.scrollPosition);
    }
}, [location.state]);

  //handle click whenever a job gets opened
  const handleJobClick = () => {
    // Save the current scroll position in location state before navigating away
    const scrollPosition = window.scrollY;
    window.history.replaceState({ scrollPosition }, ""); // Save in browser's history state
};

  return (
    <div className="jobs-container">
      {jobPosts.map((job) => (
        <Link to={`/dashboard/job/${job._id}`}
          key={job._id}
          className="job-link"
        onClick={handleJobClick}
        >
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
