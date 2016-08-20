'use strict';

const Video =require('./video.model');

exports.create = async(ctx,next)=>{
  ctx.body = {
    status: 0,
    message: "video message"
  };
}
