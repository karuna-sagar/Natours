const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController')
const router = express.Router();

const reviewRouter = require('./../routes/reviewRoutes');


const CSP = 'Content-Security-Policy';
const POLICY =
  "default-src 'self' https://*.mapbox.com ;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src http://localhost:8000 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
  "script-src-attr 'none';" +
  "style-src 'self' https: 'unsafe-inline';" +
  'upgrade-insecure-requests;';

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});


router.use("/:tourId/reviews", reviewRouter);


router
  .route('/tour-stats')
  .get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan);


router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);


router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin)
router
  .route('/distance/:latlng/unit/:unit')
  .get(tourController.getDistances)


router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );


module.exports = router;
