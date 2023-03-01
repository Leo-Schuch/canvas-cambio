addEventListener("message", event =>{
    conectaApi()
    setInterval(() => conectaApi(), 5000)
})

async function conectaApi(){
    const conecta = await fetch("https://economia.awesomeapi.com.br/last/EUR-BRL")
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.EURBRL)
}