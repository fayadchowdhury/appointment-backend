const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


router.put('/', (req, res) => {
   const docid = req.body.docid;
   const oldQuery = `SELECT NUMRATINGS, SUMRATINGS FROM DOCTOR_RATINGS WHERE DOCTOR_ID = '${docid}'`;
   var oldSum, oldNum
   pool.query(oldQuery, (err, result) => {
       if ( err )
       {
           res.status(404).send(err);
       }
       else
       {
           oldSum = result.rows[0].sumratings;
           oldNum = result.rows[0].numratings;
           console.log(oldSum + " " + oldNum);
           var newSum = parseInt(oldSum) + parseInt(req.body.docrating);
           var newNum = parseInt(oldNum) + 1;
           var newAvg = newSum / newNum;
           console.log(newSum + " " + newNum + " " + newAvg);
           newSum = newSum.toString();
           newNum = newNum.toString();
           newAvg = newAvg.toString();
           const newQuery = `UPDATE DOCTOR_RATINGS SET SUMRATINGS = ${newSum}, NUMRATINGS = ${newNum}, AVERAGE = ${newAvg} WHERE DOCTOR_ID = '${docid}'`;
           pool.query(newQuery, (err, result) => {
               if ( err )
               {
                   res.status(404).send(err);
               }
               else
               {
                   res.status(200).json({message: "Ratings updated successfully"});
               }
           });
       }
   });
});

module.exports = router;