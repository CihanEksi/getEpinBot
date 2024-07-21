const fs = require('fs');
const prettier = require('prettier');

const formatFiles = async () => {
    const files = await fs.promises.readdir('.');
    for (const file of files) {
        if (file.endsWith('.js') || file.endsWith('.ts')) {
            const fileContent = await fs.promises.readFile(file, 'utf8');
            const formattedContent = prettier.format(fileContent, {
                filepath: file,
            });
            await fs.promises.writeFile(file, formattedContent, 'utf8');
        }
    }
};

formatFiles();
