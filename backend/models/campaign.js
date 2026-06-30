import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 3000,
    },
    goalAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "completed", "inactive"],
      default: "active",
      index: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
      maxlength: 80,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

campaignSchema.virtual("progressPercentage").get(function () {
  if (!this.goalAmount || this.goalAmount <= 0) return 0;
  return Math.min(100, Math.round((this.raisedAmount / this.goalAmount) * 100));
});

campaignSchema.set("toJSON", { virtuals: true });
campaignSchema.set("toObject", { virtuals: true });

export default mongoose.model("Campaign", campaignSchema);
