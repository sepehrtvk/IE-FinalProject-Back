const Request = require("../models/requestModel");
const Urls = require("../models/urlsModel");
const User = require("../models/userModel");

exports.getAllRequests = async (req, res) => {
  try {
    const allRequests = await Request.find();

    // let modifiedReq = [];

    // allRequests.map((req1) => {
    //   let number = 0;

    //   allRequests.map((req2) => {
    //     if (
    //       req1.url == req2.url &&
    //       req1.errorCount > 0 &&
    //       req2.errorCount > 0
    //     ) {
    //       number = number + req1.errorCount;
    //     }
    //   });

    //   let data2 = {
    //     url: req1.url,
    //     statusText: req1.statusText,
    //     statusCode: req1.statusCode,
    //     errorCount: number,
    //   };

    //   modifiedReq.push(data2);
    // });

    res.status(200).json({
      status: "success",
      results: allRequests.length,
      data: {
        Requests: allRequests,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getAllWarnings = async (req, res) => {
  const endPoint = req.query.url;
  const userId = req.query.userId;

  try {
    const allRequests = await Request.find();

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        status: "failed",
        error: "this user has no urls",
      });
      return next();
    }

    const allUrls = await Urls.find();

    const userUrls = allUrls.filter(
      (url) => url.userId == userId && url.endPoint == endPoint
    );

    const myUrls = allRequests.filter((req) => req.url == endPoint);
    const sum = myUrls
      .map((item) => item.errorCount)
      .reduce((prev, curr) => prev + curr, 0);

    if (userUrls.length > 0 && userUrls[0].thereshold < sum) {
      res.status(400).json({
        status: "max warning number ",
        results: userUrls.length,
        data: {
          Requests: userUrls,
        },
      });
    } else {
      res.status(200).json({
        status: "no warning ",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getRequest = async (req, res) => {
  const id = req.params.id;

  try {
    const request = await Request.findById(id);

    res.status(200).json({
      status: "success",
      results: request.length,
      data: {
        request,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      error: err,
    });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        Request: newRequest,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const newRequest = await Request.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        Request: newRequest,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
