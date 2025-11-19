const Assessment = require("../models/Assessment");
const Progress = require("../models/Progress");
const { autoGrade, classifyCBCLevel } = require("../utils/cbcEngine");

// ================================================
// 🔥 Submit Assessment (Auto-Graded) — MAIN LOGIC
// ================================================
exports.submitAssessment = async (req, res) => {
  try {
    const { studentId, assessmentId, studentAnswer } = req.body;

    // Fetch assessment details
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    // CBC Auto-Grading
    const score = autoGrade(studentAnswer, assessment.keywords);
    const level = classifyCBCLevel(score);

    // Save into student progress
    const progress = await Progress.create({
      studentId,
      assessmentId,
      score,
      cbcLevel: level,
      submittedAnswer: studentAnswer,
    });

    res.json({
      message: "Assessment graded successfully",
      score,
      level,
      progress,
    });

  } catch (error) {
    console.error("❌ Error in submitAssessment:", error);
    res.status(500).json({ error: "Server error: could not submit assessment" });
  }
};

// ================================================
// 🔥 Create New Assessment (Teacher Upload)
// ================================================
exports.createAssessment = async (req, res) => {
  try {
    const { title, subject, gradeLevel, keywords } = req.body;

    const assessment = await Assessment.create({
      title,
      subject,
      gradeLevel,
      keywords: keywords.split(",").map(k => k.trim()), // Convert to array
    });

    res.json({
      message: "Assessment created successfully",
      assessment,
    });
  } catch (error) {
    console.error("❌ Error in createAssessment:", error);
    res.status(500).json({ error: "Unable to create assessment" });
  }
};

// ================================================
// 🔥 Fetch All Assessments (Teacher or Student View)
// ================================================
exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    console.error("❌ Error fetching assessments:", error);
    res.status(500).json({ error: "Unable to fetch assessments" });
  }
};

// ================================================
// 🔥 Get Student Progress Summary
// ================================================
exports.getStudentProgress = async (req, res) => {
  try {
    const { studentId } = req.params;

    const progress = await Progress.find({ studentId })
      .populate("assessmentId", "title subject gradeLevel");

    res.json(progress);
  } catch (error) {
    console.error("❌ Error in getStudentProgress:", error);
    res.status(500).json({ error: "Unable to fetch progress" });
  }
};

// ================================================
// 🔥 Teacher Dashboard Analytics
// ================================================
exports.getAssessmentAnalytics = async (req, res) => {
  try {
    const assessments = await Assessment.find().lean();

    const progress = await Progress.aggregate([
      {
        $group: {
          _id: "$cbcLevel",
          count: { $sum: 1 },
          avgScore: { $avg: "$score" },
        }
      }
    ]);

    res.json({ assessments, performance: progress });

  } catch (error) {
    console.error("❌ Error in analytics:", error);
    res.status(500).json({ error: "Unable to load analytics" });
  }
};
