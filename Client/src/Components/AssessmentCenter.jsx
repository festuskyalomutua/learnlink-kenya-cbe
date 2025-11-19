import React from "react";

function AssessmentCenter() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Assessment Center</h1>
      <p className="text-gray-700 mb-4">
        Browse or assign Competency Based Assessments for learners.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Math Competency Test</h3>
          <p className="text-sm text-gray-600">Grade 7 • 20 Questions</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">Science Practical Assessment</h3>
          <p className="text-sm text-gray-600">Grade 8 • Lab Task</p>
        </div>
      </div>
    </div>
  );
}

export default AssessmentCenter;
