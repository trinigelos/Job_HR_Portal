import axios from 'axios';
import * as USER_HELPERS from '../../../utils/userToken';

const jobService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/jobposts`, 
});

// Helper function to get Authorization header
const getAuthHeader = () => {
  const token = USER_HELPERS.getUserToken();
  return token ? { Authorization: token } : {};
};

// Function to create a new job post
export const postJob = (jobData) => {
  return jobService
    .post('/', jobData, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error creating job post:', error);
      throw error;
    });
};

// Function to get a specific job post by ID
export const getJobPost = (jobId) => {
  return jobService
    .get(`/${jobId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching job post:', error);
      throw error;
    });
};

// Function to update an existing job post
export const updateJobPost = (jobId, updatedJobData) => {
  return jobService
    .put(`/${jobId}`, updatedJobData, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error updating job:', error);
      throw error;
    });
};

// Function to delete a job post
export const deleteJobPost = (jobId) => {
  return jobService
    .delete(`/${jobId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error deleting job post:', error);
      throw error;
    });
};

// Function to restore a deleted job post
export const restoreJobPost = (jobId) => {
  return jobService
    .post(`/restore/${jobId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error restoring job post:', error);
      throw error;
    });
};

// Function to fetch all job posts
export const getAllJobPosts = (searchTerm = '', locationTerm = '') => {
  return jobService
    .get('/', {
      params: { searchTerm, locationTerm }, // Use query params for filtering
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching all job posts:', error);
      throw error;
    });
};
