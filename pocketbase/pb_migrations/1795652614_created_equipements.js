/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.role = \"technicien\"",
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
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text1819170229",
        "max": 120,
        "min": 0,
        "name": "nom",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "select1232983604",
        "maxSelect": 1,
        "name": "categorie",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "ordinateur",
          "projecteur",
          "camera",
          "autre"
        ]
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text90552329",
        "max": 60,
        "min": 0,
        "name": "numero_serie",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "select1439364962",
        "maxSelect": 1,
        "name": "etat",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "disponible",
          "pret",
          "maintenance"
        ]
      },
      {
        "help": "",
        "hidden": false,
        "id": "file347571224",
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": [
          "image/png",
          "image/jpeg"
        ],
        "name": "photo",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [],
        "type": "file"
      }
    ],
    "id": "pbc_3488873247",
    "indexes": [],
    "listRule": "",
    "name": "equipements",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.role = \"technicien\"",
    "viewRule": ""
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3488873247");

  return app.delete(collection);
})
