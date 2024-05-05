import React from 'react';
import JobCard from '../JobCard/JobCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import './JobList.css';
import { ClipLoader } from 'react-spinners';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [params, setParams] = useState([24, 0]);
  const filterState = useSelector((state) => state.filter.value)

  const refreshListing = () => {
    setIsFetching(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      "limit": params[0],
      "offset": params[1]
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const { jdList } = JSON.parse(result);
        setFetchedJobs([...fetchedJobs, ...jdList]);
        setIsFetching(false);
        console.log(jdList[0])
      })
      .catch((error) => {
        console.error("Error:", error);
        return [];
      });
  }

  const filterJobs = () => {
    let filteredJobs = fetchedJobs.filter(job => {
      const roleFilter = filterState.roles.includes(job.jobRole) || filterState.roles.length === 0;
      const minExpFilter = job.minExp >= filterState.min_experience || filterState.min_experience === null || job.minExp === null;
      const maxExpFilter = job.minExp <= filterState.max_experience || filterState.max_experience === null || job.minExp === null;
      const locationFilter = filterState.location === job.location || filterState.location === null || job.location === null;
      let SalaryFilter = false;
      if (job.minJdSalary === null)
        SalaryFilter = filterState.min_salary <= job.maxJdSalary || filterState.min_salary === null;
      else if (job.maxJdSalary !== null)
        SalaryFilter = filterState.min_salary <= job.minJdSalary || filterState.min_salary === null;
      SalaryFilter = SalaryFilter || (filterState.min_salary === null && filterState.max_salary === null);
      const companyFilter = filterState.company === null || job.companyName.toLowerCase().includes(filterState.company.toLowerCase());

      return roleFilter && minExpFilter && maxExpFilter && locationFilter && SalaryFilter && companyFilter;
    });

    setJobs(filteredJobs);
  }

  useEffect(() => {
    refreshListing();
  }, [params]);

  useEffect(() => {
    filterJobs();
  }, [filterState, fetchedJobs]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight + 200 >=
        document.body.offsetHeight) {
          setParams([params[0], params[0] + params[1]]);
      }
    }
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <div className='job-list'>
      {jobs.length > 0 && jobs.map((job, index) => (
        <JobCard key={index} jobInfo={job} />
      ))}
      {jobs.length == 0 && <div>
        <h1>No results found</h1>
        
        </div>}
    </div>
    </div>
  );
};

export default JobList;