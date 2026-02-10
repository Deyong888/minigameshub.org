
import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://feeds.gamepix.com/v2/json?sid=GM8A7&pagination=96&page=1';
const outputPath = path.join(process.cwd(), 'src', 'data', 'gamepix.json');

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
        // Just validate it's JSON
        JSON.parse(data);
        fs.writeFileSync(outputPath, data);
        console.log('Successfully fetched and saved gamepix.json');
    } catch (e) {
        console.error('Failed to parse JSON:', e);
        process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching data:', err);
  process.exit(1);
});
