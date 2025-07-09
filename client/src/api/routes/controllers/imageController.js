const fs = require('fs');
const {spawn} = require('child_process');

exports.handleScreenshot = (image, callback) => {
    // Изтрий стария screenshot.jpg, ако съществува
    try { fs.unlinkSync('screenshot.jpg'); } catch (e) {}

    // Премахване на "data:image/png;base64," от началото на изображението
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    // Записване на изображението в PNG файл
    fs.writeFile('screenshot.png', base64Data, 'base64', (err) => {
        if (err) {
            console.error('Грешка при запис на изображението:', err);
            callback('Грешка при запис на изображението');
            return;
        }

        // Изпълнение на Python скрипта за обработка на изображението със spawn
        const py = spawn('python', ['face_live.py']);
        let result = '';
        py.stdout.on('data', (data) => {
            result += data.toString();
        });
        py.stderr.on('data', (data) => {
            // игнорирай warning-и
        });
        py.on('close', (code) => {
            if (result.trim()) {
                console.log(`Резултат от скрипта: ${result}`);
                callback(result.trim());
            } else {
                callback('Грешка при изпълнение на скрипта');
            }
        });
    });
}