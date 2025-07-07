import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req,res) => {
 try{
    const {name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email & message are required"});
    }

    const newFeedback = new Feedback({
        name,
        email,
        message,
        status: "new" //default state
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
        message: "Feedback submitted successfully 🎉",
        feedback: savedFeedback
    });
 } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({message: "Internal server error"});
 }
};

export const getUserFeedback = async (req,res) => {
    try{
        const { email} = req.params;
        const feedback =  await eedback.find({ email });
         
        res.status(200).json({
            message: "User feedback retrieved successfully",
            feedback
        });
    } catch (error){
        console.error("Error retrieving user feedback:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getAllFeedback = async (req,res) => {
   try{
    const notes = await Feedback.find().sort({ createdAt:-1 });
    res.json(notes);
  }catch(err){ res.status(500).json({ message:'Server error' }); }
};

export const updateFeedbackStatus = async (req, res) => {
    try {
         const { id }     = req.params;
    const { status } = req.body;        // expect: "new", "in‑progress", "addressed"

    const updated = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback status updated successfully",
      feedback: updated
    });
  } catch (error) {
    console.error("Error updating feedback status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};