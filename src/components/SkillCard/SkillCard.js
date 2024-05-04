import React from 'react';
import './style.css';
const SkillCard = ({ skill }) => {
    return (
        <div className="skill-card">
            <div className='skill-name'>
                {skill}
            </div>
        </div>
    );
};

export default SkillCard;