import React from 'react';
import './SelectBar.css';
import { useState } from 'react';

const SelectBar = () => {

    const [selected, setSelected] = useState('Study');

    return (
        <div className='select-bar'>
            <div className='selector' style={{ borderBottom: selected === 'Study' ? '2px solid rgb(6, 40, 110)' : '2px solid white', color: selected === 'Study' ? '#06286E' : '#696671' }} onClick={() => setSelected('Study')}>Study</div>
            <div className='selector' style={{ borderBottom: selected === 'Quiz' ? '2px solid rgb(6, 40, 110)' : '2px solid white', color: selected === 'Quiz' ? '#06286E' : '#696671' }} onClick={() => setSelected('Quiz')}>Quiz</div>
            <div className='selector' style={{ borderBottom: selected === 'Test' ? '2px solid rgb(6, 40, 110)' : '2px solid white', color: selected === 'Test' ? '#06286E' : '#696671' }} onClick={() => setSelected('Test')}>Test</div>
            <div className='selector' style={{ borderBottom: selected === 'Game' ? '2px solid rgb(6, 40, 110)' : '2px solid white', color: selected === 'Game' ? '#06286E' : '#696671' }} onClick={() => setSelected('Game')}>Game</div>
            <div className='selector' style={{ borderBottom: selected === 'Others' ? '2px solid rgb(6, 40, 110)' : '2px solid white', color: selected === 'Others' ? '#06286E' : '#696671' }} onClick={() => setSelected('Others')}>Others</div>
        </div>
    );
};

export default SelectBar;