import { Locator, Page } from '@playwright/test'

const url = 'https://todo-app.tallinn-learning.ee/'

export default class LoginPage {
    readonly page: Page
    readonly url: string
    readonly inputField: Locator

    constructor(page: Page) {
        this.page = page
        this.url = url
        this.inputField = page.getByTestId('text-input')
    }

    async open(): Promise<void> {
        await this.page.goto(this.url)
    }
}