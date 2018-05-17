
'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');
const Database = use('Database');
const Helpers = use('Helpers');



Route.get('/', function * (request, response) {
  const fileName = yield Database.select('image').from('event_settings').where('event_name', '=', 'יום הולדת').
  reduce((all, current) => {
     all = current.image;
    return all
  }, []);
  const event = yield Database.select('*').from('events');
  const image = yield Database.select('*').from('event_settings');
  const event_name = yield Database.select('event_name').from('event_settings');
  const s = yield Database.from('event_settings').where({ id: 1 }).first().select('image');
 // const xa = Helpers.storagePath(s.image);

  const bbb = yield Database.from('event_settings').where({ id: 1 }).first().select('event_name');

  response.json({event,fileName,s,image,event_name, bbb, x: Helpers.storagePath(toString(yield Database.select('image').from('event_settings')))})
});

Route.get('menu', function * (request, response) {
  yield response.sendView('menu')
});


Route.get('main', 'MainController.page');

Route.post('add', 'AddEventController.store');
Route.get('add', 'AddEventController.page');

Route.post('view', 'ViewlistOfEventsController.action')
Route.get('view', 'ViewlistOfEventsController.page');

Route.post('view/types', 'ViewListOfEventsTypeController.action')
Route.get('view/types', 'ViewListOfEventsTypeController.page');

Route.post('event', 'EventTypesController.store');
Route.get('event', 'EventTypesController.page');

Route.post('setting', 'SettingController.store');
Route.get('setting', 'SettingController.page');




