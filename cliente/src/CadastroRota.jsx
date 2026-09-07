import axios from "axios";
import { useEffect, useState } from "react";

export function CadastroRota() {
    const [tipo, setTipo] = useState("");
    const [linha, setLinha] = useState("");
    const [operadora, setOperadora] = useState("");
    const [partida, setPartida] = useState("");
    const [destino, setDestino] = useState("");

    const [rotas, setRotas] = useState([])

    function listarRota() {
        axios.get("http://localhost:8080/rotas")
            .then(resposta => { 
                setRotas(resposta.data);
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    useEffect(() => {
        listarRota()
    }, [])

    function cadastrarRota() {
        const rota = {
            tipo: tipo,
            linha: linha,
            operadora: operadora,
            partida: partida,
            destino: destino
        };

        axios.post("http://localhost:8080/rotas", rota)
            .then(resposta => {
                console.log(resposta.data);
                listarRota();

                setTipo("");
                setLinha("");
                setOperadora("");
                setPartida("");
                setDestino("");
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    return (
        <div>
            <h2>Cadastre uma rota</h2>

            <p>
                Tipo: <select value={tipo} onChange={(evento)=>setTipo(evento.target.value)}>
                <option value="">Selecione...</option>
                <option value="Ônibus">Ônibus</option>
                <option value="Trem">Trem</option>
                <option value="Metrô">Metrô</option>
                </select>
            
                Linha: <input value={linha} onChange={(evento)=>setLinha(evento.target.value)} />

                Operadora: <input value={operadora} onChange={(evento)=>setOperadora(evento.target.value)}/>
            </p>

            <p>
                Partida: <input value={partida} onChange={(evento)=>setPartida(evento.target.value)} />
                Destino: <input value={destino} onChange={(evento)=>setDestino(evento.target.value)} />
            </p>

            <button onClick={cadastrarRota}>Cadastrar rota</button>

            <div>
                <h2>Todas as rotas</h2>
                {rotas.map(rota => (
                    <div key={rota.id}>
                        <p>Tipo: {rota.tipo}</p>
                        <p>Linha: {rota.linha}</p>
                        <p>Operadora: {rota.operadora}</p>
                        <p>Partida: {rota.partida}</p>
                        <p>Destino: {rota.destino}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}