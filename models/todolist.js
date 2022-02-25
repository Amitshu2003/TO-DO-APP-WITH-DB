const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  desc: String,
  category:String,
  due: String
});

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;
