export const refreshListing = (fetchedJobs, setFetchedJobs, params) => {
    // This function will be called when the page is loaded and when the user scrolls to the bottom of the page
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

    // Fetching data from the API
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const { jdList } = JSON.parse(result);

            // Appending the fetched jobs to the existing list of jobs
            setFetchedJobs([...fetchedJobs, ...jdList]);
            console.log(jdList[0])
        })
        .catch((error) => {
            console.error("Error:", error);
            return [];
        });
}

export const filterJobs = (setJobs, fetchedJobs, filterState) => {
    let filteredJobs = fetchedJobs.filter(job => {
        return getFilters(job, filterState);
    });

    setJobs(filteredJobs);
}

function getFilters(job, filterState) {
    const roleFilter = filterState.roles.includes(job.jobRole) || filterState.roles.length === 0;
    // If the job does not have a minimum experience, it is considered as 0    
    const minExpFilter = job.minExp <= filterState.min_experience || filterState.min_experience === null || job.minExp === null;
    
    const locationFilter = filterState.location === job.location || filterState.location === null || job.location === null;
    
    let SalaryFilter = false;
    // If the job does not have a minimum salary, it is considered as 0
    // If the job does not have a maximum salary, it is considered as infinity
    if (job.minJdSalary === null)
        SalaryFilter = filterState.min_salary <= job.maxJdSalary || filterState.min_salary === null;
    else if (job.maxJdSalary !== null)
        SalaryFilter = filterState.min_salary <= job.minJdSalary || filterState.min_salary === null;
    
    // If the user has not set any salary filter, the filter is considered as true
    SalaryFilter = SalaryFilter || (filterState.min_salary === null && filterState.max_salary === null);
    
    // Checking if the company name contains the filter string 
    const companyFilter = filterState.company === null || job.companyName.toLowerCase().includes(filterState.company.toLowerCase());

    const workStyleFilter = filterState.workstyle === null || job.location === filterState.workstyle || job.location !== "remote" && filterState.workstyle === "onsite";
    console.log(roleFilter, minExpFilter, locationFilter, SalaryFilter, companyFilter, workStyleFilter)
    return roleFilter && minExpFilter && locationFilter && SalaryFilter && companyFilter && workStyleFilter;
}



