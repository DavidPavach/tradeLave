/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

declare global {
    interface Window {
        _smartsupp?: Record<string, any>;
        smartsupp?: (...args: any[]) => void;
    }
}


export default function Smartsupp() {
    useEffect(() => {
        window._smartsupp = window._smartsupp || {};
        window._smartsupp.key = "52f468be8f593e5e9db192cb5d914b6f27ace4c3";
        window._smartsupp.offsetY = 100;

        // Prevent double-inject (StrictMode + HMR)
        const existing = document.querySelector<HTMLScriptElement>(
            'script[src^="https://www.smartsuppchat.com/loader.js"]'
        );
        if (existing) return;

        if (!window.smartsupp) {
            const queue: any[] = [];
            const fn: any = (...args: any[]) => queue.push(args);
            fn._ = queue;
            window.smartsupp = fn;
        }

        const firstScript = document.getElementsByTagName("script")[0];
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        script.async = true;
        script.src = "https://www.smartsuppchat.com/loader.js?";
        firstScript?.parentNode?.insertBefore(script, firstScript);

        return () => {
        };
    });

    return null;
}

