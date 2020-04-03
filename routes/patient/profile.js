const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


// To create new patient entries
// req will have patientname, patientdob (in YYYY-MM-DD format), patientgender (M/F), patientblood (A+, A_, B+, B-, O+, O-, AB+, AB-), patientphone, patientaddress (only smallest specific area), patientemail
router.post('/create', (req, res) => {
   const query = `insert into patients (id, name, dob, gender, blood, past, phone, address, email) values (uuid_generate_v4(), '${req.body.patientname}', '${req.body.patientdob}', '${req.body.patientgender}', '${req.body.patientblood}', '${req.body.patientpast}', '${req.body.patientphone}', '${req.body.patientaddress}', '${req.body.patientemail}');`
   pool.query(query, (err, result) =>
   {
      if ( err )
      {
         res.status(404).send(err);
      }
      else
      {
         res.status(200).json({message: "Patient created successfully"});
      }
   });
});


// To view own profile
// Check via UUID
router.get('/self', (req, res) => {
   const query = `SELECT * FROM PATIENTS WHERE ID = '${req.body.docid}'`;
   pool.query(query, (err, result) => {
      if ( err )
      {
         res.status(404).send(err);
      }
      else
      {
         res.status(200).json(result.rows);
      }
   })
});


// To update user (has to be done by the user himself/herself)
// Check based on UUID
// Can change everything except email
router.put('/update', (req, res) => {
   var query = `UPDATE PATIENTS`;

   //map of arguments
   var arguments = new Map();

   if ( req.body.patientname != 'N/A' )
      arguments.set(0, `${req.body.patientname}`);

   if ( req.body.patientaddress != 'N/A' )
      arguments.set(1, `${req.body.patientaddress}`);

   if ( req.body.patientdob != 'N/A' )
      arguments.set(2, `${req.body.patientdob}`);

   if ( req.body.patientgender != 'N/A' )
      arguments.set(3, `${req.body.patientgender}`);

   if ( req.body.patientblood != 'N/A' )
      arguments.set(4, `${req.body.patientblood}`);

   if ( req.body.patientphone != 'N/A' )
      arguments.set(5, `${req.body.patientphone}`);

   if ( req.body.patientpast != 'N/A' )
      arguments.set(7, `${req.body.patientpast}`);

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
               query = query + ` SET ADDRESS = '${arguments.get(i)}'`;
               flag = 1;
            }
            else if ( flag == 1 )
            {
               query = query + `${tmp} ADDRESS = '${arguments.get(i)}'`;
            }
         }
         if ( i == 2 )
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
         if ( i == 3 )
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
         if ( i == 4 )
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
         if ( i == 5 )
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
         if ( i == 6 )
         {
            if ( flag == 0)
            {
               query = query + ` SET PAST = '${arguments.get(i)}'`;
               flag = 1;
            }
            else if ( flag == 1 )
            {
               query = query + `${tmp} PAST = '${arguments.get(i)}'`;
            }
         }
      }
   }
   query = query + ` WHERE ID = '${req.body.patientid}'`;
   pool.query(query, (err, result) =>
   {
      if ( err )
      {
         res.status(404).send(err);
      }
      else
      {
         res.status(200).json({message: "Patient updated successfully"});
      }
   });
});


// To delete user (has to be done by user himself/herself)
// Check based on UUID
router.delete('/delete', (req, res) => {
   const query = `DELETE FROM PATIENTS WHERE ID = '${req.body.patientid}'`;
   pool.query(query, (err, result) =>
   {
      if ( err )
      {
         res.status(404).send(err);
      }
      else
      {
         res.status(200).json({message: "Patient deleted successfully"});
      }
   });
});

module.exports = router;