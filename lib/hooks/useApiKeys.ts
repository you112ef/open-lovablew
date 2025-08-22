'use client';

import { useState, useEffect } from 'react';
import { getApiKey, getAllApiKeys, checkRequiredApiKeys } from '../api-keys';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState(getAllApiKeys());
  const [validation, setValidation] = useState(checkRequiredApiKeys());

  // Update API keys when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setApiKeys(getAllApiKeys());
      setValidation(checkRequiredApiKeys());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getKey = (keyName: string): string | undefined => {
    return getApiKey(keyName);
  };

  const refreshKeys = () => {
    setApiKeys(getAllApiKeys());
    setValidation(checkRequiredApiKeys());
  };

  return {
    apiKeys,
    validation,
    getKey,
    refreshKeys
  };
}