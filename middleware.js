import tenants from './src/config/tenants.json';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static files (CSS, JS, images, fonts, etc. with a dot in the path)
     */
    '/((?!api|_next|assets|.*\\..*).*)',
    // also match the root path '/'
    '/',
  ],
};

export async function middleware(request) {
  const url = new URL(request.url);

  // Get the hostname to resolve the tenant
  const hostname = request.headers.get('host')?.toLowerCase() || '';

  // Find the matching tenant
  let tenant = null;
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // Local development lookup using search param
    const queryTenant = url.searchParams.get('tenant')?.toLowerCase();
    if (queryTenant) {
      tenant = tenants.find(t => t.id === queryTenant || t.hostname === queryTenant);
    }
    if (!tenant) {
      tenant = tenants[0]; // default local fallback
    }
  } else {
    // Production strict match
    tenant = tenants.find(t => t.hostname === hostname);
  }

  // Fetch the static index.html file of the deployment
  const indexUrl = new URL('/index.html', request.url);
  const response = await fetch(indexUrl);
  let html = await response.text();

  if (tenant) {
    const brand = tenant.brandName || 'xyz';
    const city = tenant.city || '';
    const state = tenant.state || '';
    const locationStr = city ? ` in ${city}${state ? `, ${state}` : ''}` : '';

    const title = `${brand} | Premium Device Repair Service${locationStr}`;
    const description = `Professional repairs by ${brand} for iPhones, Apple Watches, and smartphones. Same-day screen replacement, battery, and face ID repair with genuine parts and 1-year warranty in ${city}, ${state}.`;
    const keywords = `${brand}, ${brand} repair, phone repair ${city}, iPhone repair ${city}, screen replacement ${city}`;

    // Replace <title> tag
    html = html.replace(
      /<title>[^<]*<\/title>/i,
      `<title>${title}</title>`
    );

    // Replace description tag
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    );

    // Replace keywords tag
    html = html.replace(
      /<meta name="keywords" content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${keywords}" />`
    );

    // Replace author tag
    html = html.replace(
      /<meta name="author" content="[^"]*"\s*\/?>/i,
      `<meta name="author" content="${brand}" />`
    );

    // Replace Open Graph title & description tags
    html = html.replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`
    );

    html = html.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    );
  }

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
