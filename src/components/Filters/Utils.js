export const toggleClass = (setSelectorClass, setClassState, setArrowClass, classState) => {
    if (classState === 'drop-down hidden') {
        setSelectorClass('selector active')
        setClassState('drop-down visible')
        setArrowClass('arrow up')
    } else {
        setClassState('drop-down hidden')
        setSelectorClass('selector')
        setArrowClass('arrow down')
    }
}

export const displaySelected = (selected, setSelected, filter, dispatch, setFilter ) => {
    return (
        <>
            {selected.map((item) => {
                return (
                    <div className='selected-item'>
                        {filter.multiple === true ? (
                            <>
                                <div className='item-box'>{item}</div>
                                <div className='cross' onClick={() => {
                                    setSelected(selected.filter(i => i !== item));
                                    dispatch(setFilter({ 'key': filter.key, 'value': selected.filter(i => i !== item) }))
                                }}>&times;</div>
                            </>
                        ) : (
                            <>
                                <div className='item-box' style={{ backgroundColor: 'white', color: 'gray'}}>{item}</div>
                            </>
                        )}
                    </div>
                )
            })}
            <div className='main-cross' onClick={() => {
                setSelected([])
                if (filter.multiple === true) {
                    dispatch(setFilter({ 'key': filter.key, 'value': [] }))
                } else {
                    dispatch(setFilter({ 'key': filter.key, 'value': null }))
                }
            }}>&times;</div>
        </>
    )
}