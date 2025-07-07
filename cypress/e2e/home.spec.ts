describe('Home Page E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('載入頁面應顯示 header', () => {
    cy.contains('Change Color').should('be.visible')
  })

  it('切換主題並驗證 localStorage', () => {
    cy.get('.btn-blue-switch').click()

    cy.window().then((win) => {
      const theme = win.localStorage.getItem('theme')
      expect(theme).to.eq('blue')
      expect(win.document.documentElement.dataset.theme).to.eq('blue')
    })

    cy.get('.btn-none-switch').click()

    cy.window().then((win) => {
      const theme = win.localStorage.getItem('theme')
      expect(theme).to.eq('none')
      expect(win.document.documentElement.dataset.theme).to.equal(undefined)
    })
  })


  it('點擊 icon 展開側邊欄，再點擊關閉', () => {
    cy.get('.base-bars-icon').click()
    cy.get('.absolute.bg-zinc-800').should('have.class', 'translate-x-0')

    cy.get('.fa-xmark').click()
    cy.get('.absolute.bg-zinc-800').should('have.class', '-translate-x-52')
  })

  it('切換第三個 action bar 類型並驗證 active class', () => {
    cy.get('.action-bar-btn').eq(2).click()
    cy.get('.action-bar-btn').eq(2).should('have.class', 'active')
  })

  it('應包含預設的 10 個項目 A ~ J', () => {
    const expectedItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    expectedItems.forEach((item) => {
      cy.get('.grid-item').contains(item)
    })
  })
})
