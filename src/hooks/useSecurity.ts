
import { useState, useCallback } from 'react';
import { RateLimiter, sanitizeInput, sanitizeUrl } from '@/utils/securityConfig';
import { toast } from 'sonner';

// Create rate limiters for different actions
const searchRateLimiter = new RateLimiter(30, 60000); // 30 searches per minute
const submitRateLimiter = new RateLimiter(5, 60000); // 5 submissions per minute

export const useSecurity = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const checkRateLimit = useCallback((action: 'search' | 'submit'): boolean => {
    const identifier = `${action}_${Date.now()}`; // Simple identifier
    let limiter: RateLimiter;
    
    switch (action) {
      case 'search':
        limiter = searchRateLimiter;
        break;
      case 'submit':
        limiter = submitRateLimiter;
        break;
      default:
        return true;
    }
    
    const allowed = limiter.isAllowed(identifier);
    
    if (!allowed) {
      setIsRateLimited(true);
      toast.error('Too many requests. Please wait a moment before trying again.');
      
      // Reset rate limit state after a delay
      setTimeout(() => setIsRateLimited(false), 5000);
    }
    
    return allowed;
  }, []);

  const sanitizeUserInput = useCallback((input: string): string => {
    return sanitizeInput(input);
  }, []);

  const sanitizeUserUrl = useCallback((url: string): string => {
    return sanitizeUrl(url);
  }, []);

  return {
    isRateLimited,
    checkRateLimit,
    sanitizeUserInput,
    sanitizeUserUrl
  };
};
