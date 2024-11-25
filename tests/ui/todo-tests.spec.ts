import { test, expect } from '@playwright/test'
import MainPage from '../pages/main-page'

test.describe('Todo app', () => {
  let mainPage: MainPage

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    await mainPage.open()
  })
  test.describe('To do app tests', () => {
    test('Create a task ad verify that task exists', async ({}) => {
      await mainPage.inputField.fill('test')
      await mainPage.inputField.press('Enter')
      await expect(mainPage.toDoItem).toBeVisible()
    })
  })
})
