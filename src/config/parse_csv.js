import fs from 'fs';
import path from 'path';

const csvFilePath = 'd:\\@work\\applifix\\Book1.csv';
const jsonOutputPath = 'd:\\@work\\applifix\\src\\config\\tenants.json';

function cleanBrandName(name) {
  if (!name) return 'Apple Client';
  let cleaned = name.trim();
  // If the brand name is completely uppercase, convert it to Title Case for better UI presentation
  if (cleaned === cleaned.toUpperCase() && /[A-Z]/.test(cleaned)) {
    cleaned = cleaned
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return cleaned;
}

const clientVideosMapping = {
  "thephonea7k2": [
    { id: "_rdkox1JWbg", title: "iPhone Screen Glass Replacement" },
    { id: "wx0NVEfHDRA", title: "Premium Display Restoration" },
    { id: "qpV_DXL28pY", title: "Surgical Motherboard Microsoldering" },
    { id: "Q_7SKGRcJO4", title: "iPad Touch Screen Refurbishment" },
    { id: "NZIEmMKH9pk", title: "Apple Watch Glass Restoration" },
    { id: "J5pLTPYbXbM", title: "iPhone Battery Swap & Diagnostic" }
  ],
  "mtrmobilem9q4": [
    { id: "4NaAfHP63yA", title: "iPhone Broken Screen Restoration" },
    { id: "XfX_5gcoN_U", title: "Apple iPad Glass Refurbishing" },
    { id: "ZeEgojTA57s", title: "Watch Series Repair & Touch Fix" },
    { id: "FQq_LMO-FNA", title: "Motherboard Microsoldering Service" },
    { id: "jDcjpGkqmBI", title: "High-Quality Back Glass Repair" },
    { id: "-fHXif1090A", title: "Speaker & Battery Replacements" }
  ],
  "bunnypratapt3x8": [
    { id: "YhwsUUDz9eo", title: "iPhone 15 Pro Max Restoration" },
    { id: "SE6y-5IxCkQ", title: "Premium Display Glass Repair" },
    { id: "BgCFXnOHJEQ", title: "iPad Screen & Digitizer Rebuild" },
    { id: "wySl27uXNPQ", title: "Apple Watch Screen Overlay Fix" },
    { id: "JBWBNgf-MFs", title: "Microsoldering IC Repair Process" },
    { id: "rz2F5H1Cb_c", title: "Water Damage Diagnostic & Cleanup" }
  ],
  "hussainfixr6p1": [
    { id: "KUjXNbb84W0", title: "iPhone Screen Refurbishing Process" },
    { id: "scp0Silyork", title: "Apple Watch Re-Glass Demonstration" },
    { id: "COlsGDWfVPI", title: "iPad Digitizer & Glass Restoration" },
    { id: "pKfaEnEAuok", title: "Logic Board Microsoldering IC Fix" },
    { id: "sB0wG1OjFw0", title: "Back Glass Laser Separation Repair" },
    { id: "kTfzMIS-pV4", title: "Battery Health Replacement Service" }
  ],
  "mobileguruh5z9": [
    { id: "ePGWg4k0vac", title: "Premium Display Restoration Process" },
    { id: "LOsstnyVl-Q", title: "Apple Watch Series Touch Refurbish" },
    { id: "QjMEYOSTnAw", title: "iPad Pro Screen Panel Repair" },
    { id: "DqwYtdY5DhU", title: "Micro-Soldering Logic Board Fix" },
    { id: "GqJs6vh-9xk", title: "Rear Glass Damage Repair Showcase" },
    { id: "eewjl4t8j4w", title: "Same-Day Battery Diagnostic Swap" }
  ]
};

function parseCSV(csvText) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped double quote
          currentField += '"';
          i++; // skip next quote
        } else {
          // End of quoted field
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentLine.push(currentField.trim());
        currentField = '';
      } else if (char === '\r' || char === '\n') {
        currentLine.push(currentField.trim());
        currentField = '';
        if (currentLine.some(field => field !== '')) {
          lines.push(currentLine);
        }
        currentLine = [];
        // Handle CRLF
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentField += char;
      }
    }
  }
  
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some(field => field !== '')) {
      lines.push(currentLine);
    }
  }

  return lines;
}

try {
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');
  const rows = parseCSV(csvData);
  
  const headers = rows[0].map(h => h.trim());
  const clientData = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Skip empty rows or rows without a Vercel subdomain
    const vercelIndex = headers.indexOf('Vercel');
    if (!row[vercelIndex]) continue;

    const entry = {};
    headers.forEach((header, idx) => {
      let val = row[idx] || '';
      // Clean up whitespace
      val = val.trim();
      entry[header] = val;
    });

    // Post-process fields for easier consumption
    const vercelDomain = entry['Vercel'];
    if (!vercelDomain) continue;

    // Extract subdomain (e.g. targetA7K2.ip360.in -> targetA7K2)
    const subdomain = vercelDomain.split('.')[0].toLowerCase();

    // Clean phone number (take first one for raw dial links, keep list for display)
    const rawPhones = entry['Phone NO. '] || entry['Phone NO.'] || '';
    const phoneList = rawPhones.split(',').map(p => p.trim()).filter(Boolean);
    const phoneDisplay = phoneList.join(', ') || '+91 97798 71674';
    const firstPhone = phoneList[0] || '9779871674';
    // Remove non-digit characters for tel href links
    const phoneRaw = firstPhone.replace(/\D/g, '');

    // Format address and city
    const address = entry['Address'] || 'Online / Courier Repair Service';
    
    // Infer city from address if possible
    let city = 'Delhi';
    if (address.toLowerCase().includes('delhi')) {
      city = 'Delhi';
    } else if (address.toLowerCase().includes('uttarakhand')) {
      city = 'Uttarakhand';
    } else if (address.toLowerCase().includes('hyderabad')) {
      city = 'Hyderabad';
    } else if (address.toLowerCase().includes('telangana')) {
      city = 'Hyderabad';
    } else if (address.toLowerCase().includes('bengaluru')) {
      city = 'Bengaluru';
    } else if (address.toLowerCase().includes('bangalore')) {
      city = 'Bengaluru';
    } else if (address.toLowerCase().includes('karnataka')) {
      city = 'Bengaluru';
    } else if (address.toLowerCase().includes('mumbai')) {
      city = 'Mumbai';
    } else if (address.toLowerCase().includes('maharashtra')) {
      city = 'Mumbai';
    } else if (address.toLowerCase().includes('lucknow')) {
      city = 'Lucknow';
    } else if (address.toLowerCase().includes('uttar pradesh')) {
      city = 'Lucknow';
    }

    // Infer state
    let state = 'Delhi';
    if (city === 'Hyderabad') state = 'Telangana';
    else if (city === 'Bengaluru') state = 'Karnataka';
    else if (city === 'Mumbai') state = 'Maharashtra';
    else if (city === 'Lucknow') state = 'Uttar Pradesh';
    else if (city === 'Uttarakhand') state = 'Uttarakhand';

    // Parse email list
    const emails = (entry['Mail '] || entry['Mail'] || '').split(',').map(e => e.trim()).filter(Boolean);
    const emailDisplay = emails[0] || 'xyz@gmail.com';

    clientData.push({
      id: subdomain,
      hostname: vercelDomain.toLowerCase(),
      brandName: cleanBrandName(entry['Name']),
      city: city,
      state: state,
      country: 'India',
      address: address,
      phone: phoneDisplay,
      phoneRaw: phoneRaw.startsWith('91') && phoneRaw.length > 10 ? phoneRaw : `91${phoneRaw}`,
      whatsapp: phoneRaw.startsWith('91') && phoneRaw.length > 10 ? phoneRaw : `91${phoneRaw}`, // Default WhatsApp to primary phone number
      email: emailDisplay,
      instagram: entry['Instagram'] || 'https://www.instagram.com',
      facebook: entry['Facebook'] || 'https://www.facebook.com',
      youtube: entry['Youtube Account'] || 'https://www.youtube.com',
      mapsUrl: entry['Google Maps'] || '',
      walkInLocationName: `${city} Center`,
      sameDayAvailable: true,
      logoUrl: '/image.png',
      videos: clientVideosMapping[subdomain] || [],
    });
  }

  // Save the result as JSON
  fs.writeFileSync(jsonOutputPath, JSON.stringify(clientData, null, 2), 'utf-8');
  console.log(`Successfully parsed ${clientData.length} tenants and saved to tenants.json`);
} catch (err) {
  console.error('Error parsing CSV:', err);
}
