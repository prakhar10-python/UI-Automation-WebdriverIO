const { assert } = require("console");
const home = require("../../PageObjects/HomePage")
const fs = require('fs');
const path = require('path');



describe("Home Page Test cases", async ()=>{
    it("Verify the click on the accessibility Text",async ()=>{
        try{
            await $(`${home.accessibility}`).click();
            var accessibilityClicked = await $(`${home.accessibiltyNodeProvider}`).isExisting();
            await expect(accessibilityClicked).toEqual(true);
        }
        catch(error){
            const dirPath = './errorScreenshots/HomePage'
            if(!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath,{recursive:true})
            }
        }
        await browser.saveScreenshot(`${dirPath}/${this.test.title}-${Date.now()}.png`)
    })
})