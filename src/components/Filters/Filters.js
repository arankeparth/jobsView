import React from 'react';
import './style.css';
import SingleFilter from './SingleFilter';

const Filters = () => {
    // Add your filter logic here
    const RoleFilter = {
        'title': "Roles",
        'options': ['frontend', 'backend', 'ios', 'tech lead','UI', 'UX', 'Project manager', 'Program manager'],
        'multiple': true
    }

    const NumFilter = {
        'title': "Number of Employees",
        'options': ['1-100', '100-1000', '1000-10000'],
        'multiple': false
    }

    const ExpFilter = {
        'title': "Experience",
        'options': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'multiple': false
    
    }

    const LocFilter = {
        'title': "Location",
        'options': ['Remote', 'In-Office', 'Hybrid'],
        'multiple': false
    }

    const MinSalaryFilter = {
        'title': "Minimum Base Pay Salary",
        'options': [10, 20, 30, 40, 50, 60, 70],
        'multiple': false
    }

    const CompName = {
        'textinput': true
    }
    return (
        <div className='filters-box'>
           <SingleFilter filter={RoleFilter}/>
           <SingleFilter filter={NumFilter}/>
           <SingleFilter filter={ExpFilter}/>
           <SingleFilter filter={LocFilter}/>
           <SingleFilter filter={MinSalaryFilter}/>
           <SingleFilter filter={CompName}/>
        </div>
    );
};

export default Filters;