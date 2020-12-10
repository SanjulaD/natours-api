const { query } = require('express');
const { QueryCursor } = require('mongoose');
const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
}

exports.getAllTours = async (req, res) => {

    try {
        // BUILD QUERY
        const queryObj = { ...req.query };
        const exludeFields = ['page', 'sort', 'limit', 'fields'];
        exludeFields.forEach(el => delete queryObj[el]);

        const query = Tour.find(queryObj);

        // EXECUTE QUERY
        const features = new APIFeatures(Tour.Find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tours = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'Success',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }

}

exports.getTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        // Tour findOne({ _id: req.params.id })
        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }

}

exports.createTour = async (req, res) => {

    try {
        // const newTour - new Tour({})
        // newTour.save()

        const newTour = await Tour.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid Data Set'
        });
    }
}

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        });
    }
}

exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        });
    }
}