import Image from 'next/image'
import React from 'react'

const LoadingLogo = () => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-primary w-full h-full flex justify-center items-center">
            <Image
                src={'/images/logo.png'}
                width={300}
                height={300}
                alt="logo"
            />
        </div>
    )
}

export default LoadingLogo
