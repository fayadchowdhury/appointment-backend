const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


router.put('/put', (req, res) => {
   const docid = req.body.docid;
   const oldQuery = `SELECT NUMRATINGS, SUMRATINGS FROM DOCTOR_RATINGS WHERE DOCTOR_ID = '${docid}'`;
   var oldSum, oldNum;
   pool.query(oldQuery, (err1, result1) => {
       if ( err1 )
       {
           res.status(500).json({message: err1});
       }
       else
       {
           if ( result1.rowCount != 0 )
           {
               oldSum = result1.rows[0].sumratings;
               oldNum = result1.rows[0].numratings;
               var newSum = parseInt(oldSum) + parseInt(req.body.docrating);
               var newNum = parseInt(oldNum) + 1;
               var newAvg = newSum / newNum;
               newSum = newSum.toString();
               newNum = newNum.toString();
               newAvg = newAvg.toString();
               const newQuery = `UPDATE DOCTOR_RATINGS SET SUMRATINGS = ${newSum}, NUMRATINGS = ${newNum}, AVERAGE = ${newAvg} WHERE DOCTOR_ID = '${docid}'`;
               pool.query(newQuery, (err2, result2) => {
                   if ( err2 )
                   {
                       res.status(500).json({message: err2});
                   }
                   else
                   {
                       res.status(200).json({message: "Ratings updated successfully"});
                   }
               });
           }
           else
           {
               res.status(404).json({messaage: "No matching entry found"})
           }
       }
   });
});

module.exports = router;