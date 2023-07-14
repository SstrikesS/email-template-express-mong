import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  template_name: String,
  counters: Object,
  body: Object,
  schemaVersion: Number,
  liquid: Array
});

const Template = mongoose.model('Template', templateSchema);

export default Template;