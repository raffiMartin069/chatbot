import React from 'react'

import { Loader as LoaderArray } from '@/constants/chat_load';

export default function Loader() {

    const [idx, setIdx] = React.useState(0);

    const loaderItems = LoaderArray;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIdx((prevIdx) => (prevIdx + 1) % loaderItems.length);
        }, 500);

        return () => clearInterval(interval);
    }, [loaderItems.length]);

    return (
        <div className="text-gray-400 italic">
            {loaderItems[idx]}
        </div>
    )
}
