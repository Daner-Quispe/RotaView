import axios from "axios";
import { useEffect, useState } from "react";
import { ModalParada } from "./ModalParada";

export function LinhaRota( {rota} ) {
    const [paradas, setParadas] = useState([]);
    const [modal, setModal] = useState(false);
    const [ordem, setOrdem] = useState(0);

    function listarParadas() {
        axios.get(`http://localhost:8080/rotas/${rota.id}/paradas`)
            .then(respota => {
                setParadas(respota.data);
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    useEffect(() => {
        listarParadas();
    }, [rota.id]);

    function abirModal(ordemNova) {
        setOrdem(ordemNova);
        setModal(true);
    }

    const pontos = [
        {
            nome: rota.partida,
            tipo: "partida"
        },

        ...paradas.map(parada => ({
            nome: parada.nomeParada,
            tipo: "parada"
        })),

        {
            nome: rota.destino,
            tipo: "destino"
        }
    ];

    return(
        <div className="linha-rota">
            {pontos.map((ponto, index) => {
                <div className="trecho" key={index}>
                    <div className="ponto">
                        <span className="bolinha"></span>
                        <span className="nome-ponto">{ponto.nome}</span>
                    </div>

                    {index < pontos.length-1 && (
                        <div className="linha-container">
                            <div className="linha"></div>
                            <button className="botao-add" onClick={() => abirModal(index + 1)}>
                                +
                            </button>
                        </div>
                    )}
                </div>
            })}

            {abirModal && (
                <ModalParada
                    rotaId={rota.id}
                    ordem={ordem}
                    fechar={() => setModal(false)}
                    atualizar={listarParadas}
                />
            )}
        </div>
    );
}