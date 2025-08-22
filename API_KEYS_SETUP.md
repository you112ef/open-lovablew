# API Keys Setup Guide

## Overview

This application now includes a dynamic API keys management system that allows you to configure your API keys directly from the user interface, without needing to edit environment files manually.

## How to Set Up API Keys

### 1. Access Settings
- Click the **"Settings"** button in the top-right corner of the application
- This will open the API Settings modal

### 2. Required API Keys

#### E2B API Key (Required)
- **Purpose**: Sandbox environment and code execution
- **How to get**: Sign up at [e2b.dev](https://e2b.dev)
- **Required for**: All sandbox functionality

#### Anthropic API Key (Required)
- **Purpose**: Claude AI model access
- **How to get**: Sign up at [console.anthropic.com](https://console.anthropic.com)
- **Required for**: AI code generation

### 3. Optional API Keys

#### OpenAI API Key
- **Purpose**: GPT models access
- **How to get**: Sign up at [platform.openai.com](https://platform.openai.com)
- **Required for**: Alternative AI models

#### Groq API Key
- **Purpose**: Fast LLM inference
- **How to get**: Sign up at [console.groq.com](https://console.groq.com)
- **Required for**: High-speed AI responses

#### Google API Key
- **Purpose**: Gemini models access
- **How to get**: Sign up at [makersuite.google.com](https://makersuite.google.com)
- **Required for**: Google AI models

## Features

### 🔐 Secure Storage
- API keys are stored securely in your browser's localStorage
- Keys are masked by default (click the eye icon to show/hide)
- No keys are sent to our servers

### ⚠️ Validation
- Required keys are clearly marked with a red asterisk (*)
- Missing required keys will show a warning
- The app will notify you if required keys are missing

### 🔄 Easy Management
- Edit keys anytime by clicking the Settings button
- Keys are automatically loaded when you open settings
- Clear individual keys by leaving the field empty

## Security Notes

- API keys are stored locally in your browser
- Never share your API keys with others
- You can clear all keys using the browser's developer tools
- Keys are not transmitted to our servers

## Troubleshooting

### Keys Not Saving
- Make sure you click the "Save Keys" button
- Check that your browser supports localStorage
- Try refreshing the page and setting keys again

### Missing Required Keys Warning
- Configure the required API keys (E2B and Anthropic)
- The warning will disappear once all required keys are set
- You can dismiss the warning temporarily

### API Errors
- Verify your API keys are correct
- Check that your API accounts have sufficient credits
- Ensure your API keys have the necessary permissions

## Getting API Keys

### E2B (Required)
1. Go to [e2b.dev](https://e2b.dev)
2. Sign up for an account
3. Navigate to your dashboard
4. Copy your API key

### Anthropic (Required)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for an account
3. Navigate to API Keys
4. Create a new API key

### OpenAI (Optional)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up for an account
3. Navigate to API Keys
4. Create a new API key

### Groq (Optional)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for an account
3. Navigate to API Keys
4. Create a new API key

### Google (Optional)
1. Go to [makersuite.google.com](https://makersuite.google.com)
2. Sign up for an account
3. Navigate to API Keys
4. Create a new API key

## Support

If you encounter any issues with API key setup:
1. Check that your API keys are valid
2. Ensure you have sufficient credits in your API accounts
3. Try clearing and re-entering your keys
4. Contact support if problems persist