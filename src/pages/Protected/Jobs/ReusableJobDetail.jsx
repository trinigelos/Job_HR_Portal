import React from "react";
import { formatDate } from "../../../components/components";
import { JobDescription } from "../../../components/components";

export default function ReusableJobDetail({ job, styles }) {
    if (!job) {
        return null; // Return null or a loading state if job is not available
    }

    return (
        <div className={styles.wholeJobDiv}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>
                <strong>Ubicación: </strong>
                {job.locationTerm}
            </p>
            <p>
                <strong>Disponibilidad: </strong>
                {job.employmentType}
            </p>
            <p>
                <strong>Modalidad: </strong>
                {job.employmentStyle}
            </p>
            <p>
                <strong>Descripción: </strong>
                <JobDescription description={job.description} />
            </p>
            {job.salaryRange && (
                <p>
                    <strong>Salario: </strong>
                    {job.salaryRange}
                </p>
            )}
            {job.contactEmail && (
                <p>
                    <strong>Email de contacto: </strong>
                    {job.contactEmail}
                </p>
            )}
            {job.linkedinLink && (
                <p>
                    <a
                        href={job.linkedinLink}
                        className="linkedin-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong>LinkedIn</strong>
                    </a>
                </p>
            )}
            <p>
                <strong>Publicado: </strong>
                {formatDate(job.createdAt)}
            </p>
        </div>
    );
}
