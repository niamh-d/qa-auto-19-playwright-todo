import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

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

  public async open(): Promise<void> {
    await this.page.goto(this.url)
  }

  public async deleteTask(): Promise<void> {
    await this.toDoItem.hover()
    await this.deleteButton.click()
  }

  public async createMultipleTasks(numTasks: number): Promise<void> {
    for (let i = 0; i < numTasks; i++) {
      await this.createTask()
    }
  }

  public async createTask(): Promise<void> {
    await this.inputField.fill(faker.lorem.word(6))
    await this.inputField.press('Enter')
  }
}
