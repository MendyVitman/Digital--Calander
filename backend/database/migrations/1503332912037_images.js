'use strict'

const Schema = use('Schema')

class ImagesTableSchema extends Schema {

  up () {
    this.create('images', (table) => {
      table.increments()
//      table.string('path')
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }

}

module.exports = ImagesTableSchema
