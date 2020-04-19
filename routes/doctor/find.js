const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');

router.post('/get', (req, res) => {
    var query = 'SELECT *, AGE(DOB) FROM DOCTORS INNER JOIN DOCTOR_RATINGS ON DOCTORS.ID = DOCTOR_RATINGS.DOCTOR_ID';
    var tmp;

    //check type of request
    if ( req.body.type == 'OR' || req.body.type == 'DEFAULT' )
    {
        tmp = 'OR';
    }
    else
    {
        tmp = 'AND';
    }

    //map of arguments
    let arguments = new Map();

    if ( req.body.docname != 'N/A' )
        arguments.set(0, `${req.body.docname}`);

    if ( req.body.doclocation != 'N/A' )
        arguments.set(1, `${req.body.doclocation}`);

    if ( req.body.docspecialty != 'N/A' )
        arguments.set(2, `${req.body.docspecialty}`);

    var flag = 0;
    for ( i = 0 ; i < 3 ; i++ ) {
        if (arguments.get(i)) {
            if (i == 0) {
                if (flag == 0) {
                    query = query + ` WHERE NAME = '${arguments.get(i)}'`;
                    flag = 1;
                } else if (flag == 1) {
                    query = query + ` ${tmp} NAME = '${arguments.get(i)}'`;
                }
            }
            if (i == 1) {
                if (flag == 0) {
                    query = query + ` WHERE LOCATION = '${arguments.get(i)}'`;
                    flag = 1;
                } else if (flag == 1) {
                    query = query + ` ${tmp} LOCATION = '${arguments.get(i)}'`;
                }
            }
            if (i == 2) {
                if (flag == 0) {
                    query = query + ` WHERE SPECIALTY = '${arguments.get(i)}'`;
                    flag = 1;
                } else if (flag == 1) {
                    query = query + ` ${tmp} SPECIALTY = '${arguments.get(i)}'`;
                }
            }
        }
    }
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(666).json({message: err});
        }
        else
        {
            if ( result.rowCount != 0 )
                res.status(200).json({message: "Doctor fetched successfully", resultobj: result.rows});
            else
                res.status(404).json({message: "No matching doctor found"});
        }
    });
});

router.post('/top/get', (req, res) => {
    var query = `SELECT *, AGE(DOCTORS.DOB) FROM DOCTORS INNER JOIN DOCTOR_RATINGS ON DOCTORS.ID = DOCTOR_RATINGS.DOCTOR_ID `;

    //map of arguments
    let arguments = new Map();

    if ( req.body.doclocation != 'N/A' )
        arguments.set(0, `${req.body.doclocation}`);

    if ( req.body.docspecialty != 'N/A' )
        arguments.set(1, `${req.body.docspecialty}`);

    if ( arguments.get(0) && arguments.get(1) )
    {
        query = query + `WHERE SPECIALTY = '${arguments.get(1)}' AND LOCATION = '${arguments.get(0)}'`;
    }
    else if ( arguments.get(0) )
    {
        query = query + `WHERE LOCATION = '${arguments.get(0)}'`;
    }
    else if ( arguments.get(1) )
    {
        query = query + `WHERE SPECIALTY = '${arguments.get(1)}'`;
    }
    else
    {
        console.log('No location or specialty specified. Showing just top rated doctor');
    }
    if ( req.body.limit != "N/A" )
    {
        query = query + ` ORDER BY DOCTOR_RATINGS.AVERAGE DESC LIMIT ${req.body.limit}`;
    }
    else
    {
        query = query + ` ORDER BY DOCTOR_RATINGS.AVERAGE DESC LIMIT 5`;
    }
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(666).json({message: err});
        }
        else
        {
            if ( result.rowCount != 0 )
                res.status(200).json({message: "Doctor fetched successfully", resultobj: result.rows});
            else
                res.status(404).json({message: "No matching doctor found"});
        }
    });
});

module.exports = router;