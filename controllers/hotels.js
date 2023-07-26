const hotels = require('../models/hotel');

module.exports.index=async (req,res)=>{
    const hotel=await hotels.find({});
    res.render('hotel/index',{hotel})
}

module.exports.renderNewForm=(req,res)=>{
    res.render('hotel/new')
}

module.exports.createHotel=async(req,res)=>{
    const newHotel= new hotels(req.body.hotels);
    newHotel.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newHotel.author=req.user._id
    await newHotel.save();
    req.flash('success','Your Hotel has been Successfully been added!!');
    res.redirect(`/hotel/${newHotel.id}`);
}

module.exports.showHotel=async (req, res) => {
    const hotel = await hotels.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!hotel) {
        req.flash('error', 'Cannot find that hotel!');
        return res.redirect('/hotel');
    }
    res.render('hotel/show', { hotel });
}

module.exports.renderEditForm=async (req, res) => {
    const hotel = await hotels.findById(req.params.id)
    if (!hotel) {
        req.flash('error', 'Cannot find that hotel!');
        return res.redirect('/hotel');
    }
    res.render('hotel/edit', { hotel });
}

module.exports.updateHotel=async(req,res)=>{
    const {id}=req.params;
    const hotel= await hotels.findByIdAndUpdate(id,{ ...req.body.hotels});
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    hotel.images.push(...imgs);
    await hotel.save();
    req.flash('success', 'Successfully Updated Hotel Details!');
    res.redirect(`/hotel/${hotel.id}`);
}

module.exports.deleteHotel=async(req,res)=>{
    const {id}=req.params;
    const hotel= await hotels.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted Hotel :(');
    res.redirect('/hotel');
}