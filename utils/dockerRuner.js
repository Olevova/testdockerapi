const { execSync } = require("child_process");
const waitOn = require('wait-on');

async function dockerRunner() {
    execSync('docker pull olevova1983/testapi:latest'); 
    const containerId  = execSync('docker run -d -p 5555:5555 olevova1983/testapi:latest');
    console.log(containerId);
    await waitOn({ resources: ['http://localhost:5555'] });
    return containerId
    
};


function stopDocker (id){
    execSync(`docker stop ${id}`);
    execSync(`docker rm ${id}`);
}

module.exports = {dockerRunner, stopDocker}