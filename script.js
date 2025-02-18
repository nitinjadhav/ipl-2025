// Sample IPL 2025 Data
const iplData = {
  teams: ["Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bangalore", "Delhi Capitals"],
  matches: [
    { team1: "Mumbai Indians", team2: "Chennai Super Kings", date: "2025-03-25", time: "19:30", venue: "Wankhede Stadium" },
    { team1: "Royal Challengers Bangalore", team2: "Delhi Capitals", date: "2025-03-26", time: "15:00", venue: "M. Chinnaswamy Stadium" },
    // Add more matches...
  ]
};

// Populate Teams List
const teamList = document.getElementById("team-list");
iplData.teams.forEach(team => {
  const li = document.createElement("li");
  li.textContent = team;
  li.addEventListener("click", () => showTeamMatches(team));
  teamList.appendChild(li);
});

// Show Matches for Selected Team
function showTeamMatches(team) {
  const matchSchedule = document.getElementById("match-schedule");
  matchSchedule.innerHTML = "";
  const teamMatches = iplData.matches.filter(match => match.team1 === team || match.team2 === team);
  teamMatches.forEach(match => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${match.team1} vs ${match.team2}</strong><br>Date: ${match.date}, Time: ${match.time}<br>Venue: ${match.venue}`;
    matchSchedule.appendChild(div);
  });
}

// Chatbot Integration
document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  const chatMessages = document.getElementById("chat-messages");

  // Display user message
  chatMessages.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  document.getElementById("user-input").value = "";

  // Fetch response from OpenAI
  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });

  const data = await response.json();
  chatMessages.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
