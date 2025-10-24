// src/components/utils/SelfXSSWarning.tsx
"use client";

import { useEffect } from "react";

const SelfXSSWarning = () => {
    useEffect(() => {
        const showSelfXSS = () => {
            console.log(
                "%cStop!",
                "font: 4em sans-serif; color: red; text-shadow: 2px 2px 5px black;",
            );
            console.log(
                "%cThis browser feature is intended for developers. If someone told you to copy and paste something here to enable a feature or hack an account, it's a scam and they will gain access to your personal information.",
                "font: 400 1.5em sans-serif; color: inherit;",
            );
        };

        showSelfXSS();

        return () => {};
    }, []);

    return null;
};

export default SelfXSSWarning;
