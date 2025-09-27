#!/usr/bin/env python3
"""
Comprehensive validation script for the 371 Prompts Management System
"""

import json
import time
import requests

def check_workflow_status():
    """Check the latest workflow runs for the repository"""
    try:
        url = "https://api.github.com/repos/371-Minds/bizbuilderprompts/actions/runs"
        response = requests.get(url)
        data = response.json()
        
        print("🔄 Latest Workflow Runs:")
        print("=" * 50)
        
        for run in data.get('workflow_runs', [])[:3]:  # Show last 3 runs
            status_emoji = "✅" if run['conclusion'] == 'success' else "❌" if run['conclusion'] == 'failure' else "🟡"
            print(f"{status_emoji} {run['display_title'][:50]:<50} | {run['status']:<10} | {run['conclusion'] or 'running'}")
            print(f"   Created: {run['created_at']} | Updated: {run['updated_at']}")
            print()
        
        return data.get('workflow_runs', [])
    except Exception as e:
        print(f"❌ Error checking workflow status: {e}")
        return []

def check_repository_structure():
    """Check the current repository structure"""
    try:
        url = "https://api.github.com/repos/371-Minds/bizbuilderprompts/contents"
        response = requests.get(url)
        data = response.json()
        
        print("📁 Repository Structure:")
        print("=" * 50)
        
        categories = []
        for item in data:
            if item['type'] == 'dir' and item['name'] in ['sales', 'marketing', 'product', 'customer_success', 'business_strategy', 'general']:
                categories.append(item['name'])
                print(f"📂 {item['name']}/")
        
        incoming_prompts = [item for item in data if item['name'] == 'incoming_prompts']
        if incoming_prompts:
            print("📂 incoming_prompts/ (waiting for processing)")
        
        print(f"\n🎯 Categories created: {len(categories)}")
        return categories
    except Exception as e:
        print(f"❌ Error checking repository structure: {e}")
        return []

def check_category_contents(categories):
    """Check the contents of each category folder"""
    print("\n📋 Category Contents:")
    print("=" * 50)
    
    for category in categories:
        try:
            url = f"https://api.github.com/repos/371-Minds/bizbuilderprompts/contents/{category}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                files = [item['name'] for item in data if item['type'] == 'file']
                print(f"📂 {category}/ ({len(files)} files)")
                for file in files[:3]:  # Show first 3 files
                    print(f"   📄 {file}")
                if len(files) > 3:
                    print(f"   ... and {len(files) - 3} more files")
            else:
                print(f"📂 {category}/ (empty or inaccessible)")
        except Exception as e:
            print(f"❌ Error checking {category}: {e}")

def validate_system():
    """Run complete system validation"""
    print("🧪 371 Prompts Management System Validation")
    print("=" * 70)
    print()
    
    # Check workflow status
    workflows = check_workflow_status()
    latest_success = None
    for run in workflows:
        if run['conclusion'] == 'success':
            latest_success = run
            break
    
    print()
    
    # Check repository structure
    categories = check_repository_structure()
    
    # Check category contents
    if categories:
        check_category_contents(categories)
    
    print()
    
    # Overall assessment
    print("📊 System Status Assessment:")
    print("=" * 50)
    
    if latest_success:
        print("✅ Workflow automation is working")
        print(f"   Last successful run: {latest_success['updated_at']}")
    else:
        print("⚠️  No successful workflow runs found")
    
    if categories:
        print(f"✅ Categories created: {', '.join(categories)}")
    else:
        print("⚠️  No category folders found")
    
    # System health score
    health_score = 0
    if latest_success: health_score += 50
    if categories: health_score += 30
    if len(categories) >= 3: health_score += 20
    
    print(f"\n🎯 System Health Score: {health_score}/100")
    
    if health_score >= 80:
        print("🎉 System is working excellently!")
    elif health_score >= 60:
        print("👍 System is working well with minor issues")
    elif health_score >= 40:
        print("⚠️  System has some issues that need attention")
    else:
        print("❌ System needs significant troubleshooting")

if __name__ == "__main__":
    validate_system()