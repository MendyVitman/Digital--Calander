'use strict'

const Schema = use('Schema')

class EventsTableSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.increments()
      table.string('firstName')
      table.string('lastName')
      table.string('identification')
      table.string('event')
      table.date('date')
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }

}

module.exports = EventsTableSchema
