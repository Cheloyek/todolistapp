describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=example-additemform--primary')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

//
// import initStoryshots from '@storybook/addon-storyshots';
// initStoryshots();


