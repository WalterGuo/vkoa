'use strict';
import fs from 'fs';
import {isNumeric,isEmail,trim,isLength,isMobilePhone,isMongoId,isURL} from 'validator';
import lodash from 'lodash';
import koaConfig from '../config/environment';
let keyword_filter = '';
fs.readFile(__dirname + '/file/keywords.txt', function (err, data) {
  if (err) {
    console.log(err)
  }
  let _data = data.toString();
  let reg_txt = _data.replace(/\n/g, '|');

  keyword_filter = new RegExp(reg_txt, 'gi');
})

export const _ = lodash;
export {
  isNumeric as isNumeric,
  isEmail as isEmail,
  isLength as isLength,
  isMobilePhone as isMobilePhone,
  isMongoId as isMongoId,
  isURL as isURL
};

export const config = koaConfig;
export const kf = keyword_filter;
// exports.v = v;
