'use client'

import { RadioContext } from './RadioContext'

const RadioGroup = ({label, children, ...rest}: any) => {
    return (
        <fieldset className='flex items-center gap-[30px] w-full justify-around'>
            <RadioContext.Provider value={rest}>
                {children}
            </RadioContext.Provider>
        </fieldset>
    )
}

export default RadioGroup