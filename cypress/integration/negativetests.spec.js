describe('verify PurgoMalum Api with negative test cases', () => {

    before( function () {
        // loading test data once before all tests run.
        cy.fixture('userdata').then(function(userdata)  {
            this.userdata = userdata
        
        })
        
      });

    context('GET /read - check for more than 10 comma separated words', () => {
        it('should return an error message if providing more than 10 comma separated words in ADD parameter', function()  {
            cy.request({
                method: 'GET',
                url: Cypress.config().baseUrl + '/service/json',
                qs: this.userdata.api_requests[6]
            })
                .should((response) => {
                
                    expect(response.body.error).to.eq(this.userdata.api_requests[9].error_message_exceeds_word_limit)
                });
        });
});

context('GET /read - value of FILL-TEXT out of accepted characters', () => {
    it('should return an error message if providing value to FILL_TEXT out of accepted input characters', function() {
        cy.request({
            method: 'GET',
            url: Cypress.config().baseUrl + '/service/json',
            qs: this.userdata.api_requests[7]
        })
            .should((response) => {
                
                expect(response.body.error).to.eq(this.userdata.api_requests[9].error_message_invalid_replacement_text)
            });
    });
});

context('GET /read - value of FILL-CHAR out of accepted characters', () => {
    it('should return an error message if providing value to FILL_CHAR out of accepted input characters', function()  {
        cy.request({
            method: 'GET',
            url: Cypress.config().baseUrl + '/service/json',
            qs: this.userdata.api_requests[8]
        })
            .should((response) => {
                expect(response.body.error).to.eq(this.userdata.api_requests[9].error_message_invalid_replacement_char)
            });
    });
});


});