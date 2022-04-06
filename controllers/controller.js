const Bike = require("../models/BikesModel");
const RentedBikeInfo = require("../models/rentedBikesModel");
const User = require("../models/customerModel");
const schedule = require("node-schedule");

const bikesDetails = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    let filter = req.query;
    let query = {};

    if (filter.hasOwnProperty("price")) {
      query = {
        price: {
          $gt: filter.price.split("-")[0] - 1,
          $lt: filter.price.split("-")[1] - 1,
        },
      };
    }

    if (filter.hasOwnProperty("type")) {
      query = {
        ...query,
        type: filter.type,
      };
    }

    console.log(query);

    // console.log(req.query);

    Bike.find(query, (err, response) => {
      if (err) return handleError(err);
      // console.log(response);
      res.send(response);
    });
  } else {
    Bike.find({}, (err, response) => {
      if (err) return handleError(err);
      // Prints "Space Ghost is a talk show host".
      console.log(response);
      res.send(response);
    });
  }
};

const singlebike = (req, res) => {
  const id = req.params.id;

  Bike.findOne({ id: id }, (err, response) => {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    console.log(response);
    res.send(response);
  });
};

const rentBike = (req, res) => {
  const { query } = req;
  console.log(query);

  Bike.findById(query.bike).then((foundBike) => {
    User.findById(query.customer).then((user) => {
      user.rentedBikes.push(foundBike._id);
      user.save().then(() => {
        foundBike.availableBikes = false;
        foundBike.save().then(() => {
          RentedBikeInfoObj = {
            bike: foundBike._id,
            user: query.customer,
            bookingDate: new Date(),
            // console.log(new Date(Date.now() + query.days * 24 * 3600 * 1000));
            // expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            days: query.days,
          };

          console.log(RentedBikeInfoObj);
          RentedBikeInfo.create(RentedBikeInfoObj).then(() => {
            res.send("Sucess!");
          });

          const job = schedule.scheduleJob(
            new Date(Date.now() + 5 * 60 * 1000),
            () => {
              // User.findById(query.customer).then((user) => {
              //   user.rentedBike.splice(user.rentedBike.indexOf(query.bike), 1);
              //   user.save();
              // });
              Bike.findById(query.bike).then((foundBike) => {
                foundBike.availableBike = true;
                foundBike.save();
              });
            }
          );
        });
      });
    });
  });
};

exports.bikesDetails = bikesDetails;
exports.rentBike = rentBike;
exports.singlebike = singlebike;
