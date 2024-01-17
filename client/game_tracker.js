const { exec } = require('child_process');

function getActiveWindowTitle() {
    return new Promise((resolve, reject) => {
        exec('tasklist /fo csv /v', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            const processes = stdout.split('\r\n').map(line => line.split('","'));
            const activeProcess = processes.find(process => process[0] === '"Image Name"');

            if (activeProcess && activeProcess.length >= 9) {
                const windowTitle = activeProcess[8].replace(/"/g, '');
                resolve(windowTitle);
            } else {
                reject('Unable to determine active window title');
            }
        });
    });
}

function trackGameTime(gameName) {
    let startTime = null;

    setInterval(async () => {
        try {
            const activeWindowTitle = await getActiveWindowTitle();

            if (activeWindowTitle.toLowerCase().includes(gameName.toLowerCase())) {
                if (startTime === null) {
                    startTime = Date.now();
                }
            } else {
                if (startTime !== null) {
                    const endTime = Date.now();
                    const elapsedTime = (endTime - startTime) / 1000;
                    console.log(`Time spent on ${gameName}: ${elapsedTime.toFixed(2)} seconds`);
                    startTime = null;
                }
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }, 1000);
}

const gameName = prompt('Enter the name of the game you want to track:');
trackGameTime(gameName);
