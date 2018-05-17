'use strict'

const Helpers = use('Helpers')
const Event = use('App/Model/Event')
const Database = use('Database')
const EventSetting = use('App/Model/EventSetting')


class AddEventController {
  * page(request, response) {
    const eventList = yield Database.select().from('event_settings').reduce((all, current) => {
      all[current.id] = current.event_name
      return all
    }, {})
    yield response.sendView('addEvent', {eventList})
  }

  * store(request, response) {

    const file = request.file('image', {
      maxSize: '15mb',
      allowedExtensions: ['jpg', 'JPG', 'pdf', 'PDF', 'PNG','png']
    })

    let fileName

    if (file.clientSize()){
      fileName = `${new Date().getTime()}.${file.extension()}`
      yield file.move(Helpers.publicPath(), fileName)

      if (!file.moved()) {
        response.badRequest(file.errors())
        return
      }
    }
    else if (request.input('id') && !request.input('image')){
      fileName  = yield Database.select('image').table('events').where('id', request.input('id')).
      reduce((all, current) => {
        all = current.image;
        return all
      }, []);
    }
    else {
      fileName = yield Database.select('image').from('event_settings').where('event_name', '=', request.input('event')).
      reduce((all, current) => {
        all = current.image;
        return all
      }, []);

    }

    if (request.input('id') && file.clientSize()&&
      !(yield Database.select('image').from('event_settings').where(
        'image',
        '=',
        (yield Database.select('image').from('events').where({id: request.input('id')}))[0].image)).length > 0){
      let fs = require('fs')
      var filePath = Helpers.storagePath(
        (yield Database.from('events').where({ id: request.input('id') }).first().select('image')).image)
      fs.unlinkSync(filePath)
    }
    if (request.input("id")){
      let affectedRows = yield Database
        .table('events')
        .where('id', request.input("id"))
        .update({ firstName: request.input('first_name'),
          lastName: request.input('lastName'),
          event: request.input('event'),
          identification: request.input('identification'),
          date: request.input('date'),
          image: fileName
        })
    }
    else {
      let event = yield Event.create({
        firstName: request.input('first_name'),
        lastName: request.input('lastName'),
        event: request.input('event'),
        identification: request.input('identification'),
        date: request.input('date'),
        image: fileName
      })
    }

    response.redirect('menu')


  }
}

module.exports = AddEventController
