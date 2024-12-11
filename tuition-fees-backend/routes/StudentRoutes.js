const express = require('express');
const router = express.Router();
const StudentInfo = require('../models/StudentInfo');

router.get('/students', async (req, res) => {
    try {
        const students = await StudentInfo.find().populate('standard subject');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/students/:id', async (req, res) => {
    try {
        const student = await StudentInfo.findById(req.params.id).populate('standard subject');
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
