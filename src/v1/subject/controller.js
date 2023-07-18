const { response } = require("express");
const { message } = require("statuses");
const serviceResponse = require("../helper/serviceResponse");
const { Subjects } = require("./model")
const addAndUpdateSubject = async (req, res) => {
  try {
    const { class_Name, volumeNo,chapter_Name,chapterDetails_Name,subject_Name } = req.body
    const addClass = await Subjects.findOneAndUpdate(
      { $and:[{class_Name: class_Name},{subject_Name:subject_Name}] },
      { ...req.body, createdBy: req.userId, updatedBy: req.userId, userId: req.userId },
      { upsert: true, new: true });
      let existVolume = addClass.volume.find(volume => volume.volumeNo === volumeNo);
      if (!existVolume) {
        
          addClass.volume.push({ volumeNo: volumeNo, chapter: [{ chapter_Name: chapter_Name, chapterDetails: [{ chapterDetails_Name: chapterDetails_Name }] }] });
      } else {
          let existChapter = existVolume.chapter.find(c => c.chapter_Name === chapter_Name);
          if (!existChapter) {
              existVolume.chapter.push({ chapter_Name: chapter_Name, chapterDetails: [{ chapterDetails_Name: chapterDetails_Name }] });
          } else  {
              existChapter.chapterDetails.push({ chapterDetails_Name: chapterDetails_Name });
          }
      }
    await addClass.save();
    console.log(addClass)
    return res.status(200).send(new serviceResponse({ status: 200, data: addClass, message: "Data added successfully" }))
  }
  catch (error) {
    return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
  }
}


const getsubject = async(req,res)=>{
try {
  const {class_Name,subject_Name}=req.params
   const subjectGet= await Subjects.findOne({$and:[{class_Name:class_Name}]})
   console.log(subjectGet)
   if(subjectGet){
    return res.send(new serviceResponse({data:subjectGet, message:"subject get"}))
   }
   return res.send(new serviceResponse({ message:"subject get not fond"}))


} catch (error) {
  return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))

}
}

const removeSubject=async(req,res)=>{
  try {
    const {class_Name,subject_Name}=req.body
    const subjectExist=await Subjects.findOne({class_Name})
    if(subjectExist){
    const deleteSubject= await Subjects.findOneAndDelete({subject_Name})
    if(deleteSubject){
     return res.send(new serviceResponse({status:200, data:{subjectExist,deleteSubject},message:'Data deleted successfully'})) 
    }
    }
    return res.send(new serviceResponse({ message:"subject get not fond"}))

  } catch (error) {
    return res.send(new serviceResponse({status:500, errors:[{message:`${error.message}`}]}))
  }
}


module.exports = { addAndUpdateSubject,getsubject,removeSubject }