const SHEET = "✋";
const ROCK = "✊";
const CHISEL = "✌";
const WELL = "👌";

// Etat général des données pour l'application
const state = {
  elements: [SHEET, ROCK, CHISEL, WELL],
  players: [
    { name: "Alan", count: 0 },
    { name: "Sophie", count: 0 },
  ],
  count: 0,
  max: 10,
};
const convertEmoji = (msg) => {
  switch (msg) {
    case "rock":
    case "pierre":
      console.log("pierre");
      msg = "✊";
      return msg;
    case "sheet":
    case "papier":
      msg = "✋";
      return msg;
    case "ciseau":
    case "chisel":
      msg = "✌";
      return msg;

    case "puit":
    case "well":
      msg = "👌";
      return msg;
  }
};
const choice = () => {
  const max = state.elements.length;

  return state.elements[Math.floor(Math.random() * max)];
};

const run = (value) => {
  let [player1, player2] = [value, choice()];
  if (!state.elements.includes(player1)) {
    return "saisie incorrect";
  }

  if (player1 == player2) {
    state.count++;
    return `coup nul on rejoue, p1 : ${player1}, p2 : ${player2}`;
  }

  // On compte les points
  if (player1 == WELL || player2 == WELL) {
    if (player1 == WELL) {
      state.players[0].count++;
      return `${state.players[0].name} a gagner avec ${player1}.`;
    }
    if (player2 == WELL) {
      state.players[1].count++;
      return `${state.players[1].name} a gagner avec ${player2}.`;
    }
  }
  if (player1 == ROCK) {
    if (player2 == CHISEL) {
      state.players[0].count++;
      return `${state.players[0].name} a gagner avec ${player1}.`;
    } else {
      state.players[1].count++;
      return `${state.players[1].name} a gagner avec ${player2}.`;
    }
  }

  if (player1 == SHEET) {
    if (player2 == ROCK) {
      state.players[0].count++;
      return `${state.players[0].name} a gagner avec ${player1}.`;
    } else {
      state.players[1].count++;
      return `${state.players[1].name} a gagner avec ${player2}.`;
    }
  }

  if (player1 == CHISEL) {
    if (player2 == SHEET) {
      state.players[0].count++;
      return `${state.players[0].name} a gagner avec ${player1}.`;
    } else {
      state.players[1].count++;
      return `${state.players[0].name} a gagner avec ${player2}.`;
    }
  }
};

// on utilise un raccourci pour les clés noms de state et run => {state: state, run: run } <=> {state, run }
exports.chifoumi = {
  state,
  run,
  convertEmoji,
};
