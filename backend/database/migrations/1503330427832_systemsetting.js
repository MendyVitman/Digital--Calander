'use strict'

const Schema = use('Schema')
const EventSetting = use('App/Model/EventSetting')

class SystemsettingTableSchema extends Schema {

  up () {
    this.create('system_settings', (table) => {
      table.increments()
      table.string('name')
      table.string('attribute_string')
      table.int('attribute_int')
      table.timestamps()
    })



  }

  down () {
    this.drop('system_settings')
  }

}

module.exports = SystemsettingTableSchema
