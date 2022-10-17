
//const fs = require("fs");
import fs from "fs"
import readCsv from "../readCsv.mjs"

jest.mock("fs")

describe("readCsv tests", () => {
  it("should return the right data", async () => {
    const fakePath = "/fake/path";
    fs.readFile = jest.fn((paths, encoding, callback) => {
      callback(
        null,
        "Program Identifier|Data Source|Card Number|Member ID|First Name|Last Name|Date of Birth|Address 1|Address 2|City|State|Zip code|Telephone number|Email Address|CONSENT|Mobile Phone\n" +
          "50777445|WEB 3RD PARTY|342121211|43233|LOAD|TEST 0|04/29/2000|3100 S Ashley Drive||Chandler|AZ|85286||test0@humancaresystems.com|Y|1234567912"
      );
    });
    let result = await readCsv(fakePath);
    let expectedPatientResult = {
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
    };

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual(expectedPatientResult);
  });

  it("should throw an error if file can not be read", async () => {
    fs.readFile = jest.fn((paths, encoding, callback) => {
      throw new Error("file can't be read");
    });
    await expect(readCsv()).rejects.toThrow(new Error("file can't be read"));
  });
});

