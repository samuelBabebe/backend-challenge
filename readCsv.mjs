import fs from "fs";

 export default async function readCsv(path) {
  let promiseResult = new Promise((resolve, reject) => {
    fs.readFile(
      path,
      "utf8",
      (err, data) => {
        if (err) {
          console.error({ err: err });
          reject(err);
        }
        let arraydata = data.toString().split(/\r?\n/);
        let tableKey = arraydata[0].split("|");
        let result = [];
        for (let i = 1; i < arraydata.length; i++) {
          let eachData = arraydata[i].split("|");
          const obj = {};
          for (let j = 0; j < eachData.length; j++) {
            obj[tableKey[j]] = eachData[j];
          }
          result.push(obj);
        }
        
        resolve(result);
      }
    );
  });
  return promiseResult
}

//readCsv()
//module.exports = {readCsv} ;
