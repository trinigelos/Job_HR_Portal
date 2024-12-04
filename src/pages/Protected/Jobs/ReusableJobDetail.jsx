import React, {useEffect, useState} from "react";
import { formatDate } from "../../../components/components";
import { JobDescription } from "../../../components/components";
import { useParams } from "react-router-dom";
import { getJobPost } from "../CRUD/JobPostService";

export default function ReusableJobDetail({ job, styles }) {
    const { jobId } = useParams(); // Extract jobId from the URL
    const [jobData, setJobData] = useState(job);
    console.log("renderizando")

    // Fetch job details if the job prop is null and there's a jobId in the URL
    useEffect(() => {
        if (!job && jobId) {
            const fetchJobById = async () => {
                try {
                    const fetchedJob = await getJobPost(jobId);
                    setJobData(fetchedJob);
                } catch (error) {
                    console.error("Failed to fetch job details:", error);
                }
            };
            fetchJobById();
        } else if (job) {
            setJobData(job);
        }
    }, [job, jobId]);

    if (!jobData) {
        return null; // Return null or a loading state if job is not available
    }
 // Constructing the Gmail link
 const mailToLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${jobData.contactEmail}&su=${jobData.applicationCode}&body=Estimada Cecilia Menta,%0D%0A%0D%0A Estoy interesado/a en aplicar al trabajo de ${jobData.title}.%0D%0A%0D%0A Adjunto CV y carta de presentación.%0D%0A%0D%0A Saludos Cordiales, %0D%0A[Tu nombre]`;

    

    return (
        <div className={styles.wholeJobDiv}>
            <h2>{jobData.title}</h2>
            <p>{jobData.company}</p>
            <p>
                <strong>Ubicación: </strong>
                {jobData.locationTerm}
            </p>
            <p>
                <strong>Disponibilidad: </strong>
                {jobData.employmentType}
            </p>
            <p>
                <strong>Modalidad: </strong>
                {jobData.employmentStyle}
            </p>
            <p>
                <strong>Descripción: </strong>
                <JobDescription description={job.description} />
            </p>
            {jobData.salaryRange && (
                <p>
                    <strong>Salario: </strong>
                    {job.salaryRange}
                </p>
            )}
            {jobData.contactEmail && (
                <p>
                    <strong>Email de contacto: </strong>
                    {job.contactEmail}
                </p>
               
            )}
            {/* {jobData.applicationCode && (
                  <p>
                  <strong>Codigo Ref. Email: </strong>
              {jobData.applicationCode}
          </p>

            )} */}
            <div className="apply-links">
                
            {jobData.linkedinLink && (
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
                    <p className="Mail-link-div">
                        <a
                            href={mailToLink}
                        target="_blank"
                        className="mailTo-link"
                            rel="noopener noreferrer"
                            >
                        <button >
                           

                                Aplicar 
                           
                                                   
                        </button>
                        <span class="material-symbols-outlined">
mail
</span>
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
