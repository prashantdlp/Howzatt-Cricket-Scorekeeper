
if (window.location.pathname.includes("setup.html")) {
  // If the form exists, we can safely access its elements
  // and add event listeners to them.
  let form = document.getElementById("form");
  let team1Input = document.getElementById("team1");
  let team2Input = document.getElementById("team2");
  let teamsDropdown = document.getElementById("teams");
  let toss_result = document.getElementById("toss");

  function updateDropdown() {
    let team1 = team1Input.value.trim();
    let team2 = team2Input.value.trim();

    teamsDropdown.disabled = team1 === "" || team2 === "";

    teamsDropdown.innerHTML = "";

    let placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "--Select Team--";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    teamsDropdown.appendChild(placeholderOption);

    if (team1 !== "") {
      let option1 = document.createElement("option");
      option1.value = team1;
      option1.textContent = team1;
      teamsDropdown.appendChild(option1);
    }

    if (team2 !== "" && team2 !== team1) {
      let option2 = document.createElement("option");
      option2.value = team2;
      option2.textContent = team2;
      teamsDropdown.appendChild(option2);
    }
  }

  function startGame() {
    // Get the values from the form inputs
    let team1 = team1Input.value.trim();
    let team2 = team2Input.value.trim();
    let tossWinner = teamsDropdown.value;
    let tossResult = toss_result.value;

    if (team1 === "" || team2 === "") {
      window.alert("Please enter both team names.");
      form.reset();
      updateDropdown();
      return;
    }

    if (team1 === team2) {
      window.alert("Please enter different team names.");
      form.reset();
      updateDropdown();
      return;
    }

    if (tossWinner === "") {
      window.alert("Please select a toss winner.");
      return;
    }

    if (tossResult === "") {
      window.alert("Please select the toss result.");
      return;
    }

    let first_playing_team = null;
    let second_playing_team = null;

    if (tossWinner == team1) {
      if (tossResult == "bat") {
        first_playing_team = team1;
        second_playing_team = team2;
      } else {
        first_playing_team = team2;
        second_playing_team = team1;
      }
    } else if (tossWinner == team2) {
      if (tossResult == "bat") {
        first_playing_team = team2;
        second_playing_team = team1;
      } else {
        first_playing_team = team1;
        second_playing_team = team2;
      }
    }

    sessionStorage.setItem("first_playing_team", first_playing_team); // Get team 1 name from session storage
    sessionStorage.setItem("second_playing_team", second_playing_team);

    // Store the toss winner and result in session storage
    // You can also store other game-related data as needed;
    // Store other game-related data as needed
    // Redirect to the live.html page
    location.replace("../live\ page/live.html");
  }

  team1Input.addEventListener("input", updateDropdown);
  team2Input.addEventListener("input", updateDropdown);

  window.addEventListener("DOMContentLoaded", () => {
    if (
      document.getElementById("team1") &&
      document.getElementById("team2") &&
      document.getElementById("teams")
    ) {
      updateDropdown();
    }
  });
}

if (window.location.pathname.includes("live.html")) {

  // Save before unload
window.addEventListener('beforeunload', () => {
  const audio = document.getElementById('bg-audio');
  sessionStorage.setItem('audioTime', audio.currentTime);
});

// Restore on load
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const savedTime = sessionStorage.getItem('audioTime');
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }
});

  function goToTeam1() {
    document.getElementById("team2Window").style.display = "none";
    document.getElementById("team1Window").style.display = "block";
  }

  function goToTeam2() {
    // Hide Team 1 input window and show Team 2 input window
    document.getElementById("team1Window").style.display = "none";
    document.getElementById("team2Window").style.display = "block";
  }

  function addBatsman(name, batsmen) {
    let newBatsman = {
      name: name,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
    };
    batsmen.push(newBatsman);
  }

  function addBowler(name, bowlers) {
    let newBowler = {
      name: name,
      runs: 0,
      balls: 0,
      wickets: 0,
      economy: 0,
    };
    bowlers.push(newBowler);
  }

  function construct() {
    // Initialize variables
    let target = 0;
    let is_first_inning = true;
    let winner_team = null;
    let balls_thrown = 0;

    sessionStorage.setItem("balls_thrown", balls_thrown);
    sessionStorage.setItem("is_first_inning", is_first_inning);
    sessionStorage.setItem("winner_team", winner_team);
    sessionStorage.setItem("target", target);

    let score_first_inning = 0;
    let balls_first_inning = 0;
    let wickets_first_inning = 0;
    let overs_first_inning = 0;

    sessionStorage.setItem("score_first_inning", score_first_inning);
    sessionStorage.setItem("balls_first_inning", balls_first_inning);
    sessionStorage.setItem("wickets_first_inning", wickets_first_inning);
    sessionStorage.setItem("overs_first_inning", overs_first_inning);

    let score_second_inning = 0;
    let balls_second_inning = 0;
    let wickets_second_inning = 0;
    let overs_second_inning = 0;

    sessionStorage.setItem("score_second_inning", score_second_inning);
    sessionStorage.setItem("balls_second_inning", balls_second_inning);
    sessionStorage.setItem("wickets_second_inning", wickets_second_inning);
    sessionStorage.setItem("overs_second_inning", overs_second_inning);

    // both team can have exactly 5 players
    let firstbat = JSON.parse(sessionStorage.getItem("firstbat"));
    let firstball = JSON.parse(sessionStorage.getItem("firstball"));

    if (firstbat && firstball) {
      let batsmen_first_inning = [];
      let bowlers_first_inning = [];

      for (let i = 0; i < 5; i++) {
        addBatsman(firstbat[i], batsmen_first_inning);
      }

      addBowler(firstball[3], bowlers_first_inning);
      addBowler(firstball[4], bowlers_first_inning);

      sessionStorage.setItem(
        "batsmen_first_inning",
        JSON.stringify(batsmen_first_inning)
      );
      sessionStorage.setItem(
        "bowlers_first_inning",
        JSON.stringify(bowlers_first_inning)
      );

      let batsmen_second_inning = [];
      let bowlers_second_inning = [];

      for (let i = 0; i < 5; i++) {
        addBatsman(firstball[i], batsmen_second_inning);
      }

      addBowler(firstbat[3], bowlers_second_inning);
      addBowler(firstbat[4], bowlers_second_inning);

      sessionStorage.setItem(
        "batsmen_second_inning",
        JSON.stringify(batsmen_second_inning)
      );
      sessionStorage.setItem(
        "bowlers_second_inning",
        JSON.stringify(bowlers_second_inning)
      );

      // define strike, non_strike and bowler here these are just the index of the players in the array
      let strike = 0;
      let non_strike = 1;
      let bowler = 0;

      sessionStorage.setItem("strike", strike);
      sessionStorage.setItem("non_strike", non_strike);
      sessionStorage.setItem("bowler", bowler);

      // Call next functions
      updatelivescore();
      first_inning();
    } else {
      console.error("firstbat or firstball not found in sessionStorage.");
    }
  }

  function updateStrikeRate(batter) {
    if (batter && batter.balls !== undefined && batter.runs !== undefined) {
      if (batter.balls > 0) {
        batter.strikeRate = (batter.runs / batter.balls) * 100;
      } else {
        batter.strikeRate = 0;
      }
    } else {
      console.error("Invalid batter object.");
    }
  }

  function updateEconomy(bowler) {
    if (bowler && bowler.balls !== undefined && bowler.runs !== undefined) {
      if (bowler.balls > 0) {
        bowler.economy = (bowler.runs / bowler.balls) * 6;
      } else {
        bowler.economy = 0;
      }
    } else {
      console.error("Invalid bowler object.");
    }
  }

  function updatelivescore() {
    let score = document.getElementById("live-score");
    let first_playing_team = sessionStorage.getItem("first_playing_team");
    let second_playing_team = sessionStorage.getItem("second_playing_team");
    let is_first_inning = JSON.parse(sessionStorage.getItem("is_first_inning"));
    let score_first_inning = sessionStorage.getItem("score_first_inning");
    let wickets_first_inning = sessionStorage.getItem("wickets_first_inning");
    let overs_first_inning = sessionStorage.getItem("overs_first_inning");
    let score_second_inning = sessionStorage.getItem("score_second_inning");
    let wickets_second_inning = sessionStorage.getItem("wickets_second_inning");
    let overs_second_inning = sessionStorage.getItem("overs_second_inning");

    if (is_first_inning) {
      score.innerHTML = ` ${first_playing_team} ${score_first_inning}/${wickets_first_inning} (${overs_first_inning})
                        vs ${second_playing_team} `;
    } else {
      //target would be shown also and runs etc needed to win also if possible
      score.innerHTML = `${second_playing_team} ${score_second_inning}/${wickets_second_inning} (${overs_second_inning})
                        vs ${first_playing_team} ${score_first_inning}/${wickets_first_inning} (${overs_first_inning})`;
    }

    let batters_table = document.getElementById("batter-table");
    let bowlerRow = document.getElementById("bowler-table").rows[2]; // Bowler row
    let strikeRow = batters_table.rows[2]; // Strike batter row
    let nonStrikeRow = batters_table.rows[3]; // Non-strike batter row

    let strike = Number(sessionStorage.getItem("strike")); // Get striker from session storage
    let non_strike = Number(sessionStorage.getItem("non_strike")); // Get non-striker from session storage
    let bowler = Number(sessionStorage.getItem("bowler")); // Get bowler from session storage

    let batsmen_first_inning = JSON.parse(
      sessionStorage.getItem("batsmen_first_inning")
    ); // Get team 1 players from session storage
    let batsmen_second_inning = JSON.parse(
      sessionStorage.getItem("batsmen_second_inning")
    ); // Get team 2 players from session storage
    let bowlers_first_inning = JSON.parse(
      sessionStorage.getItem("bowlers_first_inning")
    ); // Get team 2 players from session storage
    let bowlers_second_inning = JSON.parse(
      sessionStorage.getItem("bowlers_second_inning")
    ); // Get team 1 players from session storage

    const updatePlayerStats = (player, row) => {
      row.cells[0].innerText = player.name;
      row.cells[1].innerText = player.runs;
      row.cells[2].innerText = player.balls;
      row.cells[3].innerText = player.fours;
      row.cells[4].innerText = player.sixes;
      row.cells[5].innerText = player.strikeRate.toFixed(2);
    };

    const updateBowlerStats = (bowler, row) => {
      row.cells[0].innerText = bowler.name;
      row.cells[1].innerText = bowler.balls;
      row.cells[2].innerText = bowler.runs;
      row.cells[3].innerText = bowler.wickets;
      row.cells[4].innerText = bowler.economy.toFixed(2);
    };

    if (is_first_inning) {
      updatePlayerStats(batsmen_first_inning[strike], strikeRow);
      updatePlayerStats(batsmen_first_inning[non_strike], nonStrikeRow);
      updateBowlerStats(bowlers_first_inning[bowler], bowlerRow);
    } else {
      updatePlayerStats(batsmen_second_inning[strike], strikeRow);
      updatePlayerStats(batsmen_second_inning[non_strike], nonStrikeRow);
      updateBowlerStats(bowlers_second_inning[bowler], bowlerRow);
    }
  }

  function startbutton() {
    // error handling for empty input
    let playerNamesValid = true;

    for (let i = 1; i <= 5; i++) {
      if (document.getElementById(`team1p${i}`).value === "") {
        window.alert(`Please enter player name in team 1, player ${i}`);
        playerNamesValid = false;
        return;
      }
      if (document.getElementById(`team2p${i}`).value === "") {
        window.alert(`Please enter player name in team 2, player ${i}`);
        playerNamesValid = false;
        return;
      }
    }

    if (!playerNamesValid) return;

    // If all inputs are valid, proceed to start the game
    const firstbat = [
      document.getElementById("team1p1").value,
      document.getElementById("team1p2").value,
      document.getElementById("team1p3").value,
      document.getElementById("team1p4").value,
      document.getElementById("team1p5").value,
    ];

    const firstball = [
      document.getElementById("team2p1").value,
      document.getElementById("team2p2").value,
      document.getElementById("team2p3").value,
      document.getElementById("team2p4").value,
      document.getElementById("team2p5").value,
    ];

    sessionStorage.setItem("firstbat", JSON.stringify(firstbat));
    sessionStorage.setItem("firstball", JSON.stringify(firstball));

    construct();
    document.getElementById("overlay").style.display = "none";
    updatelivescore();
  }

  window.onload = function () {
    // Check if teams exist in sessionStorage
    if (
      sessionStorage.getItem("firstbat") &&
      sessionStorage.getItem("firstball")
    ) {
      document.getElementById("overlay").style.display = "none"; // If yes, hide overlay and use stored values
      updatelivescore(); // Update the score as the data is already in sessionStorage
    } else {
      document.getElementById("overlay").style.display = "flex"; // not, show overlay to enter players
      let battingtag = document.getElementById("battingtag");
      let bowlingtag = document.getElementById("bowlingtag");
      let first_playing_team = sessionStorage.getItem("first_playing_team");
      let second_playing_team = sessionStorage.getItem("second_playing_team");

      battingtag.innerHTML = `${first_playing_team} players :`;
      bowlingtag.innerHTML = `${second_playing_team} players :`;
    }
  };

  function first_inning() {
    //first inning
    window.alert("First inning started");
  }

  function over_ended() {
    let balls_thrown = Number(sessionStorage.getItem("balls_thrown")); // Get balls thrown from session storage
    if (balls_thrown == 6) {
      let bowler = Number(sessionStorage.getItem("bowler")); //firstinnings_bowlers[0];
      bowler = (bowler + 1) % 2; // firstinnings_bowlers[1];
      sessionStorage.setItem("bowler", bowler); // Store team 2 players in session storage
      updatelivescore(); // Update the live score
    }
  }

  function inning_ended() {
    //check if inning ended
    let is_first_inning = JSON.parse(sessionStorage.getItem("is_first_inning")); // Get is_first_inning from session storage
    let balls_first_inning = Number(
      sessionStorage.getItem("balls_first_inning")
    ); // Get balls_first_inning from session storage
    let wickets_first_inning = Number(
      sessionStorage.getItem("wickets_first_inning")
    ); // Get wickets_first_inning from session storage
    let score_first_inning = Number(
      sessionStorage.getItem("score_first_inning")
    ); // Get score_first_inning from session storage
    let balls_second_inning = Number(
      sessionStorage.getItem("balls_second_inning")
    ); // Get balls_second_inning from session storage
    let wickets_second_inning = Number(
      sessionStorage.getItem("wickets_second_inning")
    ); // Get wickets_second_inning from session storage
    let score_second_inning = Number(
      sessionStorage.getItem("score_second_inning")
    ); // Get score_second_inning from session storage
    let target = Number(sessionStorage.getItem("target")); // Get target from session storage
    let first_playing_team = sessionStorage.getItem("first_playing_team"); // Get team 1 name from session storage
    let second_playing_team = sessionStorage.getItem("second_playing_team"); // Get team 2 name from session storage
    let winner_team = sessionStorage.getItem("winner_team"); // Get winner_team from session storage

    if (is_first_inning) {
      if (balls_first_inning == 12 || wickets_first_inning == 4) {
        target = score_first_inning + 1;
        sessionStorage.setItem("target", target); // Store target in session storage
        second_inning();
      }
    } else {
      if (
        balls_second_inning == 12 ||
        wickets_second_inning == 4 ||
        score_second_inning >= target
      ) {
        //match has ended

        //check if target is achieved
        if (score_second_inning >= target) {
          winner_team = second_playing_team;
        } else if (score_second_inning == score_first_inning) {
          winner_team = null;
        } else {
          winner_team = first_playing_team;
        }

        sessionStorage.setItem("winner_team", winner_team); // Store target in session storage
        location.replace("../summary\ page/summary.html"); // Redirect to summary page
      }
    }
  }

  function second_inning() {
    //second inning
    //starts the second inning
    let balls_thrown = sessionStorage.getItem("balls_thrown"); // Get balls thrown from session storage
    let is_first_inning = sessionStorage.getItem("is_first_inning"); // Get is_first_inning from session storage

    balls_thrown = 0; // reset balls thrown for second inning
    is_first_inning = false; // set is_first_inning to false

    sessionStorage.setItem("balls_thrown", balls_thrown); // Store balls thrown in session storage
    sessionStorage.setItem("is_first_inning", is_first_inning); // Store is_first_inning in session storage

    //secondinnings_batters = JSON.parse(sessionStorage.getItem("secondinnings_batters"));
    // Get team 2 players from session storage
    //secondinnings_bowlers = JSON.parse(sessionStorage.getItem("secondinnings_bowlers"));
    // Get team 1 players from session storage

    let strike = 0; // Example player object for team 1
    let non_strike = 1; // Example player object for team 1
    let bowler = 0; // Example player object for team 2

    sessionStorage.setItem("strike", strike); // Store team 1 players in session storage
    sessionStorage.setItem("non_strike", non_strike); // Store team 2 players in session storage
    sessionStorage.setItem("bowler", bowler); // Store team 2 players in session storage

    updatelivescore(); // Update the live score
  }

  function swapStrike() {
    // Get both batsmen from sessionStorage and parse them
    let strike = Number(sessionStorage.getItem("strike"));
    let non_strike = Number(sessionStorage.getItem("non_strike"));

    // Classic integer-style swap using a temp variable
    let temp = strike;
    strike = non_strike;
    non_strike = temp;

    // Save back to sessionStorage
    sessionStorage.setItem("strike", strike);
    sessionStorage.setItem("non_strike", non_strike);

    //updatelivescore(); // Update the live score
  }

  function oddruns() {
    let balls_thrown = Number(sessionStorage.getItem("balls_thrown")); // Get balls thrown from session storage
    if (balls_thrown % 6 == 0) return; //over ended
    swapStrike(); // Swap the striker and non-striker
  }

  function evenruns() {
    let balls_thrown = Number(sessionStorage.getItem("balls_thrown")); // Get balls thrown from session storage
    if (balls_thrown % 6 == 0) swapStrike(); // Swap the striker and non-striker
    else return; //over not ended
  }

  function wicket() {
    let is_first_inning = JSON.parse(sessionStorage.getItem("is_first_inning"));
    let wickets_first_inning = Number(sessionStorage.getItem("wickets_first_inning"));
    let wickets_second_inning = Number(sessionStorage.getItem("wickets_second_inning"));
    
    if (is_first_inning) {
      wickets_first_inning++;
      sessionStorage.setItem("wickets_first_inning", wickets_first_inning);
    } else {
      wickets_second_inning++;
      sessionStorage.setItem("wickets_second_inning", wickets_second_inning);
    }
    
    // Check for all out
    if (wickets_first_inning === 4 || wickets_second_inning === 4) {
      window.alert("All out");
      return;
    }
    
    // Update striker
    let strike = Number(sessionStorage.getItem("strike"));
    strike = is_first_inning ? wickets_first_inning + 1 : wickets_second_inning + 1;
    sessionStorage.setItem("strike", strike);
  }

  function updateScore(event) {
    let balls_thrown = Number(sessionStorage.getItem("balls_thrown")); // Get balls thrown from session storage
    let is_first_inning = JSON.parse(sessionStorage.getItem("is_first_inning")); // Get is_first_inning from session storage
    let balls_first_inning = Number(
      sessionStorage.getItem("balls_first_inning")
    ); // Get balls_first_inning from session storage
    let balls_second_inning = Number(
      sessionStorage.getItem("balls_second_inning")
    ); // Get balls_second_inning from session storage
    let overs_first_inning = parseFloat(
      sessionStorage.getItem("overs_first_inning")
    ); // Get overs_first_inning from session storage
    let overs_second_inning = parseFloat(
      sessionStorage.getItem("overs_second_inning")
    ); // Get overs_second_inning from session storage
    let score_first_inning = Number(
      sessionStorage.getItem("score_first_inning")
    ); // Get score_first_inning from session storage
    let score_second_inning = Number(
      sessionStorage.getItem("score_second_inning")
    ); // Get score_second_inning from session storage

    let batsmen_first_inning = JSON.parse(
      sessionStorage.getItem("batsmen_first_inning")
    ); // Get team 1 players from session storage
    let bowlers_first_inning = JSON.parse(
      sessionStorage.getItem("bowlers_first_inning")
    ); // Get team 2 players from session storage
    let batsmen_second_inning = JSON.parse(
      sessionStorage.getItem("batsmen_second_inning")
    ); // Get team 2 players from session storage
    let bowlers_second_inning = JSON.parse(
      sessionStorage.getItem("bowlers_second_inning")
    ); // Get team 1 players from session storage

    let strike = Number(sessionStorage.getItem("strike")); // Get striker from session storage
    let bowler = Number(sessionStorage.getItem("bowler")); // Get bowler from session storage

    // Get the value of the clicked button
    let act = event.target.value;
    act = parseInt(act); // Ensure it's a number

    balls_thrown++; // Increment balls thrown
    sessionStorage.setItem("balls_thrown", balls_thrown); // Store balls thrown in session storage

    if (is_first_inning) {
      balls_first_inning++; // Increment balls for first inning
      if (balls_first_inning < 6) overs_first_inning = balls_first_inning / 10;
      else if (balls_first_inning < 12)
        overs_first_inning = 1.0 + (balls_first_inning - 6) / 10;
      else if (balls_first_inning == 12) overs_first_inning = 2.0;
    } else {
      balls_second_inning++; // Increment balls for second inning
      if (balls_second_inning < 6)
        overs_second_inning = balls_second_inning / 10;
      else if (balls_second_inning < 12)
        overs_second_inning = 1.0 + (balls_second_inning - 6) / 10;
      else if (balls_second_inning == 12) overs_second_inning = 2.0;
    }

    sessionStorage.setItem("balls_first_inning", balls_first_inning); // Store balls_first_inning in session storage
    sessionStorage.setItem("balls_second_inning", balls_second_inning); // Store balls_second_inning in session storage
    sessionStorage.setItem("overs_first_inning", overs_first_inning); // Store overs_first_inning in session storage
    sessionStorage.setItem("overs_second_inning", overs_second_inning); // Store overs_second_inning in session storage

    if (is_first_inning) {
      bowlers_first_inning[bowler].balls += 1; // Update balls bowled for the bowler
      batsmen_first_inning[strike].balls += 1; // Update balls faced for the striker

      if (act == 5) {
        // 5 stands for wicket
        bowlers_first_inning[bowler].wickets += 1; // Update wickets taken by the bowler
        updateEconomy(bowlers_first_inning[bowler]); // Update economy for the bowler
        updateStrikeRate(batsmen_first_inning[strike]); // Update strike rate for the striker
        wicket();
      } else if (act % 2 == 0) {
        // Even runs scored
        score_first_inning += act; // Update score for first inning
        batsmen_first_inning[strike].runs += act; // Update runs for the striker
        bowlers_first_inning[bowler].runs += act; // Update runs given by the bowler
        if (act == 4) batsmen_first_inning[strike].fours += 1; // Update fours for the striker
        if (act == 6) batsmen_first_inning[strike].sixes += 1; // Update sixes for the striker
        updateEconomy(bowlers_first_inning[bowler]); // Update economy for the bowler
        updateStrikeRate(batsmen_first_inning[strike]); // Update strike rate for the striker
        evenruns();
      } else {
        score_first_inning += act; // Update score for first inning
        batsmen_first_inning[strike].runs += act; // Update runs for the striker
        bowlers_first_inning[bowler].runs += act; // Update runs given by the bowler
        updateEconomy(bowlers_first_inning[bowler]); // Update economy for the bowler
        updateStrikeRate(batsmen_first_inning[strike]); // Update strike rate for the striker
        oddruns();
      }
    } else {
      bowlers_second_inning[bowler].balls += 1; // Update balls bowled for the bowler
      batsmen_second_inning[strike].balls += 1; // Update balls faced for the striker

      if (act == 5) {
        // 5 stands for wicket
        bowlers_second_inning[bowler].wickets += 1; // Update wickets taken by the bowler
        updateEconomy(bowlers_second_inning[bowler]); // Update economy for the bowler
        updateStrikeRate(batsmen_second_inning[strike]); // Update strike rate for the striker
        wicket();
      } else if (act % 2 == 0) {
        // Even runs scored
        score_second_inning += act; // Update score for first inning
        batsmen_second_inning[strike].runs += act; // Update runs for the striker
        bowlers_second_inning[bowler].runs += act; // Update runs given by the bowler
        if (act == 4) batsmen_second_inning[strike].fours += 1; // Update fours for the striker
        if (act == 6) batsmen_second_inning[strike].sixes += 1; // Update sixes for the striker
        updateEconomy(bowlers_second_inning[bowler]); // Update economy for the bowler
        updateStrikeRate(batsmen_second_inning[strike]); // Update strike rate for the striker
        evenruns();
      } else {
        score_second_inning += act; // Update score for first inning
        batsmen_second_inning[strike].runs += act; // Update runs for the striker
        bowlers_second_inning[bowler].runs += act; // Update runs given by the bowler
        updateEconomy(bowlers_second_inning[bowler]); // Update economy for the bowler
        updateStrikeRate(batsmen_second_inning[strike]); // Update strike rate for the striker
        oddruns();
      }
    }

    //sessionStorage.setItem("wickets_first_inning", wickets_first_inning); // Store wickets_first_inning in session storage
    //sessionStorage.setItem("wickets_second_inning", wickets_second_inning); // Store wickets_second_inning in session storage
    sessionStorage.setItem("score_first_inning", score_first_inning); // Store score_first_inning in session storage
    sessionStorage.setItem("score_second_inning", score_second_inning); // Store score_second_inning in session storage

    sessionStorage.setItem(
      "batsmen_first_inning",
      JSON.stringify(batsmen_first_inning)
    ); // Store team 1 players in session storage
    sessionStorage.setItem(
      "bowlers_first_inning",
      JSON.stringify(bowlers_first_inning)
    ); // Store team 2 players in session storage
    sessionStorage.setItem(
      "batsmen_second_inning",
      JSON.stringify(batsmen_second_inning)
    ); // Store team 2 players in session storage
    sessionStorage.setItem(
      "bowlers_second_inning",
      JSON.stringify(bowlers_second_inning)
    ); // Store team 1 players in session storage

    //console.log(JSON.parse(sessionStorage.getItem("batsmen_first_inning")));

    updatelivescore(); // Update the live score
    over_ended(); // Check if the over has ended
    inning_ended(); // Check if the inning has ended
  }

  let eventButtons = document.getElementsByClassName("event");

  for (let button of eventButtons) {
    button.addEventListener("click", updateScore); // Add click listener
  } // may cause performance issues if many buttons are there

  function see_scorecard() {
    // Redirect to scorecard.html page
    location.replace("../scorecard\ page/scorecard.html");
  }
}

if (window.location.pathname.includes("scorecard.html")) {

  window.addEventListener('beforeunload', () => {
    const audio = document.getElementById('bg-audio');
    sessionStorage.setItem('audioTime', audio.currentTime);
  });
  
  // Restore on load
  window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');
    const savedTime = sessionStorage.getItem('audioTime');
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }
  });

  let is_first_inning = JSON.parse(sessionStorage.getItem("is_first_inning")); // Get is_first_inning from session storage
  let first_playing_team = sessionStorage.getItem("first_playing_team"); // Get team 1 name from session storage
  let second_playing_team = sessionStorage.getItem("second_playing_team"); // Get team 2 name from session storage
  let score_first_inning = Number(sessionStorage.getItem("score_first_inning")); // Get score_first_inning from session storage
  let wickets_first_inning = Number(
    sessionStorage.getItem("wickets_first_inning")
  ); // Get wickets_first_inning from session storage
  let overs_first_inning = Number(sessionStorage.getItem("overs_first_inning")); // Get overs_first_inning from session storage
  let score_second_inning = Number(
    sessionStorage.getItem("score_second_inning")
  ); // Get score_second_inning from session storage
  let wickets_second_inning = Number(
    sessionStorage.getItem("wickets_second_inning")
  ); // Get wickets_second_inning from session storage
  let overs_second_inning = Number(
    sessionStorage.getItem("overs_second_inning")
  ); // Get overs_second_inning from session storage

  function showInning(inning) {
    // Hide all inning sections
    document.querySelectorAll(".inning-section").forEach(function (section) {
      section.classList.remove("active");
    });

    // Remove active class from all nav links
    document.querySelectorAll("nav a").forEach(function (link) {
      link.classList.remove("active");
    });

    // Show the selected inning
    document.getElementById(inning).classList.add("active");

    // Add active class to the clicked nav link
    if (inning === "first") {
      document.getElementById("firstInningTab").classList.add("active");
    } else {
      document.getElementById("secondInningTab").classList.add("active");
    }
  }

  function showUpdatedScorecard() {
    // Get data from sessionStorage
    let batsmen_first_inning = JSON.parse(
      sessionStorage.getItem("batsmen_first_inning")
    );
    let batsmen_second_inning = JSON.parse(
      sessionStorage.getItem("batsmen_second_inning")
    );
    let bowlers_first_inning = JSON.parse(
      sessionStorage.getItem("bowlers_first_inning")
    );
    let bowlers_second_inning = JSON.parse(
      sessionStorage.getItem("bowlers_second_inning")
    );

    // Get the tables for batters and bowlers
    let batters_table_first = document.getElementById("first-inning-batters");
    let batters_table_second = document.getElementById("second-inning-batters");

    let bowlers_table_first = document.getElementById("first-inning-bowlers");
    let bowlers_table_second = document.getElementById("second-inning-bowlers");

    // Function to update player stats (batting)
    const updatePlayerStats = (player, row) => {
      row.cells[0].innerText = player.name;
      row.cells[1].innerText = player.runs;
      row.cells[2].innerText = player.balls;
      row.cells[3].innerText = player.fours;
      row.cells[4].innerText = player.sixes;
      row.cells[5].innerText = player.strikeRate.toFixed(2);
    };

    // Function to update bowler stats
    const updateBowlerStats = (bowler, row) => {
      row.cells[0].innerText = bowler.name;
      row.cells[1].innerText = bowler.balls;
      row.cells[2].innerText = bowler.runs;
      row.cells[3].innerText = bowler.wickets;
      row.cells[4].innerText = bowler.economy.toFixed(2);
    };

    
      // Update first inning batters
      for (let i = 0; i < 5; i++) {
        updatePlayerStats(
          batsmen_first_inning[i],
          batters_table_first.rows[i + 2]
        ); // for now doubt is i+1 or i+2
      }

      // Update first inning bowlers
      for (let i = 0; i < 2; i++) {
        updateBowlerStats(
          bowlers_first_inning[i],
          bowlers_table_first.rows[i + 2]
        ); // Skip header row
      }
    
      // Update second inning batters
      for (let i = 0; i < 5; i++) {
        updatePlayerStats(
          batsmen_second_inning[i],
          batters_table_second.rows[i + 2]
        ); // Skip header row
      }

      // Update second inning bowlers
      for (let i = 0; i < 2; i++) {
        updateBowlerStats(
          bowlers_second_inning[i],
          bowlers_table_second.rows[i + 2]
        ); // Skip header row
     
    }
  }

  window.onload = function () {
    //update the scorecard with the data from session storage

    showUpdatedScorecard(); // Show the scorecard for the first inning by default
    showInning("first"); // Show the first inning by default
    // Show the second inning by default
  };

  function go_toLive() {
    // Redirect to live.html page
    location.replace("../live\ page/live.html");
    updatelivescore(); // Update the live score
  }
}

if (window.location.pathname.includes("summary.html")) {
  let first_playing_team = sessionStorage.getItem("first_playing_team"); // Get team 1 name from session storage
  let second_playing_team = sessionStorage.getItem("second_playing_team"); // Get team 2 name from session storage
  let winner_team = sessionStorage.getItem("winner_team"); // Get winner team from session storage
  let score_second_inning = Number(
    sessionStorage.getItem("score_second_inning")
  ); // Get score_second_inning from session storage
  let balls_second_inning = Number(
    sessionStorage.getItem("balls_second_inning")
  ); // Get balls_second_inning from session storage
  let wickets_second_inning = Number(
    sessionStorage.getItem("wickets_second_inning")
  ); // Get wickets_second_inning from session storage
  let score_first_inning = Number(sessionStorage.getItem("score_first_inning")); // Get score_first_inning from session storage

  let runs_remaining = score_first_inning - score_second_inning; // Calculate runs remaining for the second inning
  let balls_remaining = 12 - balls_second_inning; // Calculate balls remaining for the second inning
  let wickets_remaining = 4 - wickets_second_inning; // Calculate wickets remaining for the second inning

  let firstbat = JSON.parse(sessionStorage.getItem("firstbat")); // Get first batting team from session storage
  let firstball = JSON.parse(sessionStorage.getItem("firstball")); // Get first bowling team from session storage

  //tie condition not checked till now

  if (winner_team == first_playing_team) {
    let winner_captain_name = firstbat[2]; // Get first captain name from session storage
    let loser_captain_name = firstball[2]; // Get second captain name from session storage
    document.getElementById(
      "result"
    ).innerHTML = `${first_playing_team} wins by ${runs_remaining} runs !`; // Display the winner team
    document.getElementById("conversation").textContent += `
            media: So ${winner_captain_name} how does it feel to win the match? 
            ${winner_captain_name}: It feels great to win the match. We played well as a team and executed our plans effectively. 
            media: What do you think was the turning point of the match? 
            ${winner_captain_name}: I think our bowlers did a fantastic job in the middle overs, which helped us restrict the opposition to a low score. 
            media: ${loser_captain_name}, what do you think went wrong for your team? 
            ${loser_captain_name}: We lost too many wickets early on, and it put us under pressure. We couldn't recover from that. 
            media: ${winner_captain_name}, any special mention for your players? 
            ${winner_captain_name}: Yes, our bowlers were exceptional today. They took crucial wickets at the right time. 
            media: ${loser_captain_name}, any thoughts on your team's performance? 
            ${loser_captain_name}: We need to work on our batting and fielding. We missed a few chances that could have changed the game. 
            media: ${winner_captain_name}, any plans for the next match? 
            ${winner_captain_name}: We will take it one game at a time. We need to focus on our strengths and improve on our weaknesses. 
            media: ${loser_captain_name}, any changes you plan to make for the next match? 
            ${loser_captain_name}: We will analyze our performance and make the necessary changes. We have a strong squad, and we will bounce back. 
            media: ${winner_captain_name}, any message for your fans? 
            ${winner_captain_name}: Thank you for your support. We appreciate it, and we will continue to give our best on the field. 
            media: ${loser_captain_name}, any message for your fans? 
            ${loser_captain_name}: Thank you for your support. We will work hard to come back stronger in the next match. 
            media: Thank you both for your time. It was a great match to watch. 
            ${winner_captain_name}: Thank you. 
            ${loser_captain_name}: Thank you. 
            media: That's all for now. Stay tuned for more updates on the match. 
            `;
  } else if (winner_team == second_playing_team) {
    let winner_captain_name = firstball[2]; // Get first captain name from session storage
    let loser_captain_name = firstbat[2]; // Get second captain name from session storage
    document.getElementById(
      "result"
    ).innerHTML = `${second_playing_team} wins by ${wickets_remaining} wickets ( ${balls_remaining} balls left )!`; // Display the winner team
    document.getElementById("conversation").textContent += `
            media: So ${winner_captain_name} how does it feel to win the match?
            ${winner_captain_name}: It feels great to win the match. We played well as a team and executed our plans effectively. 
            media: What do you think was the turning point of the match? 
            ${winner_captain_name}: I think our bowlers did a fantastic job in the middle overs, which helped us restrict the opposition to a low score. 
            media: ${loser_captain_name}, what do you think went wrong for your team? 
            ${loser_captain_name}: We lost too many wickets early on, and it put us under pressure. We couldn't recover from that. 
            media: ${winner_captain_name}, any special mention for your players? 
            ${winner_captain_name}: Yes, our bowlers were exceptional today. They took crucial wickets at the right time. 
            media: ${loser_captain_name}, any thoughts on your team's performance? 
            ${loser_captain_name}: We need to work on our batting and fielding. We missed a few chances that could have changed the game. 
            media: ${winner_captain_name}, any plans for the next match? 
            ${winner_captain_name}: We will take it one game at a time. We need to focus on our strengths and improve on our weaknesses. 
            media: ${loser_captain_name}, any changes you plan to make for the next match? 
            ${loser_captain_name}: We will analyze our performance and make the necessary changes. We have a strong squad, and we will bounce back. 
            media: ${winner_captain_name}, any message for your fans? 
            ${winner_captain_name}: Thank you for your support. We appreciate it, and we will continue to give our best on the field. 
            media: ${loser_captain_name}, any message for your fans? 
            ${loser_captain_name}: Thank you for your support. We will work hard to come back stronger in the next match. 
            media: Thank you both for your time. It was a great match to watch. 
            ${winner_captain_name}: Thank you. 
            ${loser_captain_name}: Thank you. 
            media: That's all for now. Stay tuned for more updates on the match. 
            `;
  } else {
    document.getElementById("result").innerHTML = `Match Tie !`; // Display the winner team
    document.getElementById("conversation").textContent += `
            media : So it was a draw .how do you feel about no extra overs rule.
            ${firstbat[2]}: I think if extra over rule hadn't been dropped we will have crushed them.
            ${firstball[2]}: Look who is talking , you survived this match only because umpire was purchased by you.
            media: So what do you think about the match 
            ${firstbat[2]}: I think we were the better team and we deserved to win the match.
            ${firstball[2]}: I think umpire should be named as man of the match. How the hell i was caught out .
            I had no touch with the ball. If i wasn't given out I would have humbled these dogs.
            {Fight btween both captains broke out} 
            media: So this was it . bye ! 
  `;
  }

  function reset() {
    sessionStorage.clear(); // Clear session storage
    window.location.href = "../setup\ page/setup.html"; // Redirect to setup page
  }
}
