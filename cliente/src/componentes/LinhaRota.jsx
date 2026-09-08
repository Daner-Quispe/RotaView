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

    function abirModal() {
        setOrdem(paradas.length + 1);
        setModal(true);
    }

    return(
        <div className="linha-rota">
            <div className="ponto">
                <span className="bolinha"></span>
                <span className="nome-ponto">{rota.partida}</span>
            </div>

            {paradas.map((parada) => (
                <div className="trecho" key={parada.id}>
                    <div className="linha"></div>

                    <div className="ponto">
                        <span className="bolinha"></span>
                        <span className="nome-ponto">{parada.nomeParada}</span>
                    </div>
                </div>
            ))}

            <div className="trecho">
                <div className="linha"></div>
                <button className="botao-add" onClick={abirModal} title="Adicionar ponto de parada">
                    +
                </button>
                <div className="linha"></div>
            </div>
            
            <div className="ponto">
                <span className="bolinha"></span>
                <span className="nome-ponto">{rota.destino}</span>
            </div>

            {modal && (
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