const {test,expect} = require('@playwright/test')
test ('firsttestin playwright',async({page}) =>{
    await page.goto('https://google.com')
    await expect(page).toHaveTitle('Goolge')
})

