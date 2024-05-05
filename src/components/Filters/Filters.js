import React from 'react';
import './style.css';
import SingleFilter from './SingleFilter';

const Filters = () => {
    // Add your filter logic here
    const RoleFilter = {
        'key': 'roles', // This is the key that will be used in the state
        'title': "Roles",
        'options': ['frontend', 'backend', 'ios', 'tech lead','UI', 'UX', 'Project manager', 'Program manager'],
        'multiple': true
    }
    const MinExpFilter = {
        'key': 'min_experience', // This is the key that will be used in the state
        'title': "Min-Experience",
        'options': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'multiple': false
    
    }

    const MaxExpFilter = {
        'key': 'max_experience', // This is the key that will be used in the state
        'title': "Max-Experience",
        'options': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'multiple': false
    
    }

    const LocFilter = {
        'key': 'location', // This is the key that will be used in the state
        'title': "Location",
        'options': ['delhi ncr', 'banglore', 'mumbai', 'chennai'],
        'multiple': false
    }

    const WorkStyle = {
        'key': 'workstyle', // This is the key that will be used in the state
        'title': "Working style",
        'options': ['remote', 'onsite'],
        'multiple': false
    }

    const MinSalaryFilter = {
        'key': 'min_salary', // This is the key that will be used in the state
        'title': "Minimum Base Pay Salary",
        'options': [10, 20, 30, 40, 50, 60, 70],
        'multiple': false
    }

    const CompName = {
        'key': 'company', // This is the key that will be used in the state
        'textinput': true
    }

    const TechStackFilter = {
        'key': 'tech_stack', // This is the key that will be used in the state
        'title': "Tech Stack",
        'options': ['c++', 'python', 'aws', 'react', 'angular', 'nodejs', 'express', 'mongodb', 'sql', 'java', 'c#', 'ruby', 'rails', 'html', 'css', 'javascript', 'typescript', 'graphql', 'apollo', 'rest', 'api', 'redux', 'flux', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'zoom', 'microsoft teams', 'google meet', 'webex', 'skype', 'microsoft office', 'google docs', 'google sheets', 'google slides', 'microsoft word', 'microsoft excel', 'microsoft powerpoint', 'google drive', 'dropbox', 'icloud', 'aws s3', 'aws ec2', 'aws lambda', 'aws rds', 'aws dynamodb', 'aws cognito', 'aws amplify', 'aws cloudfront', 'aws cloudwatch', 'aws cloudformation', 'aws cloudtrail', 'aws route53', 'aws api gateway', 'aws app sync', 'aws xray', 'aws organizations', 'aws service catalog', 'aws systems manager', 'aws trusted advisor', 'aws personal health dashboard', 'aws control tower', 'aws security hub', 'aws artifact', 'aws audit manager', 'aws certificate manager', 'aws cloudhsm', 'aws directory service', 'aws firewall manager', 'aws key management service', 'aws resource access manager', 'aws secrets manager', 'aws security token service', 'aws shield', 'aws waf', 'aws artifact', 'aws chatbot', 'aws codeartifact', 'aws codebuild', 'aws codecommit', 'aws codedeploy', 'aws codepipeline', 'aws codestar', 'aws codeguru'],
        'multiple': true
    }
    return (
        <div className='filters-box'>
           
           <SingleFilter filter={MinExpFilter}/>
           <SingleFilter filter={CompName}/>
           <SingleFilter filter={LocFilter}/>
           <SingleFilter filter={WorkStyle}/>
           <SingleFilter filter={TechStackFilter}/>
           <SingleFilter filter={RoleFilter}/>
           <SingleFilter filter={MinSalaryFilter}/>
          
        </div>
    );
};

export default Filters;