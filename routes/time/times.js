const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');


// For a specific doctor or patient to view the doctor's time schedule
router.get('/', (req, res) => {
    const query = `SELECT * FROM DOCTOR_TIMES WHERE DOCTOR_ID = '${req.body.docid}'`;
    pool.query(query, (err, result) => {
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


// For a specific doctor to create his/her specific time schedule
router.post('/', (req, res) => {
    const query = `INSERT INTO DOCTOR_TIMES (doctor_id, sunStart, sunEnd, sunSlots, monStart, monEnd, monSlots, tuesStart, tuesEnd, tuesSlots, wedStart, wedEnd, wedSlots, thursStart, thursEnd, thursSlots, friStart, friEnd, friSlots, satStart, satEnd, satSlots) VALUES
    ('${req.body.docid}', '${req.body.docsunStart}', '${req.body.docsunEnd}', '${req.body.docsunSlots}', '${req.body.docmonStart}', '${req.body.docmonEnd}', '${req.body.docmonSlots}', '${req.body.doctuesStart}', '${req.body.doctuesEnd}', '${req.body.doctuesSlots}', '${req.body.docwedStart}', '${req.body.docwedEnd}', '${req.body.docwedSlots}', '${req.body.docthursStart}', '${req.body.docthursEnd}', '${req.body.docthursSlots}', '${req.body.docfriStart}', '${req.body.docfriEnd}', '${req.body.docfriSlots}', '${req.body.docsatStart}', '${req.body.docsatEnd}', '${req.body.docsatSlots}')`;
    pool.query(query, (err, result) => {
       if ( err )
       {
           res.status(404).send(err);
       }
       else
       {
           res.status(200).json({message: "Times posted successfully"});
       }
    });
});


// For a specific doctor to update his/her time schedule
router.put('/', (req, res) => {
    var query = `UPDATE DOCTOR_TIMES`;
    var arguments = new Map();

    if ( req.body.docsunStart != 'N/A' )
        arguments.set(0, `${req.body.docsunStart}`);
    if ( req.body.docsunEnd != 'N/A' )
        arguments.set(1, `${req.body.docsunEnd}`);
    if ( req.body.docsunSlots != 'N/A' )
        arguments.set(2, `${req.body.docsunSlots}`);
    if ( req.body.docmonStart != 'N/A' )
        arguments.set(3, `${req.body.docmonStart}`);
    if ( req.body.docmonEnd != 'N/A' )
        arguments.set(4, `${req.body.docmonEnd}`);
    if ( req.body.docmonSlots != 'N/A' )
        arguments.set(5, `${req.body.docmonSlots}`);
    if ( req.body.doctuesStart != 'N/A' )
        arguments.set(6, `${req.body.doctuesStart}`);
    if ( req.body.doctuesEnd != 'N/A' )
        arguments.set(7, `${req.body.doctuesEnd}`);
    if ( req.body.doctuesSlots != 'N/A' )
        arguments.set(8, `${req.body.doctuesSlots}`);
    if ( req.body.docwedStart != 'N/A' )
        arguments.set(9, `${req.body.docwedStart}`);
    if ( req.body.docwedEnd != 'N/A' )
        arguments.set(10, `${req.body.docwedEnd}`);
    if ( req.body.docwedSlots != 'N/A' )
        arguments.set(11, `${req.body.docwedSlots}`);
    if ( req.body.docthursStart != 'N/A' )
        arguments.set(12, `${req.body.docthursStart}`);
    if ( req.body.docthursEnd != 'N/A' )
        arguments.set(13, `${req.body.docthursEnd}`);
    if ( req.body.docthursSlots != 'N/A' )
        arguments.set(14, `${req.body.docthursSlots}`);
    if ( req.body.docfriStart != 'N/A' )
        arguments.set(15, `${req.body.docfriStart}`);
    if ( req.body.docfriEnd != 'N/A' )
        arguments.set(16, `${req.body.docfriEnd}`);
    if ( req.body.docfriSlots != 'N/A' )
        arguments.set(17, `${req.body.docfriSlots}`);
    if ( req.body.docsatStart != 'N/A' )
        arguments.set(18, `${req.body.docsatStart}`);
    if ( req.body.docsatEnd != 'N/A' )
        arguments.set(19, `${req.body.docsatEnd}`);
    if ( req.body.docsatSlots != 'N/A' )
        arguments.set(20, `${req.body.docsatSlots}`);

    var tmp = ',';
    var flag = 0;
    for ( i = 0 ; i < 21 ; i++ )
    {
        if ( arguments.get(i) )
        {
            if ( i == 0 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SUNSTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SUNSTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 1 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SUNEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SUNEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 2 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SUNSLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SUNSLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 3 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET MONSTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} MONSTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 4 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET MONEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} MONEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 5 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET MONSLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} MONSLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 6 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET TUESSTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} TUESSTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 7 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET TUESEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} TUESEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 8 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET TUESSLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag ==1 )
                {
                    query = query + `${tmp} TUESSLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 9 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET WEDSTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} WEDSTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 10 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET WEDEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} WEDEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 11 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET WEDSLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} WEDSLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 12 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET THURSSTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} THURSSTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 13 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET THURSEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} THURSEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 14 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET THURSSLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} THURSSLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 15 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET FRISTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} FRISTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 16 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET FRIEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} FRIEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 17 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET FRISLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} FRISLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 18 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SATSTART = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SATSTART = '${arguments.get(i)}'`;
                }
            }
            if ( i == 19 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SATEND = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SATEND = '${arguments.get(i)}'`;
                }
            }
            if ( i == 20 )
            {
                if ( flag == 0)
                {
                    query = query + ` SET SATSLOTS = '${arguments.get(i)}'`;
                    flag = 1;
                }
                else if ( flag == 1 )
                {
                    query = query + `${tmp} SATSLOTS = '${arguments.get(i)}'`;
                }
            }
            if ( i == 21 )
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
    query = query + ` WHERE DOCTOR_ID = '${req.body.docid}'`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json({message: "Times updated successfully"});
        }
    });
});


// For a specific doctor to delete his/her time schedule
router.delete('/',  (req, res) => {
    const query = `DELETE FROM DOCTOR_TIMES WHERE DOCTOR_ID = ${req.body.docid}`;
    pool.query(query, (err, result) => {
        if ( err )
        {
            res.status(404).send(err);
        }
        else
        {
            res.status(200).json({message: "Times deleted successfully"});
        }
    });
});

module.exports = router;