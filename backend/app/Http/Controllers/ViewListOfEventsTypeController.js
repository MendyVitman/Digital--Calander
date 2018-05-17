'use strict'
const Event = use('App/Model/Event')
const Database = use('Database')
const Helpers = use('Helpers');
const EventSetting = use('App/Model/EventSetting')

class ViewListOfEventsTypeController {
  * page (request, response) {
    const list = yield Database.select().from('event_settings')
    yield response.sendView('listOfEventsType', {list:list})
  }

  * action (request, response){

    if (request.input('edit')){
      let types = yield Database.from('event_settings').where( {'id': request.input('edit')})
      yield response.sendView('addEventTypes',{type:types} )
    }
    else{
      let fs = require('fs')
      var filePath = Helpers.publicPath(
        (yield Database.from('event_settings').where({ id: request.input('id') }).first().select('image')).image)
      fs.unlinkSync(filePath)


      yield Database
        .table('event_settings')
        .where('id', request.input('id'))
        .del()

      response.redirect('back')
    }
  }

}

module.exports = ViewListOfEventsTypeController
