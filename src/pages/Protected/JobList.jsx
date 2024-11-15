import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllJobPosts } from './CRUD/JobPostService'; 
import "./JobList.css";
import { SearchContext } from "../../components/SearchBar/SearchContext";
import { JobDescription } from "../../components/components";

const JobList = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const { searchTerm, location } = useContext(SearchContext); 


 // Fetch job posts from the backend
 useEffect(() => {
  const fetchJobPosts = async () => {
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

  fetchJobPosts();
}, [searchTerm, location]);


  return (
    <div className="jobs-container">
      {jobPosts.map((job) => (
        <Link to={`/dashboard/job/${job._id}`}
          key={job._id}
          className="job-link"
        >
          <div className="job-post-preview">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p><strong>Ubicación:</strong> {job.location}</p>
            <p><strong>Disponibilidad:</strong> {job.employmentType}</p>
            <p><strong>Descripción: </strong>          <JobDescription description={job.description.slice(0,300)}/></p>
                 
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobList;
