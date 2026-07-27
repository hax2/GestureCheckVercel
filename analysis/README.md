# Gesture rating analysis

`gesture_ratings_complete_analysis.xlsx` is the complete human–VLM research workbook.

The workbook contains every complete human rating under a study-local pseudonymous
rater code, all supplied VLM scores and rationales, item-level summaries, model–human
statistics, model–model agreement, coverage, aggregate demographics, charts, and
interpretation notes.

Runs in which every recorded score is uniformly `1` or uniformly `5` are treated as
test runs and excluded from the analysis.

The raw database export is intentionally ignored under `analysis/source/`. To rebuild:

```bash
DATABASE_URL="..." node scripts/export_human_ratings.mjs analysis/source/human_ratings.json
python3 scripts/build_rating_analysis.py
```

The hosted dashboard uses only aggregate human data from
`public/research-insights-7f3c9a/data.json`. It does not contain raw participant,
session, or response identifiers.

The same build also copies the cleaned workbook to the hidden dashboard directory as
`gesture_ratings_all_data_and_analysis.xlsx` for the dashboard's explicit download
button. The workbook uses study-local rater codes and contains no raw database IDs.
