const moment = require('moment')
const momenttz= require('moment-timezone')
const timeZone='Asia/Calcutta'

let now=()=>{
    return moment.utc().format()
}
let getLocalTime=()=>{
    return moment().tz(timeZone).format()
}
let convert=(time)=>{
    return momenttz.tz(time,timeZone).format('LLLL')
}
module.exports={
  now:now,
  getLocalTime:getLocalTime,
  convert:convert
}