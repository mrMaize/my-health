import { mockUser } from '../../constants/models/userModel.js';

export const getUser = (req, res, next) => {
  return res.json(mockUser);

  // let result;

  // const db = getDatabase(req);
  // const collection = db.collection(ADMINS_COLLECTION);

  // collection.find().toArray(function (err, results) {
  //   result = results;

  //   return res.json(result);
  // });
};
