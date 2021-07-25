![GitHub last commit](https://img.shields.io/github/last-commit/GChammas23/AudioLibrary)
![npm](https://img.shields.io/npm/v/npm)

# AudioLibrary

## Description

This project contains multiple back-end microservices that allow for complete manipulation of records related to albums, tracks and categories which will be more discussed in the later parts.

## Models
### Album
This model represents an album that may contain one or more track. The following is a list of services available for this model:

* Add a new album
* Update an album
* Delete an album
* Get all albums
* Get an album by ID
* Get number of tracks for all albums => Returns a list containing the number of tracks for each album

### Track
This model represents a track (song) that is a part of an album and a category. The following is a list of services available for this model:

* Add a new track
* Update a track
* Delete a track
* Get all tracks
* Get tracks related to a specific singer

### Category
This model represents a category of songs (i.e: Pop, Rap, Rnb...). The following is a list of services available for this model:

* Add a new category
* Update a category
* Delete a category
* Get all categories
* Get a specific category by id

## How to start the server

```bash
npm start
```
**Once started, the server will be listening on port 3001 (Make sure that mongodb is started on your machine too!)**

## Technologies used

The following list shows the different technologies used to develop this project:

* NodeJs
* Express
* Mongoose