const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


router.get('/', (req, res) => {
    const query = `SELECT APPOINTMENTS.*, PATIENTS.NAME FROM APPOINTMENTS INNER JOIN PATIENTS ON APPOINTMENTS.PATIENT_ID = PATIENTS.ID WHERE APPOINTMENTS.DOCTOR_ID = '${req.body.docid}'`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(400).send(err);
        }
        else
        {
            res.json(result.rows);
        }
    });
});


router.delete('/', (req, res) => {
    const query = `DELETE FROM APPOINTMENTS WHERE DOCTOR_ID = '${req.body.docid}' AND PATIENT_ID = '${req.body.patientid}' AND DATEOFAPPOINTMENT = '${req.body.appDate}'`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json({message: "Appointment deleted successfully"});
        }
    });
});


module.exports = router;
