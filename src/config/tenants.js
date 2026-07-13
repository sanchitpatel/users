import tenants from './tenants.json';

export function resolveTenant() {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname.toLowerCase();

  // 1. Local development testing support (localhost or 127.0.0.1)
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    const params = new URLSearchParams(window.location.search);
    const queryTenant = params.get('tenant');
    if (queryTenant) {
      const q = queryTenant.toLowerCase();
      // Match by id or by full hostname
      const found = tenants.find(t => t.id === q || t.hostname === q);
      return found || null; // Return the matched tenant, or null if query param is invalid (triggers 404)
    }
    
    // Check if localhost itself has a subdomain (e.g., thephonea7k2.localhost:5173)
    const parts = hostname.split('.');
    if (parts.length > 1) {
      const sub = parts[0];
      if (sub !== 'localhost') {
        const found = tenants.find(t => t.id === sub || t.hostname.startsWith(sub));
        if (found) return found;
      }
    }

    // Default to the first tenant for easy local testing when no param is specified
    return tenants[0];
  }

  // 2. Production strict hostname matching
  // If the hostname exactly matches one of our whitelabel domains, return it.
  const found = tenants.find(t => t.hostname === hostname);
  if (found) {
    return found;
  }

  // Otherwise, return null to trigger the 404 page
  return null;
}
