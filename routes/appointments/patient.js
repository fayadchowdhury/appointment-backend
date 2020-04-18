const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


router.post('/get', (req, res) => {
    const query = `SELECT APPOINTMENTS.*, DOCTORS.NAME FROM APPOINTMENTS INNER JOIN DOCTORS ON APPOINTMENTS.DOCTOR_ID = DOCTORS.ID WHERE APPOINTMENTS.PATIENT_ID = '${req.body.patientid}'`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(666).json({message: err});
        }
        else
        {
            if ( result.rowCount != 0 )
                res.status(200).json({message: "Appointments fetched successfully", resultobj: result.rows});
            else
                res.status(404).json({message: "No appointments found"});
        }
    });
});


router.post('/post', (req, res) => {
    const query = `insert into appointments(doctor_id, patient_id, dateOfAppointment, startTime, endTime, status) values ('${req.body.docid}', '${req.body.patientid}', '${req.body.appDate}', '${req.body.appStartTime}', '${req.body.appEndTime}', '${req.body.appStatus}')`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(666).json({message: err});
        }
        else
        {
            res.status(200).json({message: "Appointment posted successfully"});
        }
    });
});


router.put('/put', (req, res) => {
    var query = `UPDATE APPOINTMENTS`;

    var arguments = new Map();

    if ( req.body.appStartTime != 'N/A' )
        arguments.set(0, `${req.body.appStartTime}`);
    if ( req.body.appEndTime != 'N/A' )
        arguments.set(1, `${req.body.appEndTime}`);
    if ( req.body.appDate != 'N/A' )
        arguments.set(2, `${req.body.appDate}`);
    if ( req.body.appStatus != 'N/A' )
        arguments.set(3, `${req.body.appStatus}`);

    var tmp = ',';
    var flag = 0;
    for ( i = 0 ; i < 9 ; i++ )
    {
        if ( arguments.get(i) )
        {
            if ( i == 0 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET STARTTIME = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} STARTTIME = '${arguments.get(i)}'`;
                }
            }
            if ( i == 1 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET ENDTIME = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} ENDTIME = '${arguments.get(i)}'`;
                }
            }
            if ( i == 2 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET DATEOFAPPOINTMENT = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} DATEOFAPPOINTMENT = '${arguments.get(i)}'`;
                }
            }
            if ( i == 3 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET STATUS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} STATUS = '${arguments.get(i)}'`;
                }
            }
        }
    }
    query = query + ` WHERE DOCTOR_ID = '${req.body.docid}' AND PATIENT_ID = '${req.body.patientid}'`;
    const queryCheck = `SELECT * FROM APPOINTMENTS WHERE DOCTOR_ID = '${req.body.docid}' AND PATIENT_ID = '${req.body.patientid}'`;
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
                       res.status(200).json({message: "Appointment updated successfully"});
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


router.post('/delete', (req, res) => {
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