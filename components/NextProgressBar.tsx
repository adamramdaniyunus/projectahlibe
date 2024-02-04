// components/NextProgressBar.tsx

interface NextProgressBarProps {
    isLoading: boolean;
}

const NextProgressBar: React.FC<NextProgressBarProps> = ({ isLoading }) => {
    return (
        <div style={{ display: isLoading ? 'block' : 'none' }}>
            <div style={{ width: '100%', height: '3px', backgroundColor: '#fff', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
                <div style={{ width: '50%', height: '100%', backgroundColor: '#29D', animation: isLoading ? 'progress 2s linear infinite' : 'none' }}></div>
            </div>
            <style jsx>{`
                @keyframes progress {
                    0% {
                        width: 0%;
                    }
                    100% {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default NextProgressBar;
