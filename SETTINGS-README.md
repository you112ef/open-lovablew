# Settings Configuration

This application now includes a comprehensive settings panel for configuring API keys and external services.

## Accessing Settings

You can access the settings in two ways:

1. **From the main header**: Click the gear icon (⚙️) button in the top-right corner of the main interface
2. **From the home screen**: Click the "Settings" button in the top-right corner when the home screen is visible

## Required API Keys

### E2B API Key
- **Purpose**: Required for sandbox functionality and code execution
- **Get it from**: [https://e2b.dev](https://e2b.dev)
- **Usage**: Sandboxes, code execution, and development environment management

### Firecrawl API Key
- **Purpose**: Required for web scraping and website cloning
- **Get it from**: [https://firecrawl.dev](https://firecrawl.dev)
- **Usage**: Website analysis, content extraction, and design inspiration

## Optional AI Provider API Keys

At least one AI provider API key is recommended for code generation features:

### Anthropic API Key
- **Purpose**: Access to Claude Sonnet 4 for AI code generation
- **Get it from**: [https://console.anthropic.com](https://console.anthropic.com)
- **Model**: Claude Sonnet 4 (2025-05-14)

### OpenAI API Key
- **Purpose**: Access to GPT-5 for AI code generation
- **Get it from**: [https://platform.openai.com](https://platform.openai.com)
- **Model**: GPT-5

### Gemini API Key
- **Purpose**: Access to Google's Gemini 2.5 Pro for AI code generation
- **Get it from**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- **Model**: Gemini 2.5 Pro

### Groq API Key
- **Purpose**: Fast inference with Kimi K2 model (recommended)
- **Get it from**: [https://console.groq.com](https://console.groq.com)
- **Model**: Kimi K2 Instruct

## Features

### Visual Status Indicators
- **Green (✓ Configured)**: API key is properly set and ready to use
- **Yellow (⚠ Placeholder)**: API key contains placeholder text
- **Red (✗ Missing)**: API key is not configured

### Warning System
- **Header Warning**: Red dot indicator on settings button when required keys are missing
- **Banner Warning**: Red banner at the top of the page when required keys are missing
- **Quick Access**: "Configure Now" button in warning banner for easy access

### Data Persistence
- API keys are stored locally in your browser's localStorage
- Keys persist between browser sessions
- Data is never sent to external servers

### Security Features
- API keys are masked as password fields
- Keys are stored locally only
- No external transmission of sensitive data

## Usage Workflow

1. **Access Settings**: Click the settings button (⚙️) in the header
2. **Configure Required Keys**: Add your E2B and Firecrawl API keys
3. **Configure AI Providers**: Add at least one AI provider API key for best experience
4. **Save Settings**: Click "Save Settings" to store your configuration
5. **Verify Status**: Check that all required keys show "✓ Configured" status

## Troubleshooting

### Missing API Keys Warning
If you see a red warning banner or red dot on the settings button:
1. Click the settings button
2. Add your required API keys
3. Save the settings
4. The warnings should disappear

### API Key Not Working
- Ensure the API key is correctly copied from the provider's website
- Check that the key doesn't contain extra spaces or characters
- Verify the key is active and has sufficient credits/quota
- Try regenerating the key if issues persist

### Settings Not Saving
- Check that localStorage is enabled in your browser
- Try refreshing the page and re-entering the keys
- Ensure you're not in incognito/private browsing mode

## Support

For issues with specific API providers:
- **E2B**: [https://e2b.dev/docs](https://e2b.dev/docs)
- **Firecrawl**: [https://firecrawl.dev/docs](https://firecrawl.dev/docs)
- **Anthropic**: [https://docs.anthropic.com](https://docs.anthropic.com)
- **OpenAI**: [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **Google**: [https://ai.google.dev/docs](https://ai.google.dev/docs)
- **Groq**: [https://console.groq.com/docs](https://console.groq.com/docs)