describe('Products', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('layout', () => {
    it('should have header, toolbar, main, and footer', () => {
      cy.get('.header').should('be.visible');
      cy.get('.toolbar').should('be.visible');
      cy.get('.main').should('be.visible');
      cy.get('.footer').should('be.visible');
    });
  });

  describe('header', () => {
    it('should display the title', () => {
      cy.get('.header').should('contain', 'Wishlist Challenge');
    });

    it('should display the api link', () => {
      const header = cy.get('.header').should('contain', 'API');

      return header.get('a').invoke('removeAttr', 'target').should('have.attr', 'href')
      .then((href) => {
        cy.visit(href);
      });
    });
  });

  describe('filters', () => {
    it('should display type and rating selectors, pagination, and visualization', () => {
      cy.get('.form-control choicesjs-stencil[name="typeFilter"]').should('be.visible');
      cy.get('.form-control choicesjs-stencil[name="sortingFilter"]').should('be.visible');
      cy.get('.pagination').should('be.visible');
      cy.get('.btn-group').should('be.visible');
    });
  });

  describe('products', () => {
    it('should display the list of products received from the products API', () => {
      cy.get('.main').find('.card').should('have.length', 20);
    });

    it('should display the list of products of the selected page when the page changes', () => {
      cy.get('.pagination .pagination__element--arrow--right .btn').click();

      cy.get('.main').find('.card').should('have.length', 20);
    });

    it('should change the visualization when clicking on the list view button', () => {
      cy.get('.btn-group .btn').not('.active').click();

      cy.get('.main').find('.card.card--horizontal').should('have.length', 20);
    });
  });
});
