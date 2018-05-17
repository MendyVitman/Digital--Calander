'use strict'
const Helpers = use('Helpers')
const EventSetting = use('App/Model/EventSetting')
const Database = use('Database')


class EventTypesController {

  * page (request, response){
    yield response.sendView('addEventTypes')
  }
  * store (request, response) {
    const file = request.file('image', {
      maxSize: '15mb',
      allowedExtensions: ['jpg', 'JPG', 'pdf', 'PDF', 'PNG','png']
    })

    let  fileName
    if (file.clientSize()) {
      fileName = `${new Date().getTime()}.${file.extension()}`
      yield file.move(Helpers.publicPath(), fileName)

      if (!file.moved()) {
        response.badRequest(file.errors())
        return
      }
    }
    else if (request.input('id') && !request.input('image')){
      fileName  = yield Database.select('image').table('event_settings').where('id', request.input('id')).
      reduce((all, current) => {
        all = current.image;
        return all
      }, []);
    }
    else{
      let message = "חובה לבחור תמונה"
      yield response.sendView('addEventTypes', {message})
    }

    if (request.input('id') && file.clientSize()){
      let fs = require('fs')
      var filePath = Helpers.storagePath(
        (yield Database.from('event_settings').where({ id: request.input('id') }).first().select('image')).image)
      fs.unlinkSync(filePath)
    }

    if (request.input("id")) {
      let affectedRows = yield Database
        .table('event_settings')
        .where('id', request.input("id"))
        .update({
          event_name: request.input('event_name'),
          image: fileName
        })
    }
    else if (fileName){
      const event_type = yield EventSetting.create({
        event_name: request.input('event_name'),
        image: fileName
      })

    }

    response.redirect('menu')
  }

}

module.exports = EventTypesController
