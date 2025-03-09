# Social Media Profile Analyzer

A Python module that uses Natural Language Processing (NLP) to analyze social media profiles and extract career-relevant insights.

## Features

- Analyzes LinkedIn and Twitter profiles
- Extracts professional skills and interests
- Identifies industry focus and expertise
- Analyzes communication style
- Calculates engagement levels and profile completeness
- Uses spaCy for advanced NLP analysis

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Download the spaCy language model:
```bash
python -m spacy download en_core_web_lg
```

## Usage

```python
from analyzer import SocialMediaAnalyzer

# Initialize the analyzer
analyzer = SocialMediaAnalyzer()

# Analyze LinkedIn profile
linkedin_insights = await analyzer.analyze_linkedin_profile("https://www.linkedin.com/in/username")

# Analyze Twitter profile
twitter_insights = await analyzer.analyze_twitter_profile("https://twitter.com/username")

# Access the insights
print(f"Skills: {linkedin_insights.skills}")
print(f"Industry Focus: {linkedin_insights.industry_focus}")
print(f"Communication Style: {linkedin_insights.communication_style}")
```

## API Integration

To use this analyzer, you'll need to:

1. Set up LinkedIn API credentials
2. Set up Twitter API credentials
3. Implement the `_fetch_linkedin_data` and `_fetch_twitter_data` methods

## Output Format

The analyzer returns a `ProfileInsight` object containing:

- `skills`: List of professional skills
- `interests`: List of professional interests
- `experience_years`: Total years of experience
- `top_topics`: Most discussed professional topics
- `industry_focus`: Identified industry sectors
- `communication_style`: Analysis of communication patterns
- `engagement_level`: Profile activity level
- `profile_completeness`: Profile completion percentage
- `last_active`: Last activity timestamp
- `connection_count`: Number of connections/followers

## Note

This is a template implementation. You'll need to:

1. Add your API keys and credentials
2. Implement the actual API calls
3. Customize the analysis parameters for your needs
4. Add error handling and rate limiting
5. Consider privacy and data protection regulations 