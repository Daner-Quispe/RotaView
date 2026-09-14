import axios from "axios";
import { useEffect, useState } from "react";
import { CardRota } from "../componentes/CardRota";
import "../CadastroRota.css";
import { Cabecalho } from "../componentes/Cabecalho";
import { Inicio } from "../componentes/Inicio";

export function CadastroRota() {
    const [tipo, setTipo] = useState("");
    const [linha, setLinha] = useState("");
    const [operadora, setOperadora] = useState("");
    const [partida, setPartida] = useState("");
    const [destino, setDestino] = useState("");
    const [validarErro, setValidarErro] = useState(false);
    const [rotas, setRotas] = useState([]);

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
        setValidarErro(false);
        const rota = {
            tipo: tipo,
            linha: linha,
            operadora: operadora,
            partida: partida,
            destino: destino
        };
        if (rota.tipo === "" || 
            rota.linha.trim() === "" || 
            rota.operadora.trim() === "" ||
            rota.partida.trim() === "" ||
            rota.destino.trim() === ""
        ) {    
            setValidarErro(true);
            return;
        }
            

        axios.post("http://localhost:8080/rotas", rota)
            .then(resposta => {
                console.log(resposta.data);
                listarRota();

                setTipo("");
                setLinha("");
                setOperadora("");
                setPartida("");
                setDestino("");

                alert("Rota cadastrada com sucesso!")
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    return (
        <div>
            <Cabecalho/>
            <Inicio />
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

                {validarErro && (
                    <p className="msg-erro">Preencha todos os campos</p>
                )}

                <button onClick={cadastrarRota}>Cadastrar rota</button>
            </div>

            <h2>Todas as rotas</h2>
            {rotas.map(rota => (
                <CardRota
                    key={rota.id} 
                    rota={rota}/>
            ))}

            <div className="creditos">
                <h3><b>Créditos de imagens utilizadas</b></h3>
                <i>Rotas-icon:</i> <a href="https://www.flaticon.com/br/icones-gratis/pista" title="pista ícones">Pista ícones criados por Magnific - Flaticon</a> <br />
                <i>Colaborar-icon:</i> <a href="https://www.flaticon.com/br/icones-gratis/pessoas-de-negocio" title="pessoas de negócio ícones">Pessoas de negócio ícones criados por kornkun - Flaticon</a><br />
                <i>CadastrarRota-icon:</i> Gerado com IA <br />
                
                <i>Icone ônibus:</i> <a href='https://pt.pngtree.com/freepng/bus-icon_4341985.html'>imagem PNG de pt.pngtree.com/</a><br />                    
                <i>Icone metro:</i> metro by Thengakola from <a href="https://thenounproject.com/browse/icons/term/metro/" target="_blank" title="metro Icons">Noun Project</a> (CC BY 3.0) <br />
                <i>Icone Trem:</i> <a href="https://www.flaticon.com/br/icones-gratis/trem" title="trem ícones">Trem ícones criados por Google - Flaticon</a>
            </div>
        </div>
    );
}