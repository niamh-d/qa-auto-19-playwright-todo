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

    test('Create three tasks and verify number of existing tasks', async ({}) => {
      const expectedNumTasks = faker.number.int({ min: 2, max: 10 })
      await mainPage.createMultipleTasks(expectedNumTasks)
      const actual = await mainPage.toDoItem.count()
      expect(actual).toBe(expectedNumTasks)
    })
  })
})
