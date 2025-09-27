#!/usr/bin/env python3
"""
Test script for the prompt classifier to ensure it's working correctly.
"""

import sys
import os
sys.path.append('371-os/scripts')

# Import the classifier
from prompt_classifier import classify_prompt

# Test cases
test_prompts = {
    "marketing": "Create a comprehensive marketing campaign for social media engagement and brand awareness",
    "sales": "Here's a powerful closing technique for sales calls to negotiate better deals",
    "product": "Build a roadmap for developing new features and user stories",
    "customer_success": "Create an onboarding guide to help customers resolve support issues",
    "business_strategy": "Kaizen mastermind approach for business growth and value creation",
    "general": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
}

print("🧪 Testing Prompt Classifier")
print("=" * 50)

for expected_category, prompt_text in test_prompts.items():
    predicted_category = classify_prompt(prompt_text)
    status = "✅ PASS" if predicted_category == expected_category else "❌ FAIL"
    
    # Debug: show which keywords matched for failed cases
    if predicted_category != expected_category:
        print(f"🐛 DEBUG: Expected '{expected_category}' but got '{predicted_category}'")
        from prompt_classifier import CATEGORIES
        content_lower = prompt_text.lower()
        for cat, keywords in CATEGORIES.items():
            matches = [kw for kw in keywords if kw in content_lower]
            if matches:
                print(f"   Category '{cat}' matched keywords: {matches}")
    
    print(f"{status} Expected: {expected_category:15} | Predicted: {predicted_category:15}")
    print(f"     Text: {prompt_text[:60]}...")
    print()

print("Test complete! 🎉")