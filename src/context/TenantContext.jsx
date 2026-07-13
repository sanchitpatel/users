import React, { createContext, useContext, useState, useEffect } from 'react';
import { resolveTenant } from '../config/tenants';

const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(resolveTenant());

  useEffect(() => {
    // Re-resolve if location changes or query parameters change
    const handlePopState = () => {
      setTenant(resolveTenant());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
