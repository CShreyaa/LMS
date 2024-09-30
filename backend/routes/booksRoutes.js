const express = require("express");
const router = express.Router();
const bookModel = require("../models/booksModel");
const { protect } = require("../middleware/authenticate");


//Post request
router.post("/add",async(req,res)=>{
    try{
        const newBook=new bookModel(req.body);
        await newBook.save().then(()=>{
            res.status(200).json({message:"Book Added Succesfully"});
        });
    }catch(error){
        console.log(error);
    }
})


//Get request
router.get("/getBooks",async(req,res)=>{
    let books;
    try{
        books=await bookModel.find();
        res.status(200).json({books});
    }catch(error){
        console.log(error);
    }
});


//Get request with id
router.get("/getBooks/:id", async(req,res)=>{
    let book;
    const id=req.params.id;
    try{
        book=await bookModel.findById(id);
        res.status(200).json({book});
    }catch(error){
        console.log(error);
    }
});


//Update books by id
router.put("/updateBooks/:id", async (req, res) => {
    const id = req.params.id;
    const { bookname, description, author, image, price } = req.body;
    try {
      const book = await bookModel.findByIdAndUpdate(id, {
        bookname,
        description,
        author,
        image,
        price
      }, { new: true }); // This option returns the updated document
      res.status(200).json({ message: "Data Updated", book });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating book" });
    }
  });
  


//Delete book by id
router.delete("/deleteBook/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await bookModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting book" });
    }
  });
  

module.exports=router;