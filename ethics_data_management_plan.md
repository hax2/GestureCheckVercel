# Data Management Plan & Ethics Committee Responses

This document provides the formal answers for the Ethics Committee based on the actual technical architecture of the Gesture Check project. You can share these responses directly with Manuela and Pedro.

## 1. What data are collected
The project collects two types of data directly from participants:
1. **Demographic Information:** Age, Gender, Native Language, Highest Level of Education, Handedness, and Familiarity with European gesture cultures.
2. **Gesture Ratings:** Quantitative ratings (1 to 5) on seven gesture characteristics.

The survey does not ask for or collect names, email addresses, or physical addresses.

The web hosting provider automatically logs IP addresses for security purposes, but the research team does not access or use them.

## 2. By whom
The data is collected directly by the primary research team via a custom-built web survey. The study ("Normative Data on Gestures") is organized by Johannes Kepler University Linz (Austria) under the responsibility of the Principal Investigator, Dr. Manuela Macedonia. The technical infrastructure (web survey and database) is developed and maintained by a researcher at Universidad Politécnica de Madrid (UPM), Spain. The Data Controller is Johannes Kepler University Linz (Austria).

## 3. In what form
Data is collected in a structured digital format (JSON payloads) from the web browser and securely inserted into a relational database. For statistical analysis, this data is exported into standard tabular formats (e.g., CSV).

## 4. Where are they stored
The survey application is hosted on Vercel, a secure cloud platform, with serverless functions executing in the `cdg1` region (Paris, France). The research database is a managed Prisma Postgres instance hosted in the `eu-west-3` region (Paris, France). Both data processing and storage therefore reside within the European Union. Both Prisma and Vercel adhere to the EU-U.S. Data Privacy Framework (DPF) and maintain GDPR compliance. All data transmission occurs over encrypted connections (HTTPS/SSL).

## 5. How are they processed
The anonymized numerical data will be exported from the database and analyzed statistically using standard research software (such as R or Python) by the researchers to compare human ratings against AI-generated baselines. As stated to participants, the processing of data does not involve automated decision-making or profiling.

## 6. Who will have access to them
Access to the raw and processed data is limited to the authorized members of the research team at Universidad Politécnica de Madrid (UPM) and Johannes Kepler University Linz (JKU). In line with open science principles, the anonymized dataset may be made available to other researchers upon reasonable request for the purpose of reproducing and verifying the study's findings. Any such sharing will involve only anonymized data from which no individual participant can be identified.

Personal data will be retained for a minimum period of five years, after which any data that is no longer necessary will be irreversibly anonymized or securely destroyed, as outlined in the informed consent.

---

## Additional Committee Concerns

### Digital Platforms & Cloud Services
The survey utilizes Vercel, a secure cloud platform, to serve the web pages and route the anonymous rating data to our database. The database is provided by Prisma Postgres, a managed PostgreSQL service. Both services are GDPR-compliant and certified under the EU-U.S. Data Privacy Framework (DPF). All data transmission occurs over encrypted connections (HTTPS/SSL). Since no personally identifiable information (PII) is collected, the use of these standard web infrastructure providers poses minimal risk to participant privacy.

### Traceability & IP Addresses
The research database does not collect or store participant IP addresses; responses are linked only to randomly generated, anonymous session IDs. As is standard for modern web infrastructure, our hosting provider (Vercel) automatically maintains temporary server access logs (which include IP addresses) solely for network security and system integrity purposes. To ensure strict participant anonymity and comply with data minimization principles, the research team does not correlate these temporary security logs with the survey database. As a result, the research data remains fully anonymized.

### AI Applications
Participants do not interact with any AI systems during the study. The survey is a standard web form. The AI models (Gemini) are used strictly *post-hoc* by the researchers to generate automated ratings for the same videos, which are then statistically compared to the human baseline. The AI component has no impact on participant safety, privacy, or informed consent.
