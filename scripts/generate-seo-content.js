import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../src/data/gamepix.json');

function generateSeoContent() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error('Data file not found:', DATA_FILE);
        return;
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    let updatedCount = 0;

    data.items.forEach(game => {
        // Generate description if missing or too short
        if (!game.description || game.description.length < 20) {
            console.log(`Generating description for: ${game.title}`);
            const category = game.category || 'online';
            game.description = `Play ${game.title} online for free on MiniGamesHub. ${game.title} is a popular ${category} game that works on any device. No download required. Experience the best free ${category} games directly in your browser!`;
            updatedCount++;
        }
        
        // Ensure standard URL structure (slug)
        if (!game.slug) {
             game.slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
             updatedCount++;
        }
    });

    if (updatedCount > 0) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        console.log(`Updated ${updatedCount} games with new SEO content.`);
    } else {
        console.log('No games needed SEO updates.');
    }
}

generateSeoContent();
