const express = require("express");
const { generateNewShortURL, visitHistoryTrack, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/:shortId", visitHistoryTrack);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;