const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};

const player4 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

const player5 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};

const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const RollDice = async () => {
  return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
  let random = Math.random();
  let result = "";

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(caracterName, block, diceResult, attribute) {
  console.log(
    `${caracterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Pista: ${block}`);

    // rolar dados
    let diceResult1 = await RollDice();
    let diceResult2 = await RollDice();

    // teste de habilidades
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + player1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + player2.VELOCIDADE;

      await logRollResult(
        player1.NOME,
        "velocidade",
        diceResult1,
        player1.VELOCIDADE
      );

      await logRollResult(
        player2.NOME,
        "velocidade",
        diceResult2,
        player2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + player1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + player2.MANOBRABILIDADE;

      await logRollResult(
        player1.NOME,
        "manobrabilidade",
        diceResult1,
        player1.MANOBRABILIDADE
      );

      await logRollResult(
        player2.NOME,
        "manobrabilidade",
        diceResult2,
        player2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + player1.PODER;
      let powerResult2 = diceResult2 + player2.PODER;

      console.log(`${player1.NOME} confrontou o ${player2.NOME}! 🥊`);

      await logRollResult(player1.NOME, "poder", diceResult1, player1.PODER);

      await logRollResult(player2.NOME, "poder", diceResult2, player2.PODER);

      if (powerResult1 > powerResult2) {
        if (player2.PONTOS > 0) {
          player2.PONTOS--;
        }
        console.log(
          `🥊 ${player1.NOME} ganhou o confronto! ${player2.NOME} e perdeu 1 ponto. 🐢`
        );
      } else if (powerResult2 > powerResult1) {
        if (player1.PONTOS > 0) {
          player1.PONTOS--;
        }
        console.log(
          `🥊 ${player2.NOME} ganhou o confronto! ${player1.NOME} e perdeu 1 ponto. 🐢`
        );
      } else {
        console.log("O confronto empatou e ninguem perde pontos!🥊");
      }
    }

    //Quem ganhou
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`⭐ ${player1.NOME} marcou um ponto. ⭐`);
      player1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`⭐ ${player2.NOME} marcou um ponto. ⭐`);
      player2.PONTOS++;
    }

    console.log(
      "|------------------------------⭐⭐⭐⭐⭐⭐⭐------------------------------------|"
    );
  }
}

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ... \n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();

async function declareWinner(player1, player2) {
  console.log("Resultado final:");
  console.log(`${player1.NOME}: ${player1.PONTOS} ponto(s)`);
  console.log(`${player2.NOME}: ${player2.PONTOS} ponto(s)`);

  if (player1.PONTOS > player2.PONTOS)
    console.log(`\n${player1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (player2.PONTOS > player1.PONTOS)
    console.log(`\n${player2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}
