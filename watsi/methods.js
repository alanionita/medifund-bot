exports.sortByCountry = (patientsArr, targetCountry) => {
    if (Array.isArray(patientsArr) && typeof targetCountry === 'string') {
        return patientsArr.filter((patient) => {
            if (patient.country === targetCountry) return patient;
        });
    }
};

exports.showOnlyTheFirstXEntries = (patients, number) => {
    if (number && +number) return patients.slice(0, number);
}

exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
  // The maximum is exclusive and the minimum is inclusive
};

