import { test, expect } from '@playwright/test'
import MainPage from '../pages/main-page'
import { faker } from '@faker-js/faker'

test.describe('Todo app', () => {
  let mainPage: MainPage

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    await mainPage.open()
  })
  test.describe('To do app tests', () => {
    test('Create a task and verify that task exists', async ({}) => {
      await mainPage.createTask()
      await expect(mainPage.toDoItem).toBeVisible()
    })

    test('Create a task, delete and verify it is not visible', async ({}) => {
      await mainPage.createTask()
      await mainPage.deleteTask()
      await expect(mainPage.toDoItem).not.toBeVisible()
    })

    test('Create multiple tasks and verify right number of existing tasks', async ({}) => {
      const expectedNumTasks = faker.number.int({ min: 2, max: 10 })
      await mainPage.createMultipleTasks(expectedNumTasks)
      await mainPage.verifyCountItems(mainPage.toDoItem, expectedNumTasks)
    })

    test('Create two tasks, check one as completed and verify active one', async ({ page }) => {
      await mainPage.createTask('first item')
      await mainPage.createTask('second item')
      await mainPage.verifyCountItems(mainPage.toDoItem, 2)
      const firstItem = page.getByTestId('todo-item-label').filter({ hasText: 'first item' })
      await mainPage.markAsCompleted(firstItem)
      await mainPage.verifyMarkedAsCompleted(firstItem)
    })
  })
})
