//let { readCsv } = require("./readCsv.mjs");
import readCsv from "./readCsv.mjs"
import patientsRepo from "./database/repo.mjs";

export default async function readWrite(path) {
  try {
   //let resul = new Promise((resolve,reject)=>{

    
    let Patients = await readCsv(path);
    let pendingPromises = [];

    for (let patient of Patients) {
      pendingPromises.push(
        (async () => {
          await patientsRepo.savePatients(patient);
          if (patient.CONSENT === "Y") {
            for (let i = 1; i <= 4; i++) {
              let date = new Date();
              date.setDate(date.getDate() + i);
              
              let data = {
                Name: `Day ${i}`,
                "Scheduled Date": date.toLocaleDateString("en-US"),
                "Member ID": patient["Member ID"],
              };
              await patientsRepo.savePatientEmail(data);
            }
          }
        })()
      );
    }
    
    await Promise.allSettled(pendingPromises);
  } catch (err) {
    console.log({err:err})
    return Promise.reject(new Error("can't read file"));
  }
}

