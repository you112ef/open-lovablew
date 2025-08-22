'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [swUpdateAvailable, setSwUpdateAvailable] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Check if app is already installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if running as PWA
    const checkIfPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
      
      if (isStandalone || isFullscreen || isMinimalUI) {
        setIsInstalled(true);
      }
    };

    checkIfPWA();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[PWA] Service Worker registered:', registration);

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setSwUpdateAvailable(true);
            }
          });
        }
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
        setShowInstallPrompt(false);
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('[PWA] Install prompt failed:', error);
    }
  };

  const handleUpdateClick = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    // Hide for 24 hours
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if install was recently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissTime = parseInt(dismissed);
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - dismissTime < dayInMs) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  return (
    <>
      {/* Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Install Open Lovable
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Install our app for a better experience with offline support and faster loading.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={handleInstallClick}
                    className="text-xs"
                  >
                    Install
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismissInstall}
                    className="text-xs"
                  >
                    Not now
                  </Button>
                </div>
              </div>
              <button
                onClick={handleDismissInstall}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Prompt */}
      <AnimatePresence>
        {swUpdateAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-green-900 dark:text-green-100">
                  Update Available
                </h3>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  A new version is available. Refresh to get the latest features.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={handleUpdateClick}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white"
                  >
                    Update Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSwUpdateAvailable(false)}
                    className="text-xs text-green-700 dark:text-green-300"
                  >
                    Later
                  </Button>
                </div>
              </div>
              <button
                onClick={() => setSwUpdateAvailable(false)}
                className="flex-shrink-0 text-green-400 hover:text-green-600 dark:hover:text-green-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Status Indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded z-40">
          PWA: {isInstalled ? 'Installed' : 'Not Installed'}
        </div>
      )}
    </>
  );
}