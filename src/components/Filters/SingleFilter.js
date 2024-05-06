import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from './FiltersSlice'
import { Select, MenuItem, InputLabel, FormControl, Input, TextField } from '@mui/material';

import './style.css';


const SingleFilter = ({ filter }) => {
    const [selected, setSelected] = React.useState([])

    const handleChange = (event) => {
        const value = event.target.value;

        let option;
        if (filter.multiple === true) {
            // If multiple is true, value will will be an array, else it will be a single value
            option = typeof value === 'string' ? value.split(',') : value;
        } else {
            option = value
        }

        const data = {
            'key': filter.key,
            'value': option,
        }
        dispatch(setFilter(data))
        console.log(option)
        setSelected(option)
    }

    const filterState = useSelector((state) => state.filter.value)
    const dispatch = useDispatch()

    return (
        <div className='filter'>
            {filter.textinput === true ? (
                // If the textinput is true, a textfield will be rendered
                <TextField placeholder="Enter Company Name" onChange={(e) => {
                    dispatch(setFilter({ 'key': filter.key, 'value': e.target.value }))
                }}></TextField>

            ) : (
                <div className='filter'>
                    <FormControl fullWidth style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
                        <InputLabel id="demo-simple-select-label">{filter.title}</InputLabel>
                        <Select
                            className='selector'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            multiple={filter.multiple}
                            label={filter.title}
                            value={selected}
                            onChange={handleChange}
                        >
                            {filter.options.map((option, index) => (
                                <MenuItem value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        <div className='main-cross' onClick={() => {
                            if (filter.multiple === true) {
                                setSelected([])
                                dispatch(setFilter({ 'key': filter.key, 'value': [] }))
                            } else {
                                setSelected(null)
                                dispatch(setFilter({ 'key': filter.key, 'value': null }))
                            }
                        }}>&times;</div>
                    </FormControl>
                </div>
            )}

        </div>
    );
};

export default SingleFilter;