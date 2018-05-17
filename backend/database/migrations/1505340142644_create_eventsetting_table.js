'use strict'

const Schema = use('Schema')

class EventSettingsTableSchema extends Schema {

  up () {
    this.create('eventsetting', (table) => {
      table.increments()
      table.string('event_name')
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('eventsetting')
  }
}

module.exports = EventSettingsTableSchema
