import { getDescriptions, getViewsAndPublishedDate } from "./description";

const observer = new MutationObserver(() => {
    const { views, published_date } = getViewsAndPublishedDate();
    const description = getDescriptions();

    const data = { views, published_date, description };

    let hasChanged = false;
    Object.entries(data).forEach(([key, value]) => {
        const localValue = localStorage.getItem(key);
        // skip null or undefined values
        if (value == null) return;

        if (localValue !== value) {
            localStorage.setItem(key, value);
            console.log(`Updated ${key} to: `, value);
            hasChanged = true;
        }
    });

    if (!hasChanged) {
        console.log('No changes detected');
    }
});

observer.observe(document, { childList: true, subtree: true });
