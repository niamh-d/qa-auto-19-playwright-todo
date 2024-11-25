import { Locator, Page } from '@playwright/test'

const url = 'https://todo-app.tallinn-learning.ee/'

export default class MainPage {
  readonly page: Page
  readonly url: string
  readonly inputField: Locator
  readonly toDoItem: Locator
  readonly deleteButton: Locator

  constructor(page: Page) {
    this.page = page
    this.url = url
    this.inputField = page.getByTestId('text-input')
    this.toDoItem = page.getByTestId('todo-item-label')
    this.deleteButton = page.getByTestId('todo-item-button')
  }

  async open(): Promise<void> {
    await this.page.goto(this.url)
  }
}
