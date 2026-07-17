# JobStreet & JobsDB Scraper

Apify Actor that extracts job listings from JobStreet (Malaysia, Singapore, Philippines, Indonesia) and JobsDB (Thailand, Hong Kong) using raw HTTP calls directly to SEEK's search API. Fast, headless, and cost-efficient.

## Features

- **Country Selection:** Target Singapore (`SG-Main`), Malaysia (`MY-Main`), Philippines (`PH-Main`), Indonesia (`ID-Main`), Thailand (`TH-Main`), or Hong Kong (`HK-Main`).
- **Targeted Filters:** Custom keywords and location parameters.
- **Rich Output Schema:** Retrieves job titles, company metadata, locations, exact job page URLs, salary labels, date listed, work types, work arrangements, teasers, and highlighted bullet points.
- **Fast Execution:** Under the hood, this scraper targets SEEK's public search API instead of running heavy, expensive browser instances, allowing for lightning-fast scrapes.

## Input Example

```json
{
  "keyword": "python",
  "siteKey": "SG-Main",
  "where": "Singapore",
  "maxItems": 50
}
```
