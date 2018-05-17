'use strict'
const Event = use('App/Model/Event')
const Database = use('Database')
const Helpers = use('Helpers');
const EventSetting = use('App/Model/EventSetting')
const SystemSetting = use('App/Model/SystemSetting')


class SettingController {
  * page (request, response) {
    const list = yield Database.select().from('system_settings')
    yield response.sendView('setting', {list:list})
  }

  * store (request, response) {

    if (request.input('image')){

      //response.redirect('https://www.google.com')
      response.download(Helpers.storagePath(request.input('image')))
    }
    else if (request.input('id')){
      let fs = require('fs')
      var filePath = Helpers.publicPath(
        (yield Database.from('system_settings').where({ id: request.input('id') }).first().select('attribute_string')).attribute_string)
      fs.unlinkSync(filePath)

      yield Database
        .table('system_settings')
        .where('id', request.input('id'))
        .del()

      response.redirect('back')
    }

    else if(request.file('image')){

      let file = request.file('image', {
        maxSize: '15mb',
        allowedExtensions: ['jpg', 'JPG', 'pdf', 'PDF', 'PNG','png']
      })

      let fileName = `${new Date().getTime()}.${file.extension()}`
      yield file.move(Helpers.publicPath(), fileName)

      if (!file.moved()) {
        response.badRequest(file.errors())
        return
      }

      let setImage = yield SystemSetting.create({
        name: 'image',
        attribute_string: fileName
      })
      response.redirect('back')
    }
    else if (request.input('attribute_int')){
      let affectedRows = yield Database
        .table('system_settings')
        .where('name', 'TimeToFlip')
        .update({
          attribute_int: request.input('attribute_int')
        })
      response.redirect('back')
    }
    else response.redirect('back')
  }

}

module.exports = SettingController
