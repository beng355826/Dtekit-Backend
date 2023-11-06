const request = require("supertest");
const app = require("../app");
const sorted = require("jest-sorted");

describe('upload photo - (POST /api/pics/upload)', () => {

it('should upload the test photo and return the a success message', () => {

    return request(app)
    .post('/api/pics/upload')
    .expect(201)
    .field('year', '2023')
    .field('setting' , 'chilling' )
    .attach('image', `${__dirname}/testPic.jpg`).then(({body}) => {
        expect(body).toEqual({msg: 'file uploaded'});
    })
});

it('error 400 - a required field is missing', () => {

    return request(app)
    .post('/api/pics/upload')
    .expect(400)
    .field('year', '2023')
    .attach('image', `${__dirname}/testPic.jpg`).then(({body}) => {
        expect(body).toEqual({ error: "400 - not valid request" });
    })
    
});

it('error 400 - the file is not attached', () => {

    return request(app)
    .post('/api/pics/upload')
    .expect(400)
    .field('year', '2023')
    .field('setting' , 'chilling' )
    .then(({body}) => {
        expect(body).toEqual({ error: "400 - not valid request" });
    })
    
});

});

describe('Get photos + queries (GET /api/pics)', () => {
    
    it('should get ALL the photos', () => {
        
        return request(app)
        .get('/api/pics')
        .expect(200)
        .then(({body}) => {

            expect(body.length).toBeGreaterThan(10);
            body.forEach((pic) => {

                expect(pic).toHaveProperty('year');
                expect(pic).toHaveProperty('setting');
                expect(pic).toHaveProperty('name');
                expect(pic).toHaveProperty('publicUrl');

            })
        })

    });

    it('should get all photos filtered by year', () => {
        
        return request(app)
        .get('/api/pics?year=2022')
        .expect(200)
        .then(({body}) => {

            body.forEach((pic) => {

                expect(pic).toHaveProperty('year', '2022');
                expect(pic).toHaveProperty('setting');
                expect(pic).toHaveProperty('name');
                expect(pic).toHaveProperty('publicUrl');

            })
        })

    });

    it('should get all photos filtered by setting', () => {
        
        return request(app)
        .get('/api/pics?year=2022&setting=chilling')
        .expect(200)
        .then(({body}) => {

            body.forEach((pic) => {
                expect(pic).toHaveProperty('year', '2022');
                expect(pic).toHaveProperty('setting', 'chilling');
                expect(pic).toHaveProperty('name');
                expect(pic).toHaveProperty('publicUrl');
            })
        })

    });

    it('should get all photos when order is queried', () => {
        
        return request(app)
        .get('/api/pics?order=asc')
        .expect(200)
        .then(({body}) => {

            const parsed = body.map((pic) => {
                pic.year = parseInt(pic.year)
                return pic
            })

            expect(parsed).toBeSortedBy("year", { ascending: true });
        })

    });


    it('should get photos paginated if requested', () => {
        
        return request(app)
        .get('/api/pics?p=0')
        .expect(200)
        .then(({body}) => {

            expect(body.length).toEqual(10);
            
        })

    });

    it('error - empty array if  invalid year', () => {
        
        return request(app)
        .get('/api/pics?year=2028')
        .expect(200)
        .then(({body}) => {

           expect(body).toEqual([]);
        })
    });

    it('error - empty array if invalid setting', () => {
        
        return request(app)
        .get('/api/pics?setting=havingabadtime')
        .expect(200)
        .then(({body}) => {
           expect(body).toEqual([]);
        })
    });

    it('error - 404 if an invalid order is presented', () => {
        
        return request(app)
        .get('/api/pics?order=backtofront')
        .expect(400)
        .then(({body}) => {
           expect(body).toEqual({ error: "400 - not valid request" });
        })

    });

    it('error - 400 if an invalid key is presented', () => {
        
        return request(app)
        .get('/api/pics?NOTAKEY=chilling')
        .expect(400)
        .then(({body}) => {
           expect(body).toEqual({ error: "400 - not valid request" });
        })

    });


});