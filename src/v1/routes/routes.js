module.exports = function (app) {
    /* AUTHORIZATION */
    require('../authorization/routes')(app);
    require('../students/profile/routes')(app)
    require('../education/routes')(app)
    require('../address/routes')(app)
    require('../teacher/profile/routes')(app)
   require('../attendance/routes')(app)
   require('../subject/routes')(app)
    
}