# RotaView
## Registro de Viagens - Transporte Urbano
> Este projeto consiste em um sistema colaborativo de cadastros, construção e visualização de rotas utilizando diferentes tipos de transporte urbano.

A plataforma permite cadastrar uma rota informando o tipo de transporte, a linha utilizada,  operadora e ponto de partida e destino. Após o cadastro a rota pode ser complementada com *pontos de parada*, permitindo que os usuários contribuam para tornar as rotas mais completas.

---

## 🛠️ Tecnologias usadas
### Backend
- Java
- Spring Boot
- MySQL

---

### Frontend
- React
- JavaScript
- HTML
- CSS

---

## ✨ Funcionalidades 
- Cadastrar uma nova rota;
- Consultar rotas cadastradas;
- Visualizar pontos de parada de uma rota;
- Adicionar pontos de parada em uma rota existente;
- Visualizar trajeto completo de uma rota.

---

## 🚀 Como executar a aplicação
### Backend
No terminal entre no diretório api/ :
> cd api/

Execute o comando de execução
> mvnw spring-boot:run

Assim inicia um servidor local do backend. Os endpoints podem ser acessados através da URL:
`http://localhost:8080/rotas`

---

### Frontend
Em outro terminal, entre no diretório cliente/ :
> cd cliente/

Instale as dependências e execute a aplicação:
> npm install

> npm run dev

Após a execução dos comandos acima, a aplicação estará disponível em: 
`http://localhost:5173`

---

## ⚙️ Contrato com API
```
GET / rotas - Lista todas as rotas
GET / rotas/{id}/paradas - Lista os pontos de parada de uma rota

POST / rotas - Cadastra uma nova rota
POST / rotas/{id}/paradas - Cadastra um novo ponto de parada em uma rota
```