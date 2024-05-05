import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from './FiltersSlice'
import { displaySelected, toggleClass } from './Utils'
import './style.css';


const SingleFilter = ({ filter }) => {
    const [classState, setClassState] = React.useState('drop-down hidden')
    const [selected, setSelected] = React.useState([])
    const [selectorClass, setSelectorClass] = React.useState('selector')
    const [arrowClass, setArrowClass] = React.useState('arrow down')

    const filterState = useSelector((state) => state.filter.value)
    const dispatch = useDispatch()

    return (
        <div className='filter'>
            {filter.textinput === true ? (
                <input className={selectorClass} type="text" placeholder="Enter Company Name" onChange={(e) => {
                    dispatch(setFilter({ 'key': filter.key, 'value': e.target.value }))
                }} />
            ) : (
                <div>
                    <div className={selectorClass}>
                        <div className='selected'>{selected.length > 0 ? displaySelected(selected, setSelected, filter, dispatch, setFilter,) : filter.title}</div>
                        <div className='arr-main' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '1rem' }} onClick={() => {toggleClass(setSelectorClass, setClassState, setArrowClass, classState)}} >
                            <div className='dandi'></div>
                            <div className='arr-box'><i style={{ color: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }} class={arrowClass}></i></div>
                        </div>
                    </div>
                    <div className={classState}>
                        {filter.options.map((option, index) => (
                            <div className='option' onClick={() => {
                                if (!selected.includes(option)) {
                                    if (filter.multiple === true) {
                                        const data = {
                                            'key': filter.key,
                                            'value': [...selected, option]
                                        }
                                        dispatch(setFilter(data))
                                        setSelected([...selected, option])
                                    } else {
                                        setSelected([option])
                                        console.log(option)
                                        const data = {
                                            'key': filter.key,
                                            'value': option
                                        }
                                        dispatch(setFilter(data))
                                        console.log(filterState.min_experience)
                                    }
                                }
                                toggleClass(setSelectorClass, setClassState, setArrowClass, classState)
                            }}>{option}</div>
                        ))}
                    </div>
                    <div className='drop-down hidden no-pos'>
                        {filter.options.map((option, index) => (
                            <div className='option' >{option}</div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default SingleFilter;