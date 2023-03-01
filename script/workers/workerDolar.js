async function conectaApi(){
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.USDBRL)
}

addEventListener("message", () => {
    conectaApi();
    setInterval(() => conectaApi(), 5000);
})