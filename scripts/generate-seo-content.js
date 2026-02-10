import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../src/data/gamepix.json');

// Helper to generate rich HTML content
function generateRichContent(game) {
    const category = game.category || 'online';
    const title = game.title;
    
    // Simulate features based on category
    const features = [
        `Play ${title} online for free`,
        `No download or installation required`,
        `Works on mobile, tablet, and desktop`,
        `Addictive ${category} gameplay`,
        `Compete for high scores`
    ];

    // Generate specific tips based on category (Simple logic)
    let tips = "Focus on the objective and time your moves carefully.";
    if (['puzzle', 'logic', 'sudoku'].some(c => category.toLowerCase().includes(c))) {
        tips = "Take your time to analyze the board before making a move. Look for patterns and plan ahead.";
    } else if (['action', 'arcade', 'runner'].some(c => category.toLowerCase().includes(c))) {
        tips = "Reflexes are key! Keep your eyes on the upcoming obstacles and react quickly.";
    } else if (['strategy', 'defense'].some(c => category.toLowerCase().includes(c))) {
        tips = "Manage your resources wisely and upgrade your units whenever possible.";
    }

    return `
        <h2>About ${title}</h2>
        <p>${game.description || `Play ${title}, a fun ${category} game on MiniGamesHub.`}</p>
        <p><strong>${title}</strong> is an exciting <a href="/category/${category.toLowerCase().replace(/\s+/g, '-')}">${category}</a> game that you can play directly in your browser. Whether you're at home, school, or work, you can enjoy this game without any downloads or installations. It's fully optimized for all devices, including mobile phones and tablets.</p>

        <h3>How to Play ${title}?</h3>
        <p>The goal of <strong>${title}</strong> is simple but challenging. ${tips}</p>
        <p>Controls are intuitive: use your mouse or touch screen to interact. On desktop, you can often use keyboard arrows or WASD for movement.</p>

        <h3>Game Features</h3>
        <ul>
            ${features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h3>Why Play on MiniGamesHub?</h3>
        <p>MiniGamesHub offers a vast collection of free online games, including the best ${category} games. We ensure all games are unblocked and safe to play anywhere. Join thousands of players enjoying <strong>${title}</strong> today!</p>
    `;
}

function generateSeoContent() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error('Data file not found:', DATA_FILE);
        return;
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    let updatedCount = 0;

    data.items.forEach(game => {
        let changed = false;

        // Ensure slug exists
        if (!game.slug) {
             game.slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
             changed = true;
        }

        // Generate rich content if missing
        if (!game.rich_content) {
            console.log(`Generating rich content for: ${game.title}`);
            game.rich_content = generateRichContent(game);
            changed = true;
        }
        
        // Ensure description is meta-friendly (truncate if too long, though we generally want to keep original if good)
        // If description is missing, generate one
        if (!game.description || game.description.length < 20) {
             const category = game.category || 'online';
             game.description = `Play ${game.title} online for free. This popular ${category} game requires no download. Experience the best browser games on MiniGamesHub!`;
             changed = true;
        }

        if (changed) {
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
