import { useState, useEffect } from 'react';

const useInfiniteScroll = () => {
    const [getPage, setGetPage] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 10 || getPage) return;
        setGetPage(true);
    }

    return [getPage, setGetPage];
};

export default useInfiniteScroll;