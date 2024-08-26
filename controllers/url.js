const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({
      error: "URL is required.",
    });
  }

  const { nanoid } = await import("nanoid");
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", { id: shortID });
}

async function visitHistoryTrack(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry || !entry.redirectURL) {
    return res.status(404).json({
      error: "Short URL not found.",
    });
  }

  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateNewShortURL,
  visitHistoryTrack,
  handleGetAnalytics,
};
