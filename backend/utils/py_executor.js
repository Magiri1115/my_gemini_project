//Node.js側でPythonスクリプトを実行する処理
const { spawn } = require('child_process');

async function executePythonScript(scriptPath, ...args) {
    return new Promise( function (resolve, reject) {
        const pythonProcess = spawn('python3', [scriptPath, ...args]);
        let dataString = '';
        let errorString = '';

        pythonProcess.stdout.on function ('data', (data) {
            dataString += data.toString();
        });

        pythonProcess.stderr.on function ('data', (data) {
            errorString += data.toString();
        });

        pythonProcess.on('close', function (code) {
            if (code === 0) {
                resolve(dataString);
            } else {
                reject(new Error(`Python script exited with code ${code}: ${errorString}`));
            }
        });
    });
}

module.exports = { executePythonScript };
