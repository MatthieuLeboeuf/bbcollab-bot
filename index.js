const {Builder, By, until} = require('selenium-webdriver');
const moment = require('moment');
const config = require('./config.json');
const firefox = require('selenium-webdriver/firefox');

const join = Date.parse(moment(config.time, "DD-MM-YYYY HH:mm:ss"));
const to = join-Date.now();

let i = 0;

if(config.time_bypass == "true"){
    console.log("Démarrage en mode bypass");
    startBrowser();
} else {
    if(to < 0){
        console.log("L'heure indiqué est incorrecte !");
        return false;
    }
    if(config.users.length == 1){
        console.log("La session sera lancé dans " + moment(to).format('mm,ss') + " minutes");
    } else if(config.users.length > 1) {
        console.log("Les sessions seront lancés dans " + moment(to).format('mm,ss') + " minutes");
    }
    setTimeout(startBrowser, to);
}
function startBrowser() {
    const options = new firefox.Options();
    options.setPreference("permissions.default.microphone", 1);
    options.setPreference("permissions.default.camera", 2);
    (async function firefox() {
        let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
            await driver.get(config.url);

            await driver.wait(until.elementLocated(By.name('username')), 60000);
            var input = await driver.findElement(By.name('username'));
            input.sendKeys(config.users[i][0]);

            await driver.wait(until.elementLocated(By.name('password')), 60000);
            var input = await driver.findElement(By.id('password'));
            input.sendKeys(config.users[i][1]);

            await driver.wait(until.elementLocated(By.className('submit')), 60000);
            await driver.manage().setTimeouts( { implicit: 1000 } );
            var btn = await driver.findElement(By.className('submit'));
            btn.click();

            await driver.wait(until.elementLocated(By.className('MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary')), 120000);
            await driver.manage().setTimeouts( { implicit: 1000 } );
            var btn = await driver.findElement(By.className('MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary'));
            btn.click();

            //micro
            await driver.wait(until.elementLocated(By.className('button confirm button--inverse ng-scope')), 60000);
            await driver.manage().setTimeouts( { implicit: 1000 } );
            var mic = await driver.findElement(By.className('button confirm button--inverse ng-scope'));
            mic.click();
            //video
            await driver.wait(until.elementLocated(By.id('techcheck-video-ok-button')), 60000);
            var video = await driver.findElement(By.id('techcheck-video-ok-button'));
            video.click();

            //info
            await driver.wait(until.elementLocated(By.id('announcement-modal-page-wrap')), 60000);
            var info = await driver.findElement(By.id('announcement-modal-page-wrap'));
            var info2 = await info.findElement(By.className('close'));
            info2.click();

            if(i < config.users.length-1){
                i++;
                startBrowser();
            }
    })().catch( e => { console.error(e) } );
}
  
