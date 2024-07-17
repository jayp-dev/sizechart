import { useEffect, useState } from 'react';
import { polyfill } from '../utils/polyfills';

export default function useDisplayNames(locale) {
    const [displayNames, setDisplayNames] = useState(null);

    useEffect(() => {
        async function loadPolyfillAndSetLocaleName() {
            await polyfill();
            if (Intl.DisplayNames) {
                const displayNamesInstance = new Intl.DisplayNames(locale, { type: 'language' });
                setDisplayNames(displayNamesInstance);
            }
        }

        loadPolyfillAndSetLocaleName();
    }, [locale]);

    return displayNames;
}