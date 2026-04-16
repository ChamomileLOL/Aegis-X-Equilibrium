const express = require('express');
const router = express.Router();
const Conduct = require('../models/Conduct');

router.post('/evaluate', async (req, res) => {
    const { studentName, department, clothingCoverage, isSleeveless } = req.body;

    // The Thanos Calculation
    // As per XIE PDF: "It will decrease, it's a practical law."
    let safety = clothingCoverage;
    if (isSleeveless) {
        safety = 0; // Absolute zero. No Sleeveless Allowed.
    }

    const report = new Conduct({
        studentName,
        department,
        clothingCoverage,
        isSleeveless,
        safetyProbability: safety
    });

    try {
        const savedReport = await report.save();
        res.status(201).json({
            message: "Policy applied correctly.",
            data: savedReport
        });
    } catch (err) {
        res.status(400).json({ message: "The Law was violated.", error: err });
    }
});

module.exports = router;