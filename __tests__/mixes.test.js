const request = require("supertest");
const app = require("../app");


describe('Get mixes - (GET api/mixes)', () => {
    
    it.only('get all mixes', () => {
        
        return request(app)
        .get('/api/mixes')
        .expect(200)
        .then(({body}) => {
console.log(body);
            body.forEach(mix => {
                expect(mix).toHaveProperty('name');
                expect(mix).toHaveProperty('year');
                expect(mix).toHaveProperty('publicUrl');
            })

        })

    });

    it('get all mixes filtered by year', () => {
        
        return request(app)
        .get('/api/mixes?year=2020')
        .expect(200)
        .then(({body}) => {

            
            body.forEach(mix => {
                expect(mix).toHaveProperty('name');
                expect(mix).toHaveProperty('year', '2020');
                expect(mix).toHaveProperty('publicUrl');
            })

        })

    });

    it('error - returns empty array if year provided does not have mixes.', () => {
        
        return request(app)
        .get('/api/mixes?year=2027')
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual([]);
        })

    });

    it('error 400 - if invalid key is provided', () => {
        
        return request(app)
        .get('/api/mixes?NOTVALIDKEY=2023')
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ error: "400 - not valid request" });
        })

    });

});