
const fs = require('fs');
const path = require('path');

const walk = function(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.astro')) {
                results.push(file);
            }
        }
    });
    return results;
};

const files = walk(path.join(__dirname, 'src/pages'));
let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const oldTag = '<script type="application/ld+json" set:html={JSON.stringify(schema)} />';
    const newTag = '<script is:inline type="application/ld+json" set:html={JSON.stringify(schema)} />';
    
    if (content.includes(oldTag)) {
        content = content.replace(oldTag, newTag);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
        count++;
    }
});

console.log(`Total files updated: ${count}`);
