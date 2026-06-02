import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Read IndexNow key from .env
const envPath = path.join(ROOT, '.env');
let KEY = null;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const keyMatch = envContent.match(/INDEXNOW_KEY=(.+)/);
  KEY = keyMatch ? keyMatch[1].trim() : null;
}

if (!KEY) {
  console.error('❌ INDEXNOW_KEY not found in .env');
  process.exit(1);
}

const HOST = 'zahnarztpraxis-schwabing.de';
const BASE_URL = `https://${HOST}`;

// URLs to submit (all main pages)
const URLS = [
  '/',
  '/team.html',
  '/leistungen.html',
  '/leistung.html',
  '/neupatienten.html',
  '/praxistour.html',
  '/impressum.html',
  '/datenschutz.html'
].map(path => `${BASE_URL}${path}`);

async function submitToIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: URLS
  };

  try {
    console.log(`📤 Submitting ${URLS.length} URLs to IndexNow...`);

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 200) {
      console.log(`✅ IndexNow: ${URLS.length} URLs submitted to Bing/Yandex/Naver/Seznam/Yep`);
    } else if (response.status === 202) {
      console.log(`✅ IndexNow: Request accepted (${URLS.length} URLs)`);
    } else {
      const text = await response.text();
      console.error(`❌ IndexNow failed: ${response.status} ${response.statusText}`);
      console.error(`Response: ${text}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ IndexNow error: ${error.message}`);
    process.exit(1);
  }
}

submitToIndexNow();
