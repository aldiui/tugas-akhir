import React from 'react'

const LoadingTable = () => {
    return (
        <div className='absolute inset-0 text-[12px] text-white flex justify-center items-center'>
            <div className='bg-blue-600 py-[10px] rounded-[5px] px-[20px]'>
                Processing...
            </div>
        </div>
    )
}

export default LoadingTable