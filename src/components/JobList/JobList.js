import React from 'react';
import JobCard from '../JobCard/JobCard';
import { useState } from 'react';
import './JobList.css';
const JobList = () => {
  const [jobs, setJobs] = useState([{}]);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 6,
    "offset": 0
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };
  const resp = fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const { jdList } = JSON.parse(result);
      setJobs(jdList)
    })
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });

  return (
    <div className='job-list'>
      {jobs.map((job, index) => (
        <JobCard key={index} jobInfo={job} />
      ))}
    </div>
  );
};

export default JobList;