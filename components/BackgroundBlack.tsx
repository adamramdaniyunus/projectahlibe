import React from 'react'

const BackgroundBlack = ({ handleShowBar }: { handleShowBar: () => void }) => {
    return (
        <div onClick={handleShowBar} className={`fixed z-[54] top-0 left-0 h-screen w-screen bg-black bg-opacity-40`}>
        </div>
    )
}

export default BackgroundBlack
