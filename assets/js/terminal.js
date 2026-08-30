/**
 * Interactive CLI Developer Terminal
 */

(function () {
  const terminalInput = document.getElementById('term-input');
  const terminalBody = document.getElementById('term-body');
  const terminalOutput = document.getElementById('term-output');

  if (!terminalInput || !terminalOutput) return;

  const COMMANDS = {
    help: () => `
<div class="terminal-line term-cyan">Available Commands:</div>
<div class="terminal-line">  <span class="term-green">whoami</span>       - About Uday Shankar Praneet</div>
<div class="terminal-line">  <span class="term-green">skills</span>       - Core tech stack & ML capabilities</div>
<div class="terminal-line">  <span class="term-green">projects</span>     - Production architecture & systems</div>
<div class="terminal-line">  <span class="term-green">ml</span>           - Machine Learning models & workflows</div>
<div class="terminal-line">  <span class="term-green">education</span>    - Academic background & CGPA (8.98)</div>
<div class="terminal-line">  <span class="term-green">certs</span>        - Professional certifications</div>
<div class="terminal-line">  <span class="term-green">achievements</span> - Milestones & LeetCode badges</div>
<div class="terminal-line">  <span class="term-green">contact</span>      - Email, phone, GitHub, LinkedIn</div>
<div class="terminal-line">  <span class="term-green">theme</span>        - Toggle Dark/Light mode</div>
<div class="terminal-line">  <span class="term-green">clear</span>        - Clear the terminal console</div>
<div class="terminal-line">  <span class="term-green">quote</span>        - Display a tech quote</div>
`,

    whoami: () => `
<div class="terminal-line"><span class="term-cyan">Name:</span> Uday Shankar Praneet</div>
<div class="terminal-line"><span class="term-cyan">Specialization:</span> Computer Science & Engineering (AI & ML)</div>
<div class="terminal-line"><span class="term-cyan">Institution:</span> Lovely Professional University (CGPA: 8.98)</div>
<div class="terminal-line"><span class="term-cyan">Passion:</span> Building scalable, high-performance web systems and deploying real-world AI/ML models.</div>
`,

    skills: () => `
<div class="terminal-line"><span class="term-purple">Languages:</span> C, C++, Python, JavaScript</div>
<div class="terminal-line"><span class="term-purple">AI / ML:</span> NumPy, Pandas, Scikit-learn, EDA, Supervised/Unsupervised Learning</div>
<div class="terminal-line"><span class="term-purple">Databases:</span> MySQL, PostgreSQL, Relational Schema Design</div>
<div class="terminal-line"><span class="term-purple">Web & Tools:</span> HTML5, CSS3, Modern JS, Git, Email/SMS API Gateway</div>
<div class="terminal-line"><span class="term-purple">Engineering:</span> IEEE 830-1998 Standards, RBAC, High Concurrency Scalability</div>
`,

    projects: () => `
<div class="terminal-line term-cyan">Featured Architecture:</div>
<div class="terminal-line"><span class="term-green">Smart Classroom Management System</span> (Dec 2025 - Jan 2026)</div>
<div class="terminal-line"> ▹ Engineered per IEEE 830-1998 standards for 500 concurrent users with 99% uptime.</div>
<div class="terminal-line"> ▹ Built secure 3-role RBAC (Admin, Teacher, Student) with hashed auth & session timeout.</div>
<div class="terminal-line"> ▹ Real-time attendance tracking with <5s admin analytics reporting.</div>
<div class="terminal-line"> ▹ Online examination pipeline with auto-calculated grading.</div>
`,

    ml: () => `
<div class="terminal-line term-cyan">Machine Learning & AI Expertise:</div>
<div class="terminal-line"> ▹ Data preprocessing, EDA & feature transformation pipelines.</div>
<div class="terminal-line"> ▹ Regression, Classification & Clustering algorithms in Scikit-learn.</div>
<div class="terminal-line"> ▹ Model evaluation with Precision, Recall, F1, RMSE, and ROC-AUC metrics.</div>
<div class="terminal-line"> ▹ Summer ML/AI Training completed at Lovely Professional University.</div>
`,

    education: () => `
<div class="terminal-line term-cyan">Education Journey:</div>
<div class="terminal-line"><span class="term-green">B.Tech - Computer Science & Engineering (AI&ML)</span> (2025 - Present)</div>
<div class="terminal-line">  Lovely Professional University, Phagwara, Punjab | <span class="term-yellow">CGPA: 8.98</span></div>
<div class="terminal-line"><span class="term-green">Higher Secondary Education (12th)</span> (2023 - 2025)</div>
<div class="terminal-line">  Army Public School, Chennai, Tamil Nadu | <span class="term-yellow">Percentage: 81.2%</span></div>
<div class="terminal-line"><span class="term-green">Secondary Education (10th)</span> (2021 - 2023)</div>
<div class="terminal-line">  Army Public School, Meerut, Uttar Pradesh | <span class="term-yellow">Percentage: 87%</span></div>
`,

    certs: () => `
<div class="terminal-line term-cyan">Certifications:</div>
<div class="terminal-line"> 🛡️ <span class="term-green">Introduction to Cyber Security</span> | INFOSYS (Mar 2026)</div>
<div class="terminal-line"> 🐍 <span class="term-green">Introduction to Python</span> | Saylor Academy (Feb 2026)</div>
<div class="terminal-line"> 🤖 <span class="term-green">AI For All</span> | Intel (Oct 2024)</div>
`,

    achievements: () => `
<div class="terminal-line term-cyan">Achievements & Badges:</div>
<div class="terminal-line"> 🏅 <span class="term-yellow">LeetCode 100 Days Badge</span> - Daily consistent problem solving.</div>
<div class="terminal-line"> 💻 <span class="term-yellow">100+ Problems Solved</span> across competitive coding platforms.</div>
<div class="terminal-line"> 🌟 <span class="term-yellow">8.98 Academic CGPA</span> in B.Tech CSE (AI & ML).</div>
`,

    contact: () => `
<div class="terminal-line term-cyan">Direct Contact Coordinates:</div>
<div class="terminal-line">  📧 Email: <a href="mailto:udayshankarpraneet@gmail.com" class="term-green">udayshankarpraneet@gmail.com</a></div>
<div class="terminal-line">  📱 Phone: <a href="tel:+9173848xxxxx" class="term-green">+91 73848xxxxx</a></div>
<div class="terminal-line">  🔗 LinkedIn: <a href="https://www.linkedin.com/in/uday-shankar-praneet" target="_blank" class="term-cyan">linkedin.com/in/uday-shankar-praneet</a></div>
<div class="terminal-line">  🐙 GitHub: <a href="https://github.com/udayshankarpraneet-afk" target="_blank" class="term-cyan">github.com/udayshankarpraneet-afk</a></div>
`,

    theme: () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      return `<div class="terminal-line term-yellow">Theme toggled to <strong>${newTheme.toUpperCase()}</strong> mode.</div>`;
    },

    quote: () => {
      const quotes = [
        `"Artificial Intelligence is not about replacing human intelligence; it is about amplifying human capability."`,
        `"Clean code always looks like it was written by someone who cares." - Robert C. Martin`,
        `"Simplicity is prerequisite for reliability." - Edsger W. Dijkstra`,
        `"Data is the new oil, but machine learning is the combustion engine."`
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      return `<div class="terminal-line term-purple">${randomQuote}</div>`;
    },

    sudo: () => `<div class="terminal-line term-yellow">Permission granted! Welcome, sudo visitor. You have full browsing privileges.</div>`,

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const rawInput = this.value.trim();
      const cmd = rawInput.toLowerCase();
      this.value = '';

      if (!rawInput) return;

      // Append command prompt line
      const userLine = document.createElement('div');
      userLine.className = 'terminal-line';
      userLine.innerHTML = `<span class="term-cyan">guest@uday-terminal:~$</span> ${escapeHtml(rawInput)}`;
      terminalOutput.appendChild(userLine);

      // Process command
      if (COMMANDS[cmd]) {
        const response = COMMANDS[cmd]();
        if (response) {
          const resDiv = document.createElement('div');
          resDiv.innerHTML = response;
          terminalOutput.appendChild(resDiv);
        }
      } else {
        const errDiv = document.createElement('div');
        errDiv.className = 'terminal-line term-yellow';
        errDiv.innerHTML = `command not found: "${escapeHtml(rawInput)}". Type <span class="term-green">'help'</span> for available commands.`;
        terminalOutput.appendChild(errDiv);
      }

      // Auto-scroll to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
})();
