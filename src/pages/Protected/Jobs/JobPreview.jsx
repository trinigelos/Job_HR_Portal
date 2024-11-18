import React, { useContext } from "react";
import { JobContext } from "./JobsContext";
import {JobDescription} from "../../../components/components";

export default function JobPreview({job}) {
    const { styles } = useContext(JobContext);

  

    return (
                <div className={styles.jobPostPreview}>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>
                            <strong>Ubicación: </strong>
                            {job.location}</p>
                        <p>
                            <strong>Disponibilidad: </strong>
                            {job.employmentType}</p>
                        <p>
                            <strong>Descripción:
                            </strong>
                            <JobDescription
                                description={job
                                .description
                                .slice(0, 300)}/>...</p>
                    </div>
            
    )
}
