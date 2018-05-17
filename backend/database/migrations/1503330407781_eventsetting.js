'use strict'

const Schema = use('Schema')

class EventsettingTableSchema extends Schema {

  up () {
    this.create('event_settings', (table) => {
      table.increments()
      table.string('event_name')
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('event_settings')
  }

}

module.exports = EventsettingTableSchema
