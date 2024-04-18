import { Cloudinary } from '@cloudinary/url-gen';
          
export const cloudinaryConfig=({ 
  cloud_name: 'dey8jatax', 
  api_key: '778534821324272', 
  api_secret: '01tcu07hmlmzs-rct0v_esIT_qg' 
});

export const cloudinary = new Cloudinary(cloudinaryConfig);