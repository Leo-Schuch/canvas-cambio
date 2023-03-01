import selecionaCotacao from "./imprimeCotacao.js";

const graphicDollar = document.getElementById("graphicDollar");

const graphicToDollar = new Chart(graphicDollar, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dólar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

function gerarHorario() {
  let data = new Date();
  let horario =
    data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  return horario;
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  });
  grafico.update();
}

let workerDolar = new Worker("./script/workers/workerDolar.js");
workerDolar.postMessage("usd");

workerDolar.addEventListener("message", (event) => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar", valor);
  adicionarDados(graphicToDollar, tempo, valor);
});

const graficoEuro = document.getElementById("graphicEuro");
const graficoParaEuro = new Chart(graficoEuro, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Euro",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

let workerIene = new Worker("./script/workers/workerEuro.js");
workerIene.postMessage("Euro");
workerIene.addEventListener("message", (event) => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  adicionarDados(graficoParaEuro, tempo, valor);
  selecionaCotacao("euro", valor);
});
