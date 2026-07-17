import { Actor } from 'apify';
import got from 'got';

await Actor.init();

const input = await Actor.getInput() || {};
const {
    keyword = 'python',
    siteKey = 'SG-Main',
    where = '',
    maxItems = 50,
} = input;

// Map siteKey to the domain name of the country.
const siteKeyDomainMap = {
    'MY-Main': 'my.jobstreet.com',
    'SG-Main': 'sg.jobstreet.com',
    'PH-Main': 'ph.jobstreet.com',
    'ID-Main': 'id.jobstreet.com',
    'TH-Main': 'th.jobsdb.com',
    'HK-Main': 'hk.jobsdb.com',
};

const domain = siteKeyDomainMap[siteKey] || 'sg.jobstreet.com';
const baseUrl = `https://${domain}`;
const searchApiUrl = `${baseUrl}/api/jobsearch/v5/search`;

console.log(`Starting JobStreet Scraper for keyword "${keyword}" in "${siteKey}" (using domain ${domain}). Max Items: ${maxItems}`);

let page = 1;
let itemsCount = 0;
const pageSize = 20;

while (itemsCount < maxItems) {
    console.log(`Fetching page ${page}...`);
    try {
        const response = await got(searchApiUrl, {
            searchParams: {
                keywords: keyword,
                siteKey: siteKey,
                where: where,
                page: page,
                pageSize: pageSize,
            },
            headers: {
                'accept': 'application/json, text/plain, */*',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            },
            responseType: 'json',
            timeout: { request: 15000 },
        });

        const body = response.body;
        const jobs = body.data || [];
        
        if (jobs.length === 0) {
            console.log('No more jobs found.');
            break;
        }

        const scrapedJobs = [];
        for (const job of jobs) {
            if (itemsCount >= maxItems) break;

            const jobId = job.id;
            const jobUrl = `${baseUrl}/job/${jobId}`;

            // Parse work types and arrangements safely
            const workType = job.workTypes && job.workTypes.length > 0 ? job.workTypes[0] : '';
            const workArrangement = job.workArrangements && job.workArrangements.label ? job.workArrangements.label : '';

            // Locations
            const locations = (job.locations || []).map(loc => loc.label).join(', ');

            // Salary
            let salary = '';
            if (typeof job.salaryLabel === 'string') {
                salary = job.salaryLabel;
            } else if (job.salaryLabel && job.salaryLabel.label) {
                salary = job.salaryLabel.label;
            }

            scrapedJobs.push({
                id: jobId,
                title: job.title,
                company: job.companyName || (job.advertiser && job.advertiser.description) || '',
                location: locations,
                jobUrl: jobUrl,
                postedDate: job.listingDate ? job.listingDate.split('T')[0] : '',
                postedDateDisplay: job.listingDateDisplay || '',
                salary: salary,
                workType: workType,
                workArrangement: workArrangement,
                teaser: job.teaser || '',
                bulletPoints: job.bulletPoints || [],
            });

            itemsCount++;
        }

        await Actor.pushData(scrapedJobs);
        console.log(`Saved ${scrapedJobs.length} jobs (Total saved: ${itemsCount}/${maxItems})`);

        if (jobs.length < pageSize) {
            console.log('Reached the last page of results.');
            break;
        }

        page++;
        // Throttling to prevent rate-limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));

    } catch (error) {
        console.error(`Error on page ${page}:`, error.message);
        break;
    }
}

console.log(`Scraper completed. Total jobs extracted: ${itemsCount}`);
await Actor.exit();
