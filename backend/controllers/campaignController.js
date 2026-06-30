import Campaign from "../models/campaign.js";
import Donation from "../models/donation.js";

const normalizeCampaignPayload = (body) => {
  const payload = {};

  if (body.title !== undefined) payload.title = String(body.title).trim();
  if (body.description !== undefined) payload.description = String(body.description || "").trim();
  if (body.status !== undefined) payload.status = body.status;
  if (body.category !== undefined) payload.category = String(body.category || "General").trim();
  if (body.imageUrl !== undefined) payload.imageUrl = String(body.imageUrl || "").trim();
  if (body.goalAmount !== undefined) payload.goalAmount = Number(body.goalAmount);
  if (body.raisedAmount !== undefined) payload.raisedAmount = Number(body.raisedAmount);
  if (body.startDate !== undefined) payload.startDate = body.startDate ? new Date(body.startDate) : new Date();
  if (body.endDate !== undefined) payload.endDate = body.endDate ? new Date(body.endDate) : null;

  return payload;
};

const validateCampaignPayload = (payload, { partial = false } = {}) => {
  if (!partial && !payload.title) return "Campaign title is required.";
  if (!partial && (!Number.isFinite(payload.goalAmount) || payload.goalAmount <= 0)) {
    return "Goal amount must be greater than 0.";
  }
  if (payload.goalAmount !== undefined && (!Number.isFinite(payload.goalAmount) || payload.goalAmount <= 0)) {
    return "Goal amount must be greater than 0.";
  }
  if (payload.raisedAmount !== undefined && (!Number.isFinite(payload.raisedAmount) || payload.raisedAmount < 0)) {
    return "Raised amount cannot be negative.";
  }
  if (payload.status && !["active", "completed", "inactive"].includes(payload.status)) {
    return "Invalid campaign status.";
  }
  return null;
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCampaign = async (req, res) => {
  try {
    const payload = normalizeCampaignPayload(req.body);
    const error = validateCampaignPayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });

    const campaign = await Campaign.create(payload);
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const payload = normalizeCampaignPayload(req.body);
    const error = validateCampaignPayload(payload, { partial: true });
    if (error) return res.status(400).json({ success: false, message: error });

    const campaign = await Campaign.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found." });
    }

    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found." });
    }

    const donationCount = await Donation.countDocuments({ campaign: campaign._id });
    if (donationCount > 0) {
      campaign.status = "inactive";
      await campaign.save();
      return res.json({
        success: true,
        message: "Campaign has donations, so it was marked inactive instead of deleted.",
        campaign,
      });
    }

    await Campaign.findByIdAndDelete(campaign._id);
    res.json({ success: true, message: "Campaign deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
