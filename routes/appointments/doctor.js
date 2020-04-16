const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


router.post('/get', (req, res) => {
    const query = `SELECT APPOINTMENTS.*, PATIENTS.NAME FROM APPOINTMENTS INNER JOIN PATIENTS ON APPOINTMENTS.PATIENT_ID = PATIENTS.ID WHERE APPOINTMENTS.DOCTOR_ID = '${req.body.docid}'`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(666).json({message: err});
        }
        else
        {
            if ( result.rows.length )
                res.status(200).json({message: "Appointments fetched successfully", resultobj: result.rows});
            else
                res.status(404).json({message: "No appointment found"});
        }
    });
});


router.delete('/delete', (req, res) => {
    const query = `DELETE FROM APPOINTMENTS WHERE DOCTOR_ID = '${req.body.docid}' AND PATIENT_ID = '${req.body.patientid}' AND DATEOFAPPOINTMENT = '${req.body.appDate}'`;
    const queryCheck = `SELECT * FROM APPOINTMENTS WHERE DOCTOR_ID = '${req.body.docid}' AND PATIENT_ID = '${req.body.patientid}' AND DATEOFAPPOINTMENT = '${req.body.appDate}'`;
    pool.query(queryCheck, (err1, result1) => {
        if ( err1 )
        {
            res.status(666).json({message: err1});
        }
        else
        {
            if ( result1.rowCount != 0 )
            {
                pool.query(query, (err2, result2) =>
                {
                    if ( err2 )
                    {
                        res.status(666).json({message: err2});
                    }
                    else
                    {
                        res.status(200).json({message: "Appointment deleted successfully"});
                    }
                });
            }
            else
            {
                res.status(404).json({message: "No matching appointment found"});
            }
        }
    });
});


module.exports = router;
