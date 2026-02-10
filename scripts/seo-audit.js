
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../src/data/gamepix.json');

function audit() {
    if (!fs.existsSync(DATA_FILE)) {
        console.error('Data file not found:', DATA_FILE);
        return;
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const items = data.items || [];
    
    console.log(`Auditing ${items.length} games...\n`);

    const issues = {
        shortTitle: [],
        longTitle: [],
        missingDescription: [],
        shortDescription: [],
        duplicateTitles: {},
    };

    items.forEach(game => {
        // Title checks
        if (!game.title) issues.shortTitle.push({ id: game.id, val: '[MISSING]' });
        else if (game.title.length < 5) issues.shortTitle.push({ id: game.id, val: game.title });
        else if (game.title.length > 60) issues.longTitle.push({ id: game.id, val: game.title });

        // Description checks
        if (!game.description) issues.missingDescription.push(game.id);
        else if (game.description.length < 50) issues.shortDescription.push({ id: game.id, val: game.description });

        // Duplicate check
        if (game.title) {
            issues.duplicateTitles[game.title] = (issues.duplicateTitles[game.title] || 0) + 1;
        }
    });

    // Report
    console.log('--- REPORT ---');
    console.log(`Short Titles (<5 chars): ${issues.shortTitle.length}`);
    issues.shortTitle.forEach(i => console.log(`  - [${i.id}] ${i.val}`));

    console.log(`\nLong Titles (>60 chars): ${issues.longTitle.length}`);
    issues.longTitle.forEach(i => console.log(`  - [${i.id}] ${i.val}`));

    console.log(`\nMissing Descriptions: ${issues.missingDescription.length}`);
    issues.missingDescription.forEach(id => console.log(`  - [${id}]`));
    
    console.log(`\nShort Descriptions (<50 chars): ${issues.shortDescription.length}`);
    issues.shortDescription.forEach(i => console.log(`  - [${i.id}] ${i.val}`));

    const duplicates = Object.entries(issues.duplicateTitles).filter(([, v]) => v > 1);
    console.log(`\nDuplicate Titles: ${duplicates.length}`);
    duplicates.forEach(([k, v]) => console.log(`  - "${k}": ${v} times`));

    console.log('\n--- END AUDIT ---');
}

audit();
