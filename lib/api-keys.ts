// API Keys management utility
export interface ApiKeyConfig {
  E2B_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  OPENAI_API_KEY?: string;
  GROQ_API_KEY?: string;
  GOOGLE_API_KEY?: string;
  FIRECRAWL_API_KEY?: string;
}

// Get API key from localStorage or environment variable
export function getApiKey(keyName: string): string | undefined {
  if (typeof window !== 'undefined') {
    // Client-side: try localStorage first, then environment
    const localValue = localStorage.getItem(keyName);
    if (localValue) {
      return localValue;
    }
  }
  
  // Fallback to environment variable
  return process.env[keyName];
}

// Get all API keys
export function getAllApiKeys(): ApiKeyConfig {
  const keys: ApiKeyConfig = {};
  
  const keyNames = [
    'E2B_API_KEY',
    'ANTHROPIC_API_KEY', 
    'OPENAI_API_KEY',
    'GROQ_API_KEY',
    'GOOGLE_API_KEY',
    'FIRECRAWL_API_KEY'
  ];

  keyNames.forEach(keyName => {
    const value = getApiKey(keyName);
    if (value) {
      keys[keyName as keyof ApiKeyConfig] = value;
    }
  });

  return keys;
}

// Check if required API keys are configured
export function checkRequiredApiKeys(): { isValid: boolean; missing: string[] } {
  const requiredKeys = ['E2B_API_KEY', 'ANTHROPIC_API_KEY'];
  const missing: string[] = [];

  requiredKeys.forEach(keyName => {
    if (!getApiKey(keyName)) {
      missing.push(keyName);
    }
  });

  return {
    isValid: missing.length === 0,
    missing
  };
}

// Save API key to localStorage
export function saveApiKey(keyName: string, value: string): void {
  if (typeof window !== 'undefined') {
    if (value.trim()) {
      localStorage.setItem(keyName, value.trim());
    } else {
      localStorage.removeItem(keyName);
    }
  }
}

// Clear all API keys from localStorage
export function clearAllApiKeys(): void {
  if (typeof window !== 'undefined') {
    const keyNames = [
      'E2B_API_KEY',
      'ANTHROPIC_API_KEY', 
      'OPENAI_API_KEY',
      'GROQ_API_KEY',
      'GOOGLE_API_KEY',
      'FIRECRAWL_API_KEY'
    ];

    keyNames.forEach(keyName => {
      localStorage.removeItem(keyName);
    });
  }
}