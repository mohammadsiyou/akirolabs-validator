import React from 'react';

export function useInterval(callback: () => void, isStarted: boolean) {
    React.useEffect(() => {
        if (isStarted) {
            const id = setInterval(() => callback(), 500);
            return () => clearInterval(id);
        }
    }, [isStarted, callback]);
}
