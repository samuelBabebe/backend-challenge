const readAndSave = require("../readWrite.js");
const readCsv = require("../readCsv");
const patientsRepo = require("../database/repo");

describe("readCsv tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  })
  it("should read and save patients", async () => {
    let patients = [
      {
        "Program Identifier": "50777445",
        "Data Source": "WEB 3RD PARTY",
        "Card Number": "342121211",
        "Member ID": "43233",
        "First Name": "LOAD",
        "Last Name": "TEST 0",
        "Date of Birth": "04/29/2000",
        "Address 1": "3100 S Ashley Drive",
        "Address 2": "",
        City: "Chandler",
        State: "AZ",
        "Zip code": "85286",
        "Telephone number": "",
        "Email Address": "test0@humancaresystems.com",
        CONSENT: "Y",
        "Mobile Phone": "1234567912",
      },
    ];
    let patientsRepoSaveSpy = jest
      .spyOn(patientsRepo, "savePatients")
      .mockReturnValue(Promise.resolve(null));
    readCsv.readCsv = jest.fn(() => {
      return Promise.resolve(patients);
    });
    await readAndSave();
    expect(patientsRepoSaveSpy).toHaveBeenCalledWith(patients[0]);
  });

  it("should throw an error if readCsv throws an error", async () => {
    readCsv.readCsv = jest.fn(() => {
      throw new Error("can't read file");
    });
    await expect(readAndSave()).rejects.toThrow(new Error("can't read file"));
  })
});
