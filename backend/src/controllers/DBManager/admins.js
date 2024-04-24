import { ADMINS_COLLECTION } from '../../config/database.js';
import { getAdminModelByData } from '../../constants/models/adminsModel.js';

function getDatabase(req) {
  return req.app.locals.db;
}

function insertAdmin(req, res, next) {
  const db = getDatabase(req);
  const collection = db.collection(ADMINS_COLLECTION);
  const admin = req.body;

  console.log(admin);

  try {
    const newAdminData = getAdminModelByData(admin);

    collection.insertOne(newAdminData, (err, result) => {
      if (err) {
        return console.log(err);
      }
      res.json(result.ops);
    });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
}

function updateAdminById(req, res, next) {
  const id = req.params.id;

  res.json(id);
}

function deleteAdminById(req, res, next) {
  const id = req.params.id;

  res.json('delete');
}

function getAllAdmins(req, res, next) {
  let result;

  const db = getDatabase(req);
  const collection = db.collection(ADMINS_COLLECTION);

  collection.find().toArray(function (err, results) {
    result = results;

    res.json(result);
  });
}

export { getAllAdmins, deleteAdminById, updateAdminById, insertAdmin };
