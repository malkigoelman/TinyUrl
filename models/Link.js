import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: true
  },
  targetParamValue: {
    type: String,
    default: ""
  }
});

const TargetValueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const LinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  clicks:[ClickSchema],
  targetParamName: {
    type: String,
    default: "t"
  },
  targetValues: [TargetValueSchema]
});

const Link = mongoose.model('Link', LinkSchema);

export default Link;