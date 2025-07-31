import express from 'express';
import Activity from '../models/Activity';

const router = express.Router();

// Get all activities
router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

// Create a new activity
router.post('/activities', async (req, res) => {
  try {
    const { name, description, date, location, participants, creator } =
      req.body;

    // Create a new activity instance
    const newActivity = new Activity({
      name,
      description,
      date,
      location,
      participants,
      creator,
    });

    // Save to the database
    const savedActivity = await newActivity.save();
    res.status(201).json({
      message: 'Activity created successfully',
      activity: savedActivity,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create activity', error });
  }
});

// Update an activity
router.put('/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find the activity by ID and update it
    const updatedActivity = await Activity.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(updatedActivity); // Return the updated activity
  } catch (error) {
    res.status(500).json({ message: 'Failed to update activity', error });
  }
});

// Delete an activity
router.delete('/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the activity by ID and delete it
    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete activity', error });
  }
});

export default router;
