// JobDetail.jsx
import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {formatDate} from "../../components/components";
import {JobDescription} from "../../components/components";
import {getJobPost} from './CRUD/JobPostService';

const JobDetail = () => {
    const {jobId} = useParams(); // Extract jobId from the route parameters
    const [job,
        setJob] = useState(null);

    // Fetch job details from the backend
    useEffect(() => {
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

    if (!job) {
        return <div>Loading job details...</div>;
    }

    return (
        <div className="job-detail-container">
            <div className="actionbuttons">
            <Link to={`/dashboard/edit-job/${job._id}`}>
            <button className="edit-job-button">
                        <span class="material-symbols-outlined edit-btn">edit</span>
                    </button>
                </Link>
                <span class="material-symbols-outlined close-btn">close</span>
                <span class="material-symbols-outlined trash-btn">delete</span>
            </div>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>
                <strong>Ubicación:</strong>
                {job.location}</p>
            <p>
                <strong>Disponibilidad:</strong>
                {job.employmentType}</p>
            <p>
                <strong>Modalidad:</strong>
                {job.employmentStyle}</p>
            <p>
                <strong>Descripción:</strong>
                <JobDescription description={job.description}/></p>
            {job.salaryRange && <p>
                <strong>Salario:</strong>
                {job.salaryRange}</p>}
            {job.contactEmail && <p>
                <strong>Email de contacto:</strong>
                {job.contactEmail}</p>}
            {job.linkedinLink && (
                <p>
                    <a
                        href={job.linkedinLink}
                        className="linkedin-link"
                        target="_blank"
                        rel="noopener noreferrer">
                        <strong>LinkedIn</strong>
                    </a>
                </p>
            )}
            <p>
                <strong>Publicado:</strong>
                {formatDate(job.createdAt)}</p>
        </div>
    );
};

export default JobDetail;
