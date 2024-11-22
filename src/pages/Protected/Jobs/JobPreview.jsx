import React, { useContext } from "react";
import { JobContext } from "./JobsContext";
import { formatDate } from "../../../components/components";


export default function JobPreview({job}) {
    const { styles } = useContext(JobContext);

  

    return (
                <div className={styles.jobPostPreview}>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>
                            <strong>Ubicación: </strong>
                            {job.locationTerm}</p>
                        <p>
                            <strong>Disponibilidad: </strong>
                {job.employmentType}</p>
            
                <p>
                <strong>Publicado: </strong>
                {formatDate(job.createdAt)}
            </p>
                       
                    </div>
            
    )
}
