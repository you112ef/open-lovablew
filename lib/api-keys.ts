export interface ApiKeys {
  E2B_API_KEY: string;
  FIRECRAWL_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  OPENAI_API_KEY: string;
  GEMINI_API_KEY: string;
  GROQ_API_KEY: string;
}

export const DEFAULT_API_KEYS: ApiKeys = {
  E2B_API_KEY: '',
  FIRECRAWL_API_KEY: '',
  ANTHROPIC_API_KEY: '',
  OPENAI_API_KEY: '',
  GEMINI_API_KEY: '',
  GROQ_API_KEY: ''
};

/**
 * Get API keys from localStorage
 */
export function getApiKeys(): ApiKeys {
  if (typeof window === 'undefined') {
    return DEFAULT_API_KEYS;
  }

  try {
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      const parsed = JSON.parse(savedKeys);
      return { ...DEFAULT_API_KEYS, ...parsed };
    }
  } catch (error) {
    console.error('Failed to parse saved API keys:', error);
  }

  return DEFAULT_API_KEYS;
}

/**
 * Save API keys to localStorage
 */
export function saveApiKeys(apiKeys: Partial<ApiKeys>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const currentKeys = getApiKeys();
    const updatedKeys = { ...currentKeys, ...apiKeys };
    localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
  } catch (error) {
    console.error('Failed to save API keys:', error);
  }
}

/**
 * Check if a specific API key is configured
 */
export function isApiKeyConfigured(key: keyof ApiKeys): boolean {
  const apiKeys = getApiKeys();
  const value = apiKeys[key];
  return typeof value === 'string' && value.length > 0 && !value.startsWith('your_') && !value.includes('your_');
}

/**
 * Check if required API keys are configured
 */
export function areRequiredApiKeysConfigured(): boolean {
  return isApiKeyConfigured('E2B_API_KEY') && isApiKeyConfigured('FIRECRAWL_API_KEY');
}

/**
 * Check if at least one AI provider API key is configured
 */
export function isAnyAiProviderConfigured(): boolean {
  return isApiKeyConfigured('ANTHROPIC_API_KEY') || 
         isApiKeyConfigured('OPENAI_API_KEY') || 
         isApiKeyConfigured('GEMINI_API_KEY') || 
         isApiKeyConfigured('GROQ_API_KEY');
}

/**
 * Get the first configured AI provider API key
 */
export function getFirstConfiguredAiProvider(): { provider: keyof ApiKeys; key: string } | null {
  const apiKeys = getApiKeys();
  
  if (isApiKeyConfigured('ANTHROPIC_API_KEY')) {
    return { provider: 'ANTHROPIC_API_KEY', key: apiKeys.ANTHROPIC_API_KEY };
  }
  if (isApiKeyConfigured('OPENAI_API_KEY')) {
    return { provider: 'OPENAI_API_KEY', key: apiKeys.OPENAI_API_KEY };
  }
  if (isApiKeyConfigured('GEMINI_API_KEY')) {
    return { provider: 'GEMINI_API_KEY', key: apiKeys.GEMINI_API_KEY };
  }
  if (isApiKeyConfigured('GROQ_API_KEY')) {
    return { provider: 'GROQ_API_KEY', key: apiKeys.GROQ_API_KEY };
  }
  
  return null;
}

/**
 * Clear all API keys from localStorage
 */
export function clearApiKeys(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem('apiKeys');
  } catch (error) {
    console.error('Failed to clear API keys:', error);
  }
}