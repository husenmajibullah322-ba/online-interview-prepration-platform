const Interview = require('../models/Interview');

// Create a new interview
exports.createInterview = async (req, res) => {
    try {
        const interviewData = req.body;
        const newInterview = new Interview(interviewData);
        await newInterview.save();
        res.status(201).json(newInterview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating interview', error });
    }
};

// Get all interviews
exports.getInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching interviews', error });
    }
};

// Get a single interview by ID
exports.getInterviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const interview = await Interview.findById(id);
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json(interview);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching interview', error });
    }
};

// Update an interview by ID
exports.updateInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInterview = await Interview.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedInterview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json(updatedInterview);
    } catch (error) {
        res.status(500).json({ message: 'Error updating interview', error });
    }
};

// Delete an interview by ID
exports.deleteInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInterview = await Interview.findByIdAndDelete(id);
        if (!deletedInterview) {
            return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting interview', error });
    }
};