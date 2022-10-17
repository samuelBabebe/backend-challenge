import patientsModel from "./patientmodel.mjs";
import emailModel from "./emailModel.mjs";
 class PatientsRepo {
  constructor() {}

  savePatients = async function (data) {
    let save = new patientsModel(data);
    return await save.save();
  };

  savePatientEmail = async function (data) {
    let save = new emailModel(data);
    return await save.save();
  };
  
}
export default new PatientsRepo()
