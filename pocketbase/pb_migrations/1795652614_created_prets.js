/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.role = \"technicien\"",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3488873247",
        "help": "",
        "hidden": false,
        "id": "relation3098855155",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "equipement",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_2161812477",
        "help": "",
        "hidden": false,
        "id": "relation4139055913",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "membre",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "help": "",
        "hidden": false,
        "id": "date1391193845",
        "max": "",
        "min": "",
        "name": "date_debut",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "date"
      },
      {
        "help": "",
        "hidden": false,
        "id": "date1258071904",
        "max": "",
        "min": "",
        "name": "date_retour_prevue",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "date"
      },
      {
        "help": "",
        "hidden": false,
        "id": "bool339393251",
        "name": "retourne",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      }
    ],
    "id": "pbc_4190327953",
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && (membre = @request.auth.id || @request.auth.role = \"technicien\")",
    "name": "prets",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.role = \"technicien\"",
    "viewRule": "@request.auth.id != \"\" && (membre = @request.auth.id || @request.auth.role = \"technicien\")"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4190327953");

  return app.delete(collection);
})
