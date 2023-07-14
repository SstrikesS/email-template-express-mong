
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

mongoose
  .connect("mongodb://localhost:27017/GR1-email-template", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Định nghĩa Schema và Model
const templateSchema = new mongoose.Schema({
  template_name: String,
  counters: Object,
  body: Object,
  schemaVersion: Number,
});

const Template = mongoose.model("Template", templateSchema);

// Định nghĩa routes
app.get("/templates", async (req, res) => {
  try {
    // Lấy danh sách các template từ database
    // const templates = await Template.find();
    const templates = await Template.find();

    res.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/template/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update/template/:id", async(req, res) => {
  try{
    const {id} = req.params;
    
    const template = await Template.findById(id);

    if(!template) {
      return res.status(404).json({error: "Template_id not found"});
    }

    if(req.body.counters){
      template.counters = req.body.counters;
    }
    if(req.body.body){
      template.body = req.body.body;
    }
    if(req.body.schemaVersion) {
      template.schemaVersion = req.body.schemaVersion;
    }
    if(req.body.template_name){
      template.template_name = req.body.template_name;
    }
    
    await template.save();

    res.json({message: "Template updated successfullly"});
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({error: "Internal server error"})
  }
});

app.post("add/template", async(req, res) => {
    const newTemplate = new Template({
      template_name: req.body.template_name,
      counter: req.body.counter,
      body: req.body.body,
      schemaVersion: req.body.schemaVersion,
    })

    await newTemplate.save()
    .then((document) => {
      res.status(201).json(document);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
