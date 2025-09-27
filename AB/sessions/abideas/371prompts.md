Prompt Management System
This system is a two-repository solution for automatically classifying and
organizing AI prompts.
Repository 1: 371-Minds/os
The Operating System for your prompt ecosystem. This repository contains
the core logic, scripts, and automation tools that power the classification and
management process. It is the "brain" of the operation.
Location of Logic: The prompt classification script ( scripts/
prompt_classifier.py ) lives here.
Centralized Control: Updates to the classification rules or management
logic are made here and automatically propagate to the prompts
repository via GitHub Actions.
Repository 2: 371-Minds/bizbuilderprompts
The Prompt Library. This is the curated, organized, and publicly accessible
collection of your prompts. It is the "body" that is managed by the OS.
Inbox: New prompts are submitted to the incoming/  directory.
Automated Organization: A GitHub Action workflow triggers on new
submissions, pulls the classifier from the os  repo, and automatically
sorts the prompt into the correct category (e.g., sales/ , 
marketing/ ).
Living Document: The main README.md  is automatically updated to
reflect the current state of the library.
• 
• 
• 
• 
• 
How to Contribute a New Prompt
To add a new prompt to the library, simply create a new text file in the 
incoming/  folder of the bizbuilderprompts repository and push your
changes. The automation will handle the rest!