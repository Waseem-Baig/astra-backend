const mongoose = require("mongoose");

const ApplicationChartSchema = new mongoose.Schema({
  capacity: String,
  application: String,
  building: String,
});

module.exports = mongoose.model("ApplicationChart", ApplicationChartSchema);
