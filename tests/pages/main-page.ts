import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

const url = 'https://todo-app.tallinn-learning.ee/'

export default class MainPage {
  readonly page: Page
  readonly url: string
  readonly inputField: Locator
  readonly toDoItem: Locator
  readonly deleteButton: Locator
  readonly activeToggle: Locator
  readonly activeLink: Locator

  constructor(page: Page) {
    this.page = page
    this.url = url
    this.inputField = page.getByTestId('text-input')
    this.toDoItem = page.getByTestId('todo-item-label')
    this.deleteButton = page.getByTestId('todo-item-button')
    this.activeToggle = page.getByTestId('to-do-item-toggle')
    this.activeLink = page.getByRole('link', { name: /active/i })
  }

  public async open(): Promise<void> {
    await this.page.goto(this.url)
  }

  public async deleteTask(): Promise<void> {
    await this.toDoItem.hover()
    await this.deleteButton.click()
  }

  private async countItems(item: Locator): Promise<number> {
    return await item.count()
  }

  public async verifyCountItems(item: Locator, expectedCount: number): Promise<void> {
    const actual = await this.countItems(item)
    expect.soft(actual).toBe(expectedCount)
  }

  public async createMultipleTasks(numTasks: number): Promise<void> {
    for (let i = 0; i < numTasks; i++) {
      await this.createTask()
    }
  }

  public async markAsCompleted(item: Locator): Promise<void> {
    await this.page
      .locator('.view', {
        has: item,
      })
      .getByTestId('todo-item-toggle')
      .click()
  }

  public async verifyMarkedAsCompleted(item: Locator): Promise<void> {
    const style = /line-through/
    const prop = 'text-decoration'
    await expect(item).toHaveCSS(prop, style)
  }

  public async createTask(name?: string): Promise<void> {
    if (!name) await this.inputField.fill(faker.lorem.word(6))
    else await this.inputField.fill(name)
    await this.inputField.press('Enter')
  }
}
