describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'test-user',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test-user');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Logged in as Test User');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test-user');
      cy.get('#password').type('wrong-password');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('contain', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Logged in as Test User');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test-user', password: 'salainen' });
      cy.createBlog({
        title: 'cypress-test-blog',
        author: 'cypress',
        url: 'www.docs.cypress.io',
        likes: 0,
      });
    });

    it('a blog can be created', function () {
      cy.contains('cypress-test-blog');
    });

    it('a blog can be liked', function () {
      cy.get('.toggleDetailsButton').click();
      cy.get('.addLikeButton').click();

      cy.get('.blogLikes').should('contain', 'Likes: 1');
    });

    it('a blog can be deleted', function () {
      cy.get('.toggleDetailsButton').click();
      cy.get('.removeBlogButton').click();

      cy.should('not.contain', 'cypress-test-blog');
    });

    it('a blog cannot be deleted by a different user', function () {
      const secondUser = {
        name: 'Test User 2',
        username: 'test-user-2',
        password: 'salainen',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', secondUser);

      cy.get('.logoutButton').click();
      cy.login({ username: 'test-user-2', password: 'salainen' });

      cy.get('.toggleDetailsButton').click();
      cy.should('not.contain', '.removeBlogButton');
    });
  });

  describe('When there are multiple blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'test-user', password: 'salainen' });
      cy.createBlog({
        title: 'cypress-test-blog-1',
        author: 'cypress',
        url: 'www.docs.cypress.io',
        likes: 0,
      });
      cy.createBlog({
        title: 'cypress-test-blog-2',
        author: 'cypress',
        url: 'www.docs.cypress.io',
        likes: 1,
      });
      cy.createBlog({
        title: 'cypress-test-blog-3',
        author: 'cypress',
        url: 'www.docs.cypress.io',
        likes: 2,
      });
    });

    it.only('they are sorted by most to least number of likes', function () {
      cy.get('.blog-detail').eq(0).should('contain', 'cypress-test-blog-3');
      cy.get('.blog-detail').eq(1).should('contain', 'cypress-test-blog-2');
      cy.get('.blog-detail').eq(2).should('contain', 'cypress-test-blog-1');
    });
  });
});
