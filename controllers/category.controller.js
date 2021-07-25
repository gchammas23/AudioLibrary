//Require Category model and mongoose
const Category = require("../model/category");
const mongoose = require("mongoose");

//ADD CATEGORY API
exports.addCategory = (req, res) => {
  //Extract values from request's body
  const { name } = req.body;
  const { description } = req.body;

  //Create object from model with given values
  const category = new Category({
    name: name,
    description: description,
  });

  //Save category to DB
  category
    .save()
    .then((result) => {
      res.status(200).send({ result: result });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

//GET ALL CATEGORIES
exports.getCategories = (req, res) => {
  Category.find()
    .then((result) => {
      res.status(200).send({ categories: result });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

//GET CATEGORY BY ID
exports.getCategoryById = (req, res) => {
  //Get id from request
  const { _id } = req.body;

  Category.aggregate([{ $match: { _id: mongoose.Types.ObjectId(_id) } }])
    .then((docs) => {
      if (docs.length !== 0) {
        res.status(200).send({ category: docs[0] });
      } else {
        res.status(404).send({ message: "No category found!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

//UPDATE CATEGORY
exports.updateCategoryById = async (req, res) => {
  //Get id from url
  const { id } = req.params;

  //Find category first
  try {
    const category = await Category.findById(id);

    if (category) {
      //Category found, now update it
      try {
        const update = await Category.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.newName,
              description: req.body.newDescription,
            },
          }
        );
        
        //Check if update was successfull
        if(update.nModified > 0) {
          res.end();
        }
        else {
          res.status(400).send(); //No update done
        }
      } catch (err) {
        res.status(500).send({ error: err }); //Error while updating the category
      }
    } else {
      //Category not found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err }); //Error while finding the category
  }
};

//DELETE CATEGORY
exports.deleteCategoryById = async (req, res) => {
  //Get id from request's body
  const { id } = req.params;

  try {
    const deleteCategory = await Category.deleteOne({ _id: id });
    if (deleteCategory.deletedCount > 0) {
      res.end();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
