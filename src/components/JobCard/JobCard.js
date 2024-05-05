import React from 'react';
import './style.css';
import SkillCard from '../SkillCard/SkillCard';
import { useState } from 'react';
const JobCard = ({ jobInfo }) => {
    const [dClass, setDClass] = useState("d-box hidden")

    const onMouseEnter = () => {
        setDClass("d-box visible")
    }
    const onMouseLeave = () => {
        setDClass("d-box hidden")
    }

    if (jobInfo.minExp === null) {
        jobInfo.minExp = 0
    }
    
    return (
        <div className="job-card">
            <div className='posted-date'>
                <img id='hg' src='hg.png' alt='hg' />
                Posted 2 days ago
            </div>
            <div className='company-logo'>
                <img id='logo' src={jobInfo.logoUrl} alt='company logo' />
                <div className='name-box'>
                    <h3 id='comp-name'>{jobInfo.companyName}</h3>
                    <h3 id='pos'>{jobInfo.jobRole}</h3>
                    <h3 id='loc'>{jobInfo.location}</h3>
                </div>
            </div>
            <div className='salary'>
                <h3 id='est-salary'>Estimated salary:</h3>
                <h3>{jobInfo.salaryCurrencyCode}</h3>
                <h3>
                    {jobInfo.minJdSalary !== null && <> {jobInfo.minJdSalary}-</>}
                    {jobInfo.maxJdSalary}</h3>
                <img src='verified.jpg' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} alt='verified' id='verified' />
            </div>
            <div className='about-box'>
                <h2 id='about-comp'>About company</h2>
                <div className='text-box'>
                    <p>{jobInfo.jobDetailsFromCompany}</p>
                </div>
                <div className='butt-box'>
                    <button id='more'>View Job</button>
                </div>
            </div>
            <div className='skills'>
                <h2>Skills</h2>
                <div className='skills-list'>
                    <SkillCard skill='c++' />
                    <SkillCard skill='python' />
                    <SkillCard skill='aws' />
                </div>
            </div>
            <div className='exp'>
                <h2>Experience</h2>
                <h3 id='years'>{jobInfo.minExp} years</h3>
            </div>
            <button className='btn' id='apply'>Easy apply</button>
            <button className='btn' id='refer'>
                <img class='thumb' src='p1.webp' />
                <img class='thumb' src='p2.webp' />
                unlock referral asks</button>
        </div>
    );
};

export default JobCard;