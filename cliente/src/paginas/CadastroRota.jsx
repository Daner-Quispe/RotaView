import axios from "axios";
import { useEffect, useState } from "react";
import { CardRota } from "../componentes/CardRota";
import "../CadastroRota.css";

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
            <div className="form-rota">
                <h2>Cadastre uma rota</h2>

                <div className="campo-triplo">
                        <label> 
                            Tipo: <select value={tipo} onChange={(evento)=>setTipo(evento.target.value)}>
                            <option value="">Selecione...</option>
                            <option value="Ônibus">Ônibus</option>
                            <option value="Trem">Trem</option>
                            <option value="Metrô">Metrô</option>
                            </select>
                        </label>
                    
                        <label>Linha: <input value={linha} onChange={(evento)=>setLinha(evento.target.value)} /></label>

                        <label>Operadora: <input value={operadora} onChange={(evento)=>setOperadora(evento.target.value)}/></label>
                </div>

                <div className="campo-duplo">
                        <label>Partida: <input value={partida} onChange={(evento)=>setPartida(evento.target.value)} /></label>
                        <label>Destino: <input value={destino} onChange={(evento)=>setDestino(evento.target.value)} /></label>
                </div>

                <button onClick={cadastrarRota}>Cadastrar rota</button>
            </div>

            <h2>Todas as rotas</h2>
            {rotas.map(rota => (
                <CardRota
                    key={rota.id} 
                    rota={rota}/>
            ))}
        </div>
    );
}