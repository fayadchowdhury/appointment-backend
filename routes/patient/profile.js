const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');

router.post('/post', (req, res) => {
   const query = `insert into patients (id, name, dob, gender, blood, past, phone, address, email) values (uuid_generate_v4(), '${req.body.patientname}', '${req.body.patientdob}', '${req.body.patientgender}', '${req.body.patientblood}', '${req.body.patientpast}', '${req.body.patientphone}', '${req.body.patientaddress}', '${req.body.patientemail}');`
   console.log(query)
   pool.query(query, (err, result) => {
      if ( err )
      {
         res.status(500).json({message: err});
      }
      else
      {
         const retQuery = `select *, age(dob) from patients where name = '${req.body.patientname}' and dob = '${req.body.patientdob}' and gender = '${req.body.patientgender}' and blood = '${req.body.patientblood}' and past = '${req.body.patientpast}' and phone = '${req.body.patientphone}' and address = '${req.body.patientaddress}' and email = '${req.body.patientemail}'`
         console.log(retQuery)
         pool.query(retQuery, (err2, result2) => {
            if ( err2 )
               res.status(500).json({message: err2})
            else
               res.status(200).json({message: "Patient registered successfully", resultobj: result2.rows});
         })
      }
   });
});

router.post('/get', (req, res) => {
   const query = `SELECT *, AGE(DOB) FROM PATIENTS WHERE ID = '${req.body.patientid}'`;
   pool.query(query, (err, result) => {
      if ( err )
      {
         res.status(500).json({message: err});
      }
      else
      {
         if ( result.rowCount != 0 )
            res.status(200).json({message: "Patient fetched successfully", resultobj: result.rows});
         else
            res.status(404).json({message: "No matching patient found"});
      }
   });
});

router.put('/put', (req, res) => {
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
   const queryCheck = `SELECT * FROM PATIENTS WHERE ID = '${req.body.patientid}'`;
   pool.query(queryCheck, (err1, result1) => {
      if ( err1 )
      {
         res.status(500).json({message: err1});
      }
      else
      {
         if ( result1.rowCount == 0 )
         {
            res.status(404).json({message: "No matching patient found"});
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
                  const retQuery = `select *, age(dob) from patients where id = '${req.body.patientid}'`
                  pool.query(retQuery, (err3, result3) => {
                     if ( err3 )
                        res.status(500).json({message: err3})
                     else
                        res.status(200).json({message: "Patient updated successfully", resultobj: result3.rows});
                  })
               }
            });
         }
      }
   });
});

router.post('/delete', (req, res) => {
   const query = `DELETE FROM PATIENTS WHERE ID = '${req.body.patientid}'`;
   const queryCheck = `SELECT * FROM PATIENTS WHERE ID = '${req.body.patientid}'`;
   pool.query(queryCheck, (err1, result1) => {
      if ( err1 )
      {
         res.status(500).json({message: err1})
      }
      else
      {
         if ( result1.rowCount == 0 )
         {
            res.status(404).json({message: "No matching patient found"});
         }
         else
         {
            pool.query(query, (err2, result2) => {
               if ( err2 )
               {
                  res.status(500).json({message: err});
               }
               else
               {
                  res.status(200).json({message: "Patient deleted successfully"});
               }
            });
         }
      }
   });
});

module.exports = router;