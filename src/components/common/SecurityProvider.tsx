
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { generateCSPHeader } from '@/utils/securityConfig';

interface SecurityContextType {
  cspEnabled: boolean;
}

const SecurityContext = createContext<SecurityContextType>({ cspEnabled: false });

export const useSecurityContext = () => useContext(SecurityContext);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  useEffect(() => {
    // Apply CSP header if not already set
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!metaCSP) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = generateCSPHeader();
      document.head.appendChild(meta);
    }

    // Add additional security measures
    const metaXFrame = document.querySelector('meta[http-equiv="X-Frame-Options"]');
    if (!metaXFrame) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'X-Frame-Options';
      meta.content = 'DENY';
      document.head.appendChild(meta);
    }

    // Log security setup in development
    if (import.meta.env.DEV) {
      console.log('Security headers applied');
    }
  }, []);

  return (
    <SecurityContext.Provider value={{ cspEnabled: true }}>
      {children}
    </SecurityContext.Provider>
  );
};
