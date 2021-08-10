//Require needed modules and models
const Album = require("../Models/album");
const Track = require('../Models/track');

exports.addAlbum = async (album) => {
  //Create object from model with given values
  const newAlbum = new Album(album);

  //Save object to DB
  const result = await newAlbum.save();
  return result._id;
};

exports.getAlbums = async () => {
  const result = await Album.find();

  return result;
};

exports.getAlbumById = async (id) => {
  const album = await Album.findById(id);

  if (album) {
    return album; //Album found, send it in response
  } else {
    return; //No Album found
  }
};

exports.updateAlbumById = async (values, id) => {
  const album = await Album.findById({ _id: id });
  if (album) {
    //Album found, now we need to update it
    await Album.updateOne(
      { _id: id },
      {
        $set: values,
      },
      { omitUndefined: true } //Make sure that only defined values are updated in the DB
    );
    return 200;
  } else {
    return 404; // Album not found
  }
};

exports.deleteAlbumById = async (id) => {
  //Find album first
  const album = await Album.findById(id);

  if (album) {
    //Check if album has any tracks
    const track = await Track.findOne({ albumId: id });

    if (track) {
      //One track found cannot delete
      return 409;
    } else {
      //No tracks found, now delete album
      await Album.deleteOne({ _id: id });

      return 200;
    }
  } else {
    //No album found
    return 404;
  }
};

exports.getNbOfTracks = async () => {
  //Create an array to store results in
  var results = [];

  //Get list of all albums who have showNbOfTracks set to true
  Album.aggregate([{ $match: { showNbOfTracks: true } }]).then(
    async (result) => {
      if (result.length !== 0) {
        for (let counter = 0; counter < result.length; counter++) {
          //Loop through albums and access their _id
          const id = result[counter]._id;

          const count = await Track.countDocuments({ albumId: id });

          results.push({
            albumId: id,
            trackCount: count,
          });
        }
        return results;
      } else {
        return;
      }
    }
  );
};
