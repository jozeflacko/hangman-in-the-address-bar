const pause = (milliseconds) => {
    var d = new Date();
    while ((new Date()) - d <= milliseconds) { /* nothing */ }
}; 

function waitTill(condition) {
    const millisInLoop = 100;
    while(condition() === false) {
        pause(millisInLoop);
    }
}

async function pauseUsingPromise(milliseconds) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, milliseconds);
    });
}

async function waitTillWithPromise(condition) {
    while(condition() === false) {
        await pauseUsingPromise(100);
    }
}


