const { body } = require("express-validator");
const { verifyTeacher, verifyToken } = require("../middleware/jwtToken");
const { validateErrors } = require("../utils/utils");
const { addAndUpdateSubject, getsubject, removeSubject } = require("./controller");

module.exports=(app)=>{
    app.post('/subject/add',[
    body("class_Name","class_Name is required").trim().not().isEmpty(),
    body("subject_Name","Subject_Name is required").trim().not().isEmpty()

],validateErrors,verifyToken,verifyTeacher,addAndUpdateSubject);
app.get('/subject/get/:class_Name',getsubject);
app.delete('/removeSubject',removeSubject )
}
