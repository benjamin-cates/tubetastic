const getDescriptions = () => {
    // get the div with id description and class="item style-scope ytd-watch-metadata"
    // ! This function not working
    const bottomRowElement = document.querySelector('#bottom-row');
    const descriptionElement = bottomRowElement ? bottomRowElement.querySelector('#description') as HTMLElement : null;
    const expandElement = descriptionElement ? descriptionElement.querySelector('#expand') as HTMLElement : null;
    if (expandElement) expandElement.click();
    const innerDescriptionElement = descriptionElement ? descriptionElement.querySelector('#description-inner') as HTMLElement : null;
    const description = innerDescriptionElement ? innerDescriptionElement.innerText : '';
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