const express = require('express');
const router = express.Router();
const pool = require('../dbPool');

// For custom searches
// req will be of type AND (all conditions have to match) or OR (some conditions may match only)
// req will also contain the parameters name, location, specialty (if N/A, not included in query, otherwise included)
router.get('/find', (req, res) => {
   var query = 'SELECT *, AGE(DOB) FROM DOCTORS';
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
   for ( i = 0 ; i < 3 ; i++ )
   {
       if ( arguments.get(i) )
       {
           if ( i == 0 )
           {
               if ( flag == 0)
               {
                   query = query + ` WHERE NAME = '${arguments.get(i)}'`;
                   flag = 1;
               }
               else if ( flag == 1 )
               {
                   query = query + ` ${tmp} NAME = '${arguments.get(i)}'`;
               }
           }
           if ( i == 1 )
           {
               if ( flag == 0)
               {
                   query = query + ` WHERE LOCATION = '${arguments.get(i)}'`;
                   flag = 1;
               }
               else if ( flag == 1 )
               {
                   query = query + ` ${tmp} LOCATION = '${arguments.get(i)}'`;
               }
           }
           if ( i == 2 )
           {
               if ( flag == 0)
               {
                   query = query + ` WHERE SPECIALTY = '${arguments.get(i)}'`;
                   flag = 1;
               }
               else if ( flag == 1 )
               {
                   query = query + ` ${tmp} SPECIALTY = '${arguments.get(i)}'`;
               }
           }
       }
   }
   console.log(query);
   pool.query(query, (err, result) =>
   {
       if ( err )
       {
           res.status(404).send(err);
       }
       else
       {
           res.status(200).json(result.rows);
       }
   });
});

// For general display
// Specialty and/or location must be specified
// Will be based on rating
// Top 5 doctors from selected specialty and/or location will be displayed or the specified number
router.get('/findtop', (req, res) => {
    var query = `SELECT *, AGE(DOCTORS.DOB) FROM DOCTORS INNER JOIN DOCTOR_RATINGS ON DOCTORS.ID = DOCTOR_RATINGS.DOCTOR_ID`;

    //map of arguments
    let arguments = new Map();

    if ( req.body.doclocation != 'N/A' )
        arguments.set(0, `${req.body.doclocation}`);

    if ( req.body.docspecialty != 'N/A' )
        arguments.set(1, `${req.body.docspecialty}`);

    if ( arguments.get(0) && arguments.get(1) )
    {
        query = query + `WHERE SPECIALTY = ${arguments.get(1)} AND LOCATION = ${arguments.get(0)}`;
    }
    else if ( arguments.get(0) )
    {
        query = query + `WHERE LOCATION = ${arguments.get(0)}`;
    }
    else if ( arguments.get(1) )
    {
        query = query + `WHERE SPECIALTY = ${arguments.get(1)}`;
    }
    else
    {
        console.log('No location or specialty specified. Showing just top rated doctors');
    }
    if ( req.body.limit != "N/A" )
    {
        query = query + ` ORDER BY DOCTOR_RATINGS.AVERAGE LIMIT ${req.body.limit}`;
    }
    else
    {
        query = query + ` ORDER BY DOCTOR_RATINGS.AVERAGE LIMIT 5`;
    }
    console.log(query);
    pool.query(query, (err, result) =>
    {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json(result.rows);
        }
    });
});

// To create new doctor entries
// req will have docname, docdob (in YYYY-MM-DD format), docgender (M/F), docblood (A+, A_, B+, B-, O+, O-, AB+, AB-), docphone, doclocation (only smallest specific area), docspecialty, docbmdc, docemail
router.post('/create', (req, res) => {
    const query = `insert into doctors 
    (id, name, dob, gender, blood, phone, specialty, bmdc, location, email) values 
    (uuid_generate_v4(), '${req.body.docname}', '${req.body.docdob}', '${req.body.docgender}', '${req.body.docblood}', '${req.body.docphone}', '${req.body.docspecialty}', '${req.body.docbmdc}', '${req.body.doclocation}', '${req.body.docemail}')`;
    pool.query(query, (err, result) =>
    {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json(result.rows);
        }
    });
});

// To update user (has to be done by the user himself/herself)
// Check based on UUID
// Can change everything except email
router.put('/update', (req, res) => {
    var query = `UPDATE DOCTORS`;

    //map of arguments
    let arguments = new Map();

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
    pool.query(query, (err, result) =>
    {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json(result.rows);
        }
    });
});


// To delete user (has to be done by user himself/herself)
// Check based on UUID
router.delete('/delete', (req, res) => {
    const query = `DELETE FROM DOCTORS WHERE ID = '${req.body.docid}'`;
    pool.query(query, (err, result) =>
    {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json(result.rows);
        }
    });
});

module.exports = router;