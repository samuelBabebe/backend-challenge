# brain storming
#assuming i already have the .csv file format i decided to read it from static file and converted it to normal object (key(title) and value(corsponding result)) for each patient the i created a schema and in mongodb and insert each data there in patients collection.

#when i am sending each patient data i can also send 4 emails which have a diffrent date will be also sent to the database which i created as Email collection. i gave add one data from patients to the email (Member id) which will help us differentiate which email is for which patient (i thought that gives it more sense for the email collections)

#i decided to use jest for testing the system. 

# now let us try to see each modules roughly

#`index.js`: is gateway to the application and it crates a mongobd connection creating assessmet database by calling `connectToMongoose` function in `util.mjs`
#`readCsv.js`: will read the .csv file and return ann array of objects (each object takes a single patient data)
#`readWrite.js`: will accept the patients dat aray from readCsv.js module and send data to both patients and email repo functions.
#`emailModel.js` : takes the model and schema of email collection
#`patientmodel.js`: takes the model and schema of patients collection
#`repo.js` : will holds all the querys of our database
#`util.js` : provides functions for connecting and disconnecting from mongo


# How to
#to install clone it to your machine and run "npm init"
#to test run "npm test"
#to start the app run "npm start path=${absolute path to csv file}" 






