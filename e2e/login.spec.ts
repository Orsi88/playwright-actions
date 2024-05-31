import { test, expect, Page } from '@playwright/test';

test('usuário obrigatório', async ({ page }) => {
  await login(page, '', 'senha123')
  await toast(page, 'Informe o seu nome de usuário!')

  await page.waitForTimeout(3000)
});

test('senha obrigatória', async ({ page }) => {
  await login(page,'qa', '')
  await toast(page, 'Informe a sua senha secreta!')

  await page.waitForTimeout(3000)
})

test('usuário não existe', async ({ page }) => {
  await login(page,'teste', 'teste')
  await toast(page, 'Oops! Credenciais inválidas :(')

  await page.waitForTimeout(3000)
})

test('senha incorreta', async ({ page }) => {
  await login(page,'qa', 'teste')
  await toast(page, 'Oops! Credenciais inválidas :(')

  await page.waitForTimeout(3000)
})

test('com sucesso', async ({ page }) => {
  await login(page,'qa', 'xperience')
  await modal(page, 'Suas credenciais são válidas :)')

  await page.waitForTimeout(3000)
})

const toast = async (page: Page, message: string) => {
  const target = page.locator('div[role=status]')
  await expect(target).toHaveText(message);

  await page.waitForTimeout(3000)
}

const modal = async (page: Page, message: string) => {
  const target = page.locator('.swal2-html-container')
  await expect(target).toHaveText(message);

  await page.waitForTimeout(3000)
}

const login = async (page: Page, user: string, pass: string) => {
    await page.goto('/')

    const username = page.locator('[name=user]')
    const password = page.locator('[name=pass]')

    user 
      ? await username.fill(user) : null

    pass
      ? await password.fill(pass) : null

    await page.click('css=button >> text=Entrar')

    await page.waitForTimeout(3000)
}

