/**
 * Interactive Machine Learning Playground Widget
 * Live in-browser inference simulator for student performance and engineering readiness
 */

(function () {
  const studySlider = document.getElementById('ml-study-hours');
  const attendanceSlider = document.getElementById('ml-attendance');
  const projectsSlider = document.getElementById('ml-projects');
  const codingSlider = document.getElementById('ml-coding-score');

  const studyVal = document.getElementById('study-val');
  const attendanceVal = document.getElementById('attendance-val');
  const projectsVal = document.getElementById('projects-val');
  const codingVal = document.getElementById('coding-val');

  const predScore = document.getElementById('ml-pred-score');
  const predLabel = document.getElementById('ml-pred-label');
  const predConfidence = document.getElementById('ml-pred-confidence');

  const barStudy = document.getElementById('bar-study');
  const barAttendance = document.getElementById('bar-attendance');
  const barProjects = document.getElementById('bar-projects');
  const barCoding = document.getElementById('bar-coding');

  if (!studySlider || !attendanceSlider || !projectsSlider || !codingSlider) return;

  function calculatePrediction() {
    const study = parseFloat(studySlider.value); // 1 to 10 hrs
    const attendance = parseFloat(attendanceSlider.value); // 50 to 100 %
    const projects = parseFloat(projectsSlider.value); // 1 to 10
    const coding = parseFloat(codingSlider.value); // 10 to 300 solved

    // Update displayed values
    if (studyVal) studyVal.textContent = `${study} hrs/day`;
    if (attendanceVal) attendanceVal.textContent = `${attendance}%`;
    if (projectsVal) projectsVal.textContent = `${projects} built`;
    if (codingVal) codingVal.textContent = `${coding} solved`;

    // Feature normalization (0.0 to 1.0)
    const normStudy = (study - 1) / 9;
    const normAttendance = (attendance - 50) / 50;
    const normProjects = (projects - 1) / 9;
    const normCoding = (coding - 10) / 290;

    // Feature Weights (Simulating Trained Linear Regression / Random Forest model)
    const weightStudy = 0.25;
    const weightAttendance = 0.20;
    const weightProjects = 0.30;
    const weightCoding = 0.25;

    // Weighted Score (0 to 100)
    const rawScore = (
      normStudy * weightStudy +
      normAttendance * weightAttendance +
      normProjects * weightProjects +
      normCoding * weightCoding
    );

    // Projected CGPA (from 7.00 to 9.95)
    const projectedCGPA = (7.0 + rawScore * 2.95).toFixed(2);
    const confidence = (88 + rawScore * 11.5).toFixed(1);

    // Update Output Panel
    if (predScore) predScore.textContent = projectedCGPA;
    if (predConfidence) predConfidence.textContent = `Model Confidence: ${confidence}% | RMSE: 0.042`;

    if (predLabel) {
      if (projectedCGPA >= 9.0) {
        predLabel.textContent = '🌟 Top Tier Honors & AI Specialist';
        predLabel.style.color = '#00f2fe';
      } else if (projectedCGPA >= 8.4) {
        predLabel.textContent = '🚀 Distinction & High-Performance Developer';
        predLabel.style.color = '#10b981';
      } else {
        predLabel.textContent = '📈 Proficient Engineer & Active Learner';
        predLabel.style.color = '#fbbf24';
      }
    }

    // Dynamic Feature Weight Bars
    if (barStudy) barStudy.style.width = `${Math.round(normStudy * 100)}%`;
    if (barAttendance) barAttendance.style.width = `${Math.round(normAttendance * 100)}%`;
    if (barProjects) barProjects.style.width = `${Math.round(normProjects * 100)}%`;
    if (barCoding) barCoding.style.width = `${Math.round(normCoding * 100)}%`;
  }

  // Attach event listeners
  [studySlider, attendanceSlider, projectsSlider, codingSlider].forEach((slider) => {
    slider.addEventListener('input', calculatePrediction);
  });

  // Initial calculation
  calculatePrediction();
})();
