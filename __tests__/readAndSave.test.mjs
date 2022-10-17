import readAndSave from "../readWrite.mjs";
import readCsv from "../readCsv.mjs";
import patientsRepo from "../database/repo.mjs";

jest.mock("../readCsv.mjs");

describe("read and save tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  test("should read and save patients", async () => {
    const fakePath = "fake/path";
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
    readCsv.mockReturnValue(Promise.resolve(patients));
    await readAndSave(fakePath);
    expect(patientsRepoSaveSpy).toHaveBeenCalledTimes(1);
    expect(readCsv).toHaveBeenCalledWith(fakePath);
    expect(patientsRepoSaveSpy).toHaveBeenCalledWith(patients[0]);
  });


  it("should throw an error if readCsv throws an error", async () => {
    readCsv.mockReturnValue(Promise.reject(new Error("can't read file")));
    await expect(readAndSave()).rejects.toThrow(new Error("can't read file"));
  });


  test("should create four emails if  CONSENT is Y", async () =>{
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
   let emailcount = ()=>{
        let i = 1
       
        return function(){
          
          let date = new Date()
          date.setDate(date.getDate() + i)
         
           return {
            "Member ID": "43233",
            Name: `Day ${i++}`,
            "Scheduled Date": date.toLocaleDateString("en-US") ,
          }
        }
    }
    let closer = emailcount()
     
    
    let patientsRepoSaveSpy = jest
    .spyOn(patientsRepo, "savePatientEmail")
    .mockReturnValue(Promise.resolve(null));
    readCsv.mockReturnValue(Promise.resolve(patients))
    await readAndSave()
    expect(patientsRepoSaveSpy).toHaveBeenCalledTimes(4)
    expect(patientsRepoSaveSpy).toHaveBeenCalledWith(closer())
    expect(patientsRepoSaveSpy).toHaveBeenCalledWith(closer())
    expect(patientsRepoSaveSpy).toHaveBeenCalledWith(closer())
    expect(patientsRepoSaveSpy).toHaveBeenCalledWith(closer())
    
  })

  
});
