import axios from "axios";
import { useState } from "react";

export function ModalParada( {rotaId, ordem, fechar, atualizar} ) {
    const [nomeParada, setNomeParada] = useState("");

    function adicionarParada() {
        const parada = {
            nomeParada: nomeParada,
            ordem: ordem
        };

        axios.post(`http://localhost:8080/rotas/${rotaId}/paradas`, parada)
            .then(() => {
                atualizar();
                fechar();
                setNomeParada("");
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    return(
        <div className="modal-fundo">
            <div className="modal">
                <h2>Adicionar parada</h2>
                
                <input placeholder="Nome da parada" value={nomeParada} onChange={evento => setNomeParada(evento.target.value)} />

                <div>
                    <button onClick={fechar}>Cancelar</button>

                    <button onClick={adicionarParada}> Adicionar</button> 
                </div>
            </div>
        </div>
    );
}