import React from "react";
import { formatDate } from "../../../components/components";
import { JobDescription } from "../../../components/components";

export default function ReusableJobDetail({ job, styles }) {
    if (!job) {
        return null; // Return null or a loading state if job is not available
    }
 // Constructing the Gmail link
 const mailToLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${job.contactEmail}&su=${job.applicationCode}&body=Estimada Cecilia Menta,%0D%0A%0D%0A Estoy interesado/a en aplicar al trabajo de ${job.title}.%0D%0A%0D%0A Adjunto CV y carta de presentación.%0D%0A%0D%0A Saludos Cordiales, %0D%0A[Tu nombre]`;

    

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
            {job.applicationCode && (
                  <p>
                  <strong>Codigo Ref. Email: </strong>
              {job.applicationCode}
          </p>

            )}
            <div className="apply-links">
                
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
                        <a
                            href={mailToLink}
                        target="_blank"
                        className="mailTo-link"
                            rel="noopener noreferrer"
                            >
                        <button >
                            <strong>

                            Gmail
                            </strong>
                        </button>
                        </a>
                    </p>
           </div>
            <p>
                <strong>Publicado: </strong>
                {formatDate(job.createdAt)}
            </p>
        </div>
    );
}
