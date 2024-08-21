const express = require("express");
const foodSchema = require("../Schema/foodSchema");
const foodRouter = express.Router();


foodRouter.get("/", async (req, res) => {
    console.log("Route hit: /foods");
    try {
      const getAllFoods = await foodSchema.find({});
      if (getAllFoods.length > 0) {
        res.json(getAllFoods);
      } else {
        res.status(404).json({ message: "No food items found" });
      }
    } catch (e) {
      console.error("Error fetching food items:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

foodRouter.post("/",async(req,res)=>{
    try {
        const {
            foodName,
            foodImg,
            foodRating,
            foodCategory,
            foodPrice,
            prepareTiming,
            foodDes,
            foodStock,
            resId
        } = req.body;

        const addFood = await foodSchema.create({
            foodName,
            foodImg,
            foodRating,
            foodCategory,
            foodPrice,
            prepareTiming,
            foodDes,
            foodStock,
            resId
        })
        console.log(addFood);
        
        res.json({message:"Added sucessfully!",addFood})
    }catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
    }
})


foodRouter.put("/:id",async(req,res)=>{
    try {
        const food = await foodSchema.findById(req.params.id);
        if (food) {
            food.foodStock = false;
            await food.save();
            return res.json({message:"Stock upadted sucessfully"})
        }else{
            return res.status(404).json({message:"food not found"})
        }

    }catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

foodRouter.put("/update/:id",async(req,res)=>{
    try {
        const food = await foodSchema.findById(req.params.id);
        if (food) {
            food.foodStock = true;
            await food.save();
            return res.json({message:"Stock upadted sucessfully"})
        }else{
            return res.status(404).json({message:"food not found"})
        }

    }catch (e) {
        console.error(e.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

foodRouter.delete("/:id",async(req,res)=>{
    try {
        const deleteResult = await foodSchema.deleteOne({ _id: req.params.id });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Food not found" });
        } else {
            return res.json({ message: "Food deleted successfully" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = foodRouter; 