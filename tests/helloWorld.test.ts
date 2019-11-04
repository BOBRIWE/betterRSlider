const expect = require('chai').expect;

it('should_be_a_string', function() {
    expect('Hello World!').to.be.a('string');
});