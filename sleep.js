function Sleep(seconds) {

    console.log(`Sleeping ${seconds} seconds.`);

    return new Promise(resolve => setTimeout(() => {
        console.log('Waking back up!');
        resolve()
    }, seconds * 1000));

}

module.exports = Sleep;
