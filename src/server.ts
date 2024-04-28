import App from "./app";

process.env.TZ = 'America/Sao_Paulo'

const config = {
    ssl: false
}

const app = new App();
app.init(config);
console.log("initied")