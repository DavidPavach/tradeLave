import { useEffect, useState } from 'react';

export function useExternalScript(src: string) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (document.querySelector(`script[src="${src}"]`)) {
            setLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        script.onload = () => setLoaded(true);
        script.onerror = () => setError(true);

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [src]);

    return { loaded, error };
}
