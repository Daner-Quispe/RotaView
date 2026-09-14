import axios from "axios";
import { useState } from "react";
import styles from "./ModalParada.module.css";


export function ModalParada( {rotaId, ordem, fechar, atualizar} ) {
    const [nomeParada, setNomeParada] = useState("");
    const [validarErro, setValidarErro] = useState(false);

    function adicionarParada() {
        setValidarErro(false);
        const parada = {
            nomeParada: nomeParada,
            ordem: ordem
        };

        if (parada.nomeParada.trim() === "") {
            setValidarErro(true);
            return;
        }

        axios.post(`http://localhost:8080/rotas/${rotaId}/paradas`, parada)
            .then(() => {
                atualizar();
                fechar();
                setNomeParada(""); 
                
                alert(`O ponto de parada ${parada.nomeParada} foi cadastrado!`)
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    return(
        <div className={styles.modalFundo}>
            <div className={styles.modal}>
                <h2>Adicionar parada</h2>
                
                <input placeholder="Nome da parada" value={nomeParada} onChange={evento => setNomeParada(evento.target.value)} />

                {validarErro && (
                    <p className="msg-erro">Preencha o campo</p>
                )}

                <div className={styles.botaoModal}>
                    <div className={styles.cancelar}>
                        <button onClick={fechar}>Cancelar</button>
                    </div>

                    <div className={styles.adicionar}>
                        <button onClick={adicionarParada}> Adicionar</button>
                    </div> 
                </div>
            </div>
        </div>
    );
}