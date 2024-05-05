import React from 'react';
import JobCard from '../JobCard/JobCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './JobList.css';
import { ClipLoader } from 'react-spinners';
import Filters from '../Filters/Filters';

import {refreshListing, filterJobs } from './Utils';

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Filtered jobs
  const [fetchedJobs, setFetchedJobs] = useState([]); // All jobs
  const [params, setParams] = useState([24, 0]); // Limit and offset
  const filterState = useSelector((state) => state.filter.value) // Filter values

  useEffect(() => {
    refreshListing(fetchedJobs, setFetchedJobs, params);
  }, [params]);

  useEffect(() => {
    filterJobs(setJobs, fetchedJobs, filterState);
  }, [filterState, fetchedJobs]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight + 200 >=
        document.body.offsetHeight) {
           // Params will be updated when the user scrolls to the bottom of the page
          setParams([params[0], params[0] + params[1]]);
      }
    }
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <Filters></Filters>
      <div className='job-list'>
      {jobs.length > 0 && jobs.map((job, index) => (
        <JobCard key={index} jobInfo={job} />
      ))}
      {jobs.length == 0 && <div>
        <h1>No results yet!</h1>
        </div>}
    </div>
    </div>
  );
};

export default JobList;