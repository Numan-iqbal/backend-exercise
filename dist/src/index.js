import fetch from 'cross-fetch';
import taxRates from './data/taxRate.json';
export async function returnSiteTitles() {
    const urls = [
        'https://patientstudio.com/',
        'https://www.startrek.com/',
        'https://www.starwars.com/',
        'https://www.neowin.net/'
    ];
    const titles = [];
    for (const url of urls) {
        const response = await fetch(url, { method: 'GET' });
        if (response.status === 200) {
            const data = await response.text();
            const match = data.match(/<title>(.*?)<\/title>/);
            if (match === null || match === void 0 ? void 0 : match.length) {
                titles.push(match[1]);
            }
        }
    }
    return titles;
}
export function findTagCounts(localData) {
    const tagCounts = [];
    for (let i = 0; i < localData.length; i++) {
        const tags = localData[i].tags;
        for (let j = 0; j < tags.length; j++) {
            const tag = tags[j];
            for (let k = 0; k < tagCounts.length; k++) {
                if (tagCounts[k].tag === tag) {
                    tagCounts[k].count++;
                }
                else {
                    tagCounts.push({ tag, count: 1 });
                }
            }
        }
    }
    return tagCounts;
}
export function calculateImportCost(importedItems) {
    const importCosts = [];
    importedItems.forEach((item, index) => {
        const taxRate = taxRates[index].importTaxRate;
        const importTax = item.imported ? 0.05 : 0;
        const cost = item.price + item.price * taxRate + item.price * importTax;
        importCosts.push({
            name: item.name,
            cost: cost
        });
    });
    return importCosts;
}
