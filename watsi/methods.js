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