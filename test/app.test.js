const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const apps = require('../appsList.js');

describe('playstore app', () => {
    it('should return array of apps from GET /apps', () => {
        return supertest(app)
            .get('/apps')
            .query({})
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal(apps)
                expect(res.body).to.be.an('array')
                expect(res.body)
                .to.have.lengthOf(apps.length)
            });
    });
    it('should display correct data based on genres request query', () => {
        return supertest(app)
            .get('/apps')
            .query({
                Genres: 'Action' 
            })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body[0]).to.have.property('Genres').that.include('Action')
            });
    });
    it('should return message if provided genres req.query is not a valid genre', () => {
        return supertest(app)
            .get('/apps')
            .query({
               genres: 'drama' 
            })
            .expect(400, 'genre not valid')
    })
    it('should return alphbeticly sorted data when sort request query is app', () => {
        return supertest(app)
            .get('/apps')
            .query({
                sort: app
            })
            .expect(200)
            .then(res => {
                expect(res.body[0]).to.have.property('App').that.include('Angry Birds Rio')
                // expect(res.body[4]).to.have.property('App').that.include('Candy Crush Saga')
            })
    })
    it('should sort data from lowest to highest number when sort request query is rating', () => {
        return supertest(app)
            .get('/apps')
            .query({
                sort: Rating
            })
            .expect(200)
            .then(res => {
                expect(res.body[0]).to.have.property('Rating').to.deep.equal.to(4.2)
            })
    })
    it('should return message if provided sort req.query is not a valid sort', () => {
        return supertest(app)
            .get('/apps')
            .query({
               sort: 'year' 
            })
            .expect(400, 'Sort must be one of app or rating')
    })

})