#!/usr/bin/env python3
"""
Test the classifier with the actual incoming prompts from the repo.
"""

import sys
import os
sys.path.append('371-os/scripts')

# Simulate the actual prompts
from prompt_classifier import classify_prompt

# Test with actual prompt content from the repo
test_prompts = [
    ("test-marketing-prompt.txt", "Test Marketing Campaign Prompt\n\nCreate a comprehensive marketing campaign for [product/service]. Include:\n\n1. Target audience analysis\n2. Key messaging strategy  \n3. Channel selection and budget allocation\n4. Content calendar with specific tactics\n5. Success metrics and KPIs\n\nFocus on driving brand awareness and generating qualified leads through social media, email marketing, and content marketing channels.\n\nUse data-driven insights to optimize campaign performance throughout the lifecycle."),
    ("Conversion Copywriter and Persuasion Engineer.md", "Conversion copywriter and persuasion engineering content"),
    ("Kaizen Mastermind.txt", "Kaizen mastermind approach for business improvement"),
    ("Value Alchemist.txt", "Value alchemist for business transformation"),
    ("bizgrowthstrategy.txt", "Business growth strategy content"),
    ("prodnamedomaingen.txt", "Product name and domain generation")
]

print("🧪 Testing Classifier with Real Prompts")
print("=" * 50)

for filename, content in test_prompts:
    category = classify_prompt(content)
    print(f"📁 {filename:<35} → {category}")

print(f"\nClassification complete! 🎉")