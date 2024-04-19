
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dey8jatax',
  api_key: '778534821324272',
  api_secret: '01tcu07hmlmzs-rct0v_esIT_qg',
  upload_preset: 'profileimage_demo'
});

module.exports = cloudinary;