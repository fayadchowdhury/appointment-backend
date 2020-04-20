const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');

router.post('/get', (req, res) => {
    const query = `SELECT *, AGE(DOB) FROM DOCTORS INNER JOIN DOCTOR_RATINGS ON DOCTORS.ID = DOCTOR_RATINGS.DOCTOR_ID WHERE ID = '${req.body.docid}'`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(500).json({message: err});
        }
        else
        {
            if ( result.rows.length )
                res.status(200).json({message: "Doctor fetched successfully", resultobj: result.rows});
            else
                res.status(404).json({message: "No matching doctor found"});
        }
    });
});

router.post('/post', (req, res) => {
    const query = `insert into doctors 
    (id, name, dob, gender, blood, phone, specialty, bmdc, location, email) values 
    (uuid_generate_v4(), '${req.body.docname}', '${req.body.docdob}', '${req.body.docgender}', '${req.body.docblood}', '${req.body.docphone}', '${req.body.docspecialty}', '${req.body.docbmdc}', '${req.body.doclocation}', '${req.body.docemail}')`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(500).json({message: err});
        }
        else
        {
            const retQuery = `select * from doctors where name = '${req.body.docname}' and dob = '${req.body.docdob}' and gender = '${req.body.docgender}' and blood = '${req.body.docblood}' and specialty = '${req.body.docspecialty}' and phone = '${req.body.docphone}' and location = '${req.body.doclocation}' and email = '${req.body.docemail}' and bmdc = '${req.body.docbmdc}'`
            pool.query(retQuery, (err2, result2) => {
                if ( err2 )
                    res.status(500).json({message: err2})
                else
                    res.status(200).json({message: "Doctor registered successfully", resultobj: result2.rows});
            })
        }
    });
});

router.put('/put', (req, res) => {
    var query = `UPDATE DOCTORS`;

    //map of arguments
    var arguments = new Map();

    if ( req.body.docname != 'N/A' )
        arguments.set(0, `${req.body.docname}`);

    if ( req.body.doclocation != 'N/A' )
        arguments.set(1, `${req.body.doclocation}`);

    if ( req.body.docspecialty != 'N/A' )
        arguments.set(2, `${req.body.docspecialty}`);

    if ( req.body.docdob != 'N/A' )
        arguments.set(3, `${req.body.docdob}`);

    if ( req.body.docgender != 'N/A' )
        arguments.set(4, `${req.body.docgender}`);

    if ( req.body.docblood != 'N/A' )
        arguments.set(5, `${req.body.docblood}`);

    if ( req.body.docphone != 'N/A' )
        arguments.set(6, `${req.body.docphone}`);

    if ( req.body.docbmdc != 'N/A' )
        arguments.set(7, `${req.body.docbmdc}`);

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
                    query = query + ` SET NAME = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} NAME = '${arguments.get(i)}'`;
                }
            }
            if ( i == 1 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET LOCATION = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} LOCATION = '${arguments.get(i)}'`;
                }
            }
            if ( i == 2 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SPECIALTY = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SPECIALTY = '${arguments.get(i)}'`;
                }
            }
            if ( i == 3 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET DOB = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} DOB = '${arguments.get(i)}'`;
                }
            }
            if ( i == 4 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET GENDER = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} GENDER = '${arguments.get(i)}'`;
                }
            }
            if ( i == 5 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET BLOOD = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} BLOOD = '${arguments.get(i)}'`;
                }
            }
            if ( i == 6 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET PHONE = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} PHONE = '${arguments.get(i)}'`;
                }
            }
            if ( i == 7 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET BMDC = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} BMDC = '${arguments.get(i)}'`;
                }
            }
        }
    }
    query = query + ` WHERE ID = '${req.body.docid}'`;
    const queryCheck = `SELECT * FROM DOCTORS WHERE ID = '${req.body.docid}'`;
    pool.query(queryCheck, (err1, result1) => {
        if ( err1 )
        {
            res.status(500).json({message: err1});
        }
        else
        {
            if ( result1.rowCount == 0 )
            {
                res.status(404).json({message: "No matching doctor found"});
            }
            else
            {
                pool.query(query, (err2, result2) => {
                    if ( err2 )
                    {
                        res.status(500).json({message: err2});
                    }
                    else
                    {
                        pool.query(queryCheck, (err3, result3) => {
                            if ( err3 )
                                res.status(500).json({message: err3})
                            else
                                res.status(200).json({message: "Doctor updated successfully", resultobj: result3.rows});
                        })
                    }
                });
            }
        }
    });
});

router.post('/delete', (req, res) => {
    const query = `DELETE FROM DOCTORS WHERE ID = '${req.body.docid}'`;
    const queryCheck = `SELECT * FROM DOCTORS WHERE ID = '${req.body.docid}'`;
    pool.query(queryCheck, (err1, result1) => {
        if ( err1 )
        {
            res.status(500).json({message: err1});
        }
        else
        {
            if ( result1.rowCount == 0 )
            {
                res.status(404).json({message: "No matching doctor found"});
            }
            else
            {
                pool.query(query, (err2, result2) => {
                    if ( err2 )
                    {
                        res.status(500).json({message: err2});
                    }
                    else
                    {
                        res.status(200).json({message: "Doctor deleted successfully"});
                    }
                });
            }
        }
    });
});

module.exports = router;