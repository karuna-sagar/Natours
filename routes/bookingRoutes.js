// import express from 'express';
// import * as bookingController from './../controllers/bookingController.js';
// import * as authController from './../controllers/authController.js';

const express = require('express');
const bookingController = require('./../controllers/bookingController.js');
const authController = require('../controllers/authController'); 
const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId',
    // authController.protect,
    bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

// // user booking routes
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
// export default router;