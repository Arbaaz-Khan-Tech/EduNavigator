import spacy
import requests
from typing import Dict, List, Optional
from dataclasses import dataclass
import json
import re
from datetime import datetime

@dataclass
class ProfileInsight:
    """Data class to store analyzed profile insights"""
    skills: List[str]
    interests: List[str]
    experience_years: int
    top_topics: List[str]
    industry_focus: List[str]
    communication_style: str
    engagement_level: str
    profile_completeness: float
    last_active: datetime
    connection_count: int

class SocialMediaAnalyzer:
    def __init__(self):
        """Initialize the analyzer with spaCy model"""
        # Load English language model with word vectors
        self.nlp = spacy.load("en_core_web_lg")
        
        # Pre-defined categories for classification
        self.tech_keywords = [
            "python", "javascript", "java", "react", "node.js", "machine learning",
            "ai", "cloud", "aws", "devops", "frontend", "backend", "fullstack"
        ]
        
        self.industry_sectors = [
            "technology", "healthcare", "finance", "education", "marketing",
            "design", "consulting", "research", "engineering"
        ]

    async def analyze_linkedin_profile(self, profile_url: str) -> ProfileInsight:
        """Analyze LinkedIn profile and extract career-relevant insights"""
        try:
            # This would be replaced with actual LinkedIn API calls
            profile_data = await self._fetch_linkedin_data(profile_url)
            
            # Extract and analyze different aspects of the profile
            skills = self._extract_skills(profile_data)
            experience = self._analyze_experience(profile_data)
            interests = self._extract_interests(profile_data)
            communication = self._analyze_communication_style(profile_data)
            
            # Calculate engagement and profile completeness
            engagement = self._calculate_engagement_level(profile_data)
            completeness = self._calculate_profile_completeness(profile_data)
            
            return ProfileInsight(
                skills=skills,
                interests=interests,
                experience_years=experience["total_years"],
                top_topics=self._extract_top_topics(profile_data),
                industry_focus=experience["industries"],
                communication_style=communication["style"],
                engagement_level=engagement["level"],
                profile_completeness=completeness,
                last_active=self._parse_last_active(profile_data),
                connection_count=profile_data.get("connections", 0)
            )
        except Exception as e:
            print(f"Error analyzing LinkedIn profile: {e}")
            return None

    async def analyze_twitter_profile(self, profile_url: str) -> ProfileInsight:
        """Analyze Twitter profile for professional insights"""
        try:
            # This would be replaced with actual Twitter API calls
            twitter_data = await self._fetch_twitter_data(profile_url)
            
            # Analyze tweets and profile information
            topics = self._analyze_tweet_topics(twitter_data)
            engagement = self._analyze_twitter_engagement(twitter_data)
            interests = self._extract_twitter_interests(twitter_data)
            
            return ProfileInsight(
                skills=self._extract_skills_from_tweets(twitter_data),
                interests=interests,
                experience_years=0,  # Not typically available from Twitter
                top_topics=topics,
                industry_focus=self._identify_industry_focus(topics),
                communication_style=self._analyze_tweet_style(twitter_data),
                engagement_level=engagement["level"],
                profile_completeness=self._calculate_twitter_completeness(twitter_data),
                last_active=self._parse_last_tweet_date(twitter_data),
                connection_count=twitter_data.get("followers_count", 0)
            )
        except Exception as e:
            print(f"Error analyzing Twitter profile: {e}")
            return None

    def _extract_skills(self, data: Dict) -> List[str]:
        """Extract and categorize professional skills"""
        skills = []
        # Process text content with spaCy
        doc = self.nlp(data.get("description", ""))
        
        # Extract skills based on keyword matching and NER
        for token in doc:
            if token.text.lower() in self.tech_keywords:
                skills.append(token.text.lower())
            
        # Add skills from dedicated skills section
        skills.extend(data.get("skills", []))
        
        return list(set(skills))  # Remove duplicates

    def _analyze_experience(self, data: Dict) -> Dict:
        """Analyze professional experience"""
        experience = {
            "total_years": 0,
            "industries": [],
            "positions": []
        }
        
        for job in data.get("experience", []):
            # Calculate years of experience
            start_date = datetime.strptime(job["start_date"], "%Y-%m-%d")
            end_date = datetime.strptime(job.get("end_date", datetime.now().strftime("%Y-%m-%d")), "%Y-%m-%d")
            duration = (end_date - start_date).days / 365
            experience["total_years"] += duration
            
            # Extract industry information
            if "industry" in job:
                experience["industries"].append(job["industry"])
            
            # Add position details
            experience["positions"].append({
                "title": job["title"],
                "company": job["company"],
                "duration": duration
            })
        
        return experience

    def _analyze_communication_style(self, data: Dict) -> Dict:
        """Analyze communication style from posts and interactions"""
        communication = {
            "style": "professional",  # Default value
            "formality_score": 0.0,
            "engagement_patterns": []
        }
        
        # Analyze text content with spaCy
        posts = data.get("posts", [])
        combined_text = " ".join([post["content"] for post in posts])
        doc = self.nlp(combined_text)
        
        # Analyze linguistic patterns
        formality_markers = 0
        total_sentences = len(list(doc.sents))
        
        for sent in doc.sents:
            # Check for formal language markers
            if any(token.pos_ in ["AUX", "SCONJ"] for token in sent):
                formality_markers += 1
        
        communication["formality_score"] = formality_markers / total_sentences if total_sentences > 0 else 0
        
        # Determine overall style
        if communication["formality_score"] > 0.7:
            communication["style"] = "formal"
        elif communication["formality_score"] < 0.3:
            communication["style"] = "casual"
        
        return communication

    def _calculate_engagement_level(self, data: Dict) -> Dict:
        """Calculate user engagement level"""
        engagement = {
            "level": "moderate",  # Default value
            "score": 0.0,
            "factors": []
        }
        
        # Calculate engagement score based on various factors
        factors = {
            "post_frequency": len(data.get("posts", [])) / 30,  # Posts per month
            "response_rate": data.get("response_rate", 0),
            "interaction_count": data.get("total_interactions", 0)
        }
        
        # Weight and combine factors
        engagement["score"] = (
            factors["post_frequency"] * 0.4 +
            factors["response_rate"] * 0.3 +
            factors["interaction_count"] * 0.3
        )
        
        # Determine engagement level
        if engagement["score"] > 0.7:
            engagement["level"] = "high"
        elif engagement["score"] < 0.3:
            engagement["level"] = "low"
        
        return engagement

    def _extract_top_topics(self, data: Dict) -> List[str]:
        """Extract main topics of interest from profile content"""
        topics = {}
        
        # Analyze posts and descriptions
        text_content = [
            data.get("description", ""),
            *[post["content"] for post in data.get("posts", [])]
        ]
        
        for text in text_content:
            doc = self.nlp(text)
            
            # Extract noun phrases and entities
            for chunk in doc.noun_chunks:
                if chunk.root.pos_ in ["NOUN", "PROPN"]:
                    topic = chunk.text.lower()
                    topics[topic] = topics.get(topic, 0) + 1
        
        # Sort and return top topics
        return [topic for topic, count in 
                sorted(topics.items(), key=lambda x: x[1], reverse=True)[:10]]

    async def _fetch_linkedin_data(self, profile_url: str) -> Dict:
        """Fetch profile data from LinkedIn"""
        # This would be implemented with actual LinkedIn API integration
        pass

    async def _fetch_twitter_data(self, profile_url: str) -> Dict:
        """Fetch profile data from Twitter"""
        # This would be implemented with actual Twitter API integration
        pass

    def _identify_industry_focus(self, topics: List[str]) -> List[str]:
        """Identify industry focus based on topics"""
        industry_matches = []
        
        for topic in topics:
            doc = self.nlp(topic)
            
            # Compare topic vectors with industry sectors
            for industry in self.industry_sectors:
                industry_doc = self.nlp(industry)
                similarity = doc.similarity(industry_doc)
                
                if similarity > 0.6:  # Threshold for industry match
                    industry_matches.append(industry)
        
        return list(set(industry_matches))  # Remove duplicates

    def _calculate_profile_completeness(self, data: Dict) -> float:
        """Calculate profile completeness percentage"""
        required_fields = [
            "name", "title", "description", "experience",
            "education", "skills", "profile_photo"
        ]
        
        optional_fields = [
            "certifications", "publications", "languages",
            "volunteer_work", "recommendations"
        ]
        
        # Calculate completeness score
        required_score = sum(1 for field in required_fields if data.get(field)) / len(required_fields)
        optional_score = sum(1 for field in optional_fields if data.get(field)) / len(optional_fields)
        
        # Weight required fields more heavily
        return (required_score * 0.7 + optional_score * 0.3) * 100 