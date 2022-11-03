const cyLogger : boolean = false;

describe('Creating a successful payment', () => {

  const currency : string = 'PHP';
  const value : number = 100;
  const vendor : string = "Valve";

  it('Generating a payment method', () => {
    cy.visitPlayground();
    cy.get('select[name="method_id"][id="1444313837_9703_8740_method_id"]')
      .select('1134',{ force:true })
      .should('have.value', '1134');

    cy.get('input[name="amount"][id="1444313837_9703_8740_amount"]')
      .click({ force:true })
      .clear()
      .type(value.toString());

    cy.get('select[name="currency"][id="1444313837_9703_8740_currency"]')
      .select(currency, { force:true })
      .should('contain',"PHP - Philippines Peso");

    cy.get('input[name="s2p_payment_submit"][id="s2p_payment_submit_1444313837_9703_8740"]')
      .click()

  })
  it('checks Order Summary details and display of QR code',  () => {
    cy.wait(3000);
    cy.url()
      .should('contain','https://render.alipay.com/', { timeout: 5000 });

    cy.get('div.order').then( (orderDiv) => {
      cy.wrap(orderDiv, { log:cyLogger })
        .find('div')
        .contains('Pay to')
        .siblings().eq(0)
        .should('contain',vendor)

      cy.wrap(orderDiv, { log:cyLogger })
        .find('div')
        .contains('Order amount')
        .siblings().eq(0)
        .should('contain',currency)
        .find('span')
        .invoke('text')
        .should('contain',`${Math.floor(value/100)}`)
    })

    cy.get('div[id="qrcode"]')
      .find('canvas')
      .should('be.visible')
      .click({force:true})
  })

  it('verifies landing on Result Page with successful outcome', () => {
    cy.wait(3000);
    cy.get('div.body_bottom', { timeout:5000 })
    .find('p')
    .should('have.text','Payment successful')
  })

  it('checks Transaction Return Page for Success', () => {
    //TODO: trying out a hacky workaround.. Playwright? :)
    cy.fixture('uiUrls.json').then( url => {
      cy.intercept('GET',`${url.TRP_URL}*`), (req:any) => {
        req.continue( (res:ITransactionReturnPage) => {
          expect(res.data).to.not.be.NaN;
          expect(res.MerchantTransactionID).to.not.be.null;

          cy.visit(`${url.TRP_URL}/?data=${res.data}&MerchantTransactionID=${res.MerchantTransactionID}`)
              .get('tbody')
              .contains('td', 'Status')
              .siblings().eq(0)
              .invoke('text')
              .should('contain','Success');
              //TODO: check random path 'Pending on Provider'
        })
      }
    })
  })
})
