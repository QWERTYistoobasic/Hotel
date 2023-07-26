const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateHotel } = require('../middleware');
const hotel = require('../controllers/hotels');
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({storage})

router.get('/',
         catchAsync(hotel.index))
router.get('/new',
         isLoggedIn,
         hotel.renderNewForm)
 router.post('/createHotel',
          isLoggedIn,
          upload.array('image'),
          validateHotel,
          catchAsync(hotel.createHotel))

router.route('/:id')
    .get(catchAsync(hotel.showHotel))
    .put(isLoggedIn,
         isAuthor,
         upload.array('image'),
         validateHotel,
         catchAsync(hotel.updateHotel))
    .delete(isLoggedIn,
         isAuthor,
         catchAsync(hotel.deleteHotel));
router.get('/:id/edit',
         isLoggedIn,
         isAuthor,
         catchAsync(hotel.renderEditForm));

module.exports = router;