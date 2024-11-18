// JobContext.js
import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAllJobPosts } from '../CRUD/JobPostService';
import { SearchContext } from '../../../components/SearchBar/SearchContext';
import { useLocation, matchPath } from 'react-router-dom';
import stylesJobList from './JobList.module.css';
import stylesClientDashboard from '../../Client/JobPreviewClientDashboard.module.css';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobPosts, setJobPosts] = useState([]);
  const { searchTerm, locationTerm } = useContext(SearchContext);

  // Fetch job posts from the backend
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const data = await getAllJobPosts(searchTerm, locationTerm);
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobPosts(sortedData);
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPosts();
  }, [searchTerm, locationTerm]);

  const location = useLocation();

  // Define routes that should not display the admin job preview CSS
  const clientStylePaths = ['/clientdashboard', "/clientdashboard/job/:jobId"];

  const matchesClientPath = clientStylePaths.some((path) =>
    matchPath({ path, exact: true }, location.pathname)
  );

  // Conditional styling with CSS modules according to pathname
  const styles = matchesClientPath ? stylesClientDashboard : stylesJobList;

  return (
    <JobContext.Provider value={{ jobPosts, styles }}>
      {children}
    </JobContext.Provider>
  );
};
