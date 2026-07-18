# JobStreet & JobsDB Jobs Scraper

A high-performance Apify Actor that scrapes job listings from JobStreet and JobsDB across multiple Southeast Asian and Oceanic regions using native REST APIs. Extract structured job data including titles, companies, locations, salaries, and descriptions without dealing with HTML parsing or anti-scraping mechanisms.

---

## 🚀 Features

- **Multi-Region Support**: Scrape jobs from 8 countries across Southeast Asia and Oceania
- **Native API Integration**: Uses JobStreet/JobsDB's official REST API endpoints for reliable, structured data
- **Smart Pagination**: Automatically handles multi-page results with configurable limits
- **Rich Job Data**: Extracts 10+ fields including salary, work type, posted date, and job descriptions
- **Zero HTML Parsing**: Direct JSON responses eliminate fragility and maintenance overhead
- **Apify SDK Integration**: Stores results in Apify datasets for easy export and integration
- **Configurable Inputs**: Flexible search by keyword, location, and regional site

---

## 🌏 Supported Regions

The scraper supports the following regional job boards:

| Region | Site Key | Domain | Job Board |
|--------|----------|--------|-----------|
| 🇲🇾 Malaysia | `MY-Main` | my.jobstreet.com | JobStreet Malaysia |
| 🇸🇬 Singapore | `SG-Main` | sg.jobstreet.com | JobStreet Singapore |
| 🇵🇭 Philippines | `PH-Main` | ph.jobstreet.com | JobStreet Philippines |
| 🇮🇩 Indonesia | `ID-Main` | id.jobstreet.com | JobStreet Indonesia |
| 🇹🇭 Thailand | `TH-Main` | th.jobsdb.com | JobsDB Thailand |
| 🇭🇰 Hong Kong | `HK-Main` | hk.jobsdb.com | JobsDB Hong Kong |
| 🇦🇺 Australia | `AU-Main` | au.jobstreet.com | JobStreet Australia |
| 🇳🇿 New Zealand | `NZ-Main` | nz.jobstreet.com | JobStreet New Zealand |

---

## 📋 Input Configuration

The scraper accepts the following input parameters via JSON configuration:

### Input Schema

```json
{
  "keyword": "python developer",
  "siteKey": "SG-Main",
  "where": "Singapore",
  "maxItems": 50
}
```

### Parameter Details

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `keyword` | String | ✅ Yes | `"python"` | Job title, skills, or keywords to search for |
| `siteKey` | String | ✅ Yes | `"SG-Main"` | Regional site identifier (see Supported Regions table) |
| `where` | String | ❌ No | `""` | Location filter (city, region, or leave empty for all) |
| `maxItems` | Integer | ❌ No | `50` | Maximum number of jobs to scrape (increments of 20) |

### Example Configurations

**Search for Data Scientists in Malaysia:**
```json
{
  "keyword": "data scientist",
  "siteKey": "MY-Main",
  "where": "Kuala Lumpur",
  "maxItems": 100
}
```

**Search for Full Stack Developers in Singapore:**
```json
{
  "keyword": "full stack developer",
  "siteKey": "SG-Main",
  "where": "",
  "maxItems": 200
}
```

**Search for Marketing Managers in Hong Kong:**
```json
{
  "keyword": "marketing manager",
  "siteKey": "HK-Main",
  "where": "Central",
  "maxItems": 50
}
```

---

## 📤 Output Format

The scraper outputs structured JSON data with the following fields for each job:

### Output Schema

```json
{
  "id": "93390855",
  "title": "Python Quant Developer-Commodities Trading",
  "company": "Pinpoint Asia Limited",
  "location": "Central Region",
  "jobUrl": "https://sg.jobstreet.com/job/93390855",
  "postedDate": "2026-07-17",
  "postedDateDisplay": "8h ago",
  "salary": "$200,000 per year",
  "workType": "Full time",
  "workArrangement": "Hybrid",
  "teaser": "You will work directly alongside portfolio managers...",
  "bulletPoints": [
    "High-impact role bridging quantitative research and Python development.",
    "Join a leading global buy-side firm on a high-growth commodities desk."
  ]
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique job posting identifier |
| `title` | String | Job title |
| `company` | String | Hiring company name |
| `location` | String | Job location (city/region) |
| `jobUrl` | String | Direct link to full job posting |
| `postedDate` | String | ISO date when job was posted |
| `postedDateDisplay` | String | Human-readable posted time (e.g., "2 days ago") |
| `salary` | String | Salary information (if available, empty string otherwise) |
| `workType` | String | Employment type (Full time, Part time, Contract, etc.) |
| `workArrangement` | String | Work arrangement (Remote, Hybrid, On-site, etc.) |
| `teaser` | String | Short job description or summary |
| `bulletPoints` | Array | Key highlights or selling points of the role |

---

### Running on Apify Platform

1. Navigate to your actor in the Apify Console
2. Click **"Input"** tab
3. Configure your search parameters
4. Click **"Start"** to run
5. Download results from the **"Storage"** → **"Dataset"** tab

---

## 💡 Use Cases

- **Job Market Research**: Analyze salary trends, in-demand skills, and hiring patterns
- **Talent Acquisition**: Monitor competitor hiring and discover candidate pools
- **Career Planning**: Track job availability and requirements in target industries
- **Data Analysis**: Build datasets for ML models, trend analysis, or visualization
- **Lead Generation**: Identify companies actively hiring in specific sectors

---

## 🔧 Troubleshooting

### No Results Returned

- **Check keyword spelling**: Ensure your search term is spelled correctly
- **Try broader keywords**: "software" instead of "senior principal staff software architect"
- **Verify siteKey**: Ensure you're using a valid regional site key from the Supported Regions table
- **Check location filter**: Try removing the `where` parameter or using a broader location

### Timeout Errors

- **Reduce maxItems**: Lower the `maxItems` value to retrieve fewer results
- **Network issues**: Verify your internet connection is stable

### Incomplete Data Fields

- **Salary field empty**: Not all job postings include salary information
- **bulletPoints array empty**: Some listings don't provide structured highlights

---

## 📝 Notes

- **Rate Limiting**: The scraper respects reasonable rate limits. For high-volume scraping, consider adding delays between requests.
- **Data Freshness**: Job listings are scraped in real-time from the live API.
- **API Changes**: If JobStreet/JobsDB updates their API, the scraper may require maintenance.

---

## 📜 License

This actor is provided as-is for data collection and analysis purposes. Ensure your usage complies with JobStreet and JobsDB's Terms of Service.

---

## 🤝 Support

For issues, questions, or feature requests:
- Review the Troubleshooting section above
- Check Apify documentation: https://docs.apify.com
- Review actor logs for detailed error messages

---

**Built with [Apify SDK](https://sdk.apify.com/) • Powered by JobStreet & JobsDB APIs**
