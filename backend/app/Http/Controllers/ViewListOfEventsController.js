'use strict'
const Event = use('App/Model/Event')
const Database = use('Database')
const Helpers = use('Helpers');
const EventSetting = use('App/Model/EventSetting')


class ViewListOfEventsController {

  * page (request, response) {
    const list = yield Database.select().from('events')
    yield response.sendView('listOfEvents', {list:list})
  }


  * action (request, response){
     if (request.input('edit')){
      let event = yield Database.from('events').where( {'id': request.input('edit')})
      let eventList = yield Database.select().from('event_settings').reduce((all, current) => {
        all[current.id] = current.event_name
        return all
      }, {})
      event[1] = eventList
      yield response.sendView('addEvent',{event:event} )
    }
    else{

      if (!(yield Database.select('image').from('event_settings').where(
        'image',
        '=',
        (yield Database.select('image').from('events').where({id: request.input('id')}))[0].image)).length > 0){
        let fs = require('fs')
        var filePath = Helpers.publicPath(
          (yield Database.from('events').where({ id: request.input('id') }).first().select('image')).image)
        fs.unlinkSync(filePath)
      }

      yield Database
        .table('events')
        .where('id', request.input('id'))
        .del()

      response.redirect('back')
    }
  }

}

module.exports = ViewListOfEventsController
