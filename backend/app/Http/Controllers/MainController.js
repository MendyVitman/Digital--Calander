'use strict'
const Event = use('App/Model/Event')
const Database = use('Database')
const Helpers = use('Helpers');
const EventSetting = use('App/Model/EventSetting')
const moment = require('moment')

class MainController {
  *page (request, response){
    //SELECT * FROM table_name WHERE strftime('%m', date) = '04'
    //var strftime = require('strftime')
    const x = yield Database.select('*').from('events')
    let y = x.filter(event => {
      y[1]= yield Database.select('*').from('events')
      if(moment().date() < 10)
        return event.date.endsWith(`${moment().month()+1}-0${moment().date()}`)
      if(moment().month() < 9)
        return event.date.endsWith(`0${moment().month()+1}-${moment().date()}`)
      if(moment().date() < 10 && moment().month() < 9)
        return event.date.endsWith(`0${moment().month()+1}-0${moment().date()}`)
      else
        return event.date.endsWith(`${moment().month()+1}-${moment().date()}`)
    })


    //yield response.json(y)

    yield response.sendView('main' ,{list:y})
  }

}

module.exports = MainController
