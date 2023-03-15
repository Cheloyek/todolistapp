describe('app', () => {
    it('addItemForm base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=example-additemform--basic')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
    it('App base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=example-appwithredux--app-stories')
        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    })
    it('Task base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=example-task--task-stories')
        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    })
    it('TodoList base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=example-todolist--todo-list-stories')
        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    })
})

// describe('addItemForm', () => {
//     it('base example, visually looks correct', async () => {
//         await page.goto('http://localhost:6006/iframe.html?id=example-additemform--primary')
//         const image = await page.screenshot()
//
//         // API from jest-image-snapshot
//         expect(image).toMatchImageSnapshot()
//     })
// })

//
// import initStoryshots from '@storybook/addon-storyshots';
// initStoryshots();


