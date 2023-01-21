const Urls = require("../models/urlsModel");
const User = require("../models/userModel");

exports.getAllUrls = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        status: "failed",
        error: "this user has no urls",
      });
      return next();
    }

    const allUrls = await Urls.find();

    const userUrls = allUrls.filter((url) => url.userId == userId);

    res.status(200).json({
      status: "success",
      results: userUrls.length,
      data: {
        Urls: userUrls,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getUrls = async (req, res) => {
  const id = req.params.id;

  try {
    const urls = await Urls.findById(id);

    res.status(200).json({
      status: "success",
      results: urls.length,
      data: {
        urls,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      error: err,
    });
  }
};

exports.createUrls = async (req, res) => {
  try {
    const newUrls = await Urls.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        Urls: newUrls,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const Urls = await Urls.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        Url: Urls,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
