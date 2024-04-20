const getDescriptions = () => {
    let description = "";
    const expandButton = document.querySelector("#expand") as HTMLElement;
    if (expandButton) expandButton.click();

    const descriptionElement = document.querySelector("#description-inline-expander") as HTMLElement;
    const spans = descriptionElement.querySelectorAll("span");

    // loop through all spans and concatenate the innerText if it is not empty
    spans.forEach((span) => {
        if (span.innerText) description += span.innerText;
    });
    return description;
}

const getViewsAndPublishedDate = () => {
    let content = "";
    let i = 0;
    while (i < 10) {
        try {
            const tooltipElement = document.querySelectorAll("#tooltip")[i] as HTMLElement;
            if (tooltipElement.innerText.includes("views")) {
                content = tooltipElement.innerText;
                break;
            }
        } catch (error) {
            // console.error(`Error accessing innerText of tooltipElement at index ${i}:`, error);
        }
        i++;
    }
    // split the content into 2 by • and strip the whitespace, left is the views and right is the published date
    const [views, published_date] = content.split("•").map((s) => s.trim());
    return { views, published_date };
}

export { getDescriptions, getViewsAndPublishedDate };