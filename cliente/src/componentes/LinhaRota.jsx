import axios from "axios";
import { useEffect, useState } from "react";
import { ModalParada } from "./ModalParada";
import styles from "./LinhaRota.module.css";

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
        <div className={styles.linhaRota}>
            <div className={styles.ponto}>
                <span className={styles.bolinha}></span>
                <span className={styles.nomePonto}>{rota.partida}</span>
            </div>

            {paradas.map((parada) => (
                <div className={styles.trecho} key={parada.id}>
                    <div className={styles.linha}></div>

                    <div className={styles.ponto}>
                        <span className={styles.bolinha}></span>
                        <span className={styles.nomePonto}>{parada.nomeParada}</span>
                    </div>
                </div>
            ))}

            <div className={styles.trecho}>
                <div className={styles.linha}></div>
                <button className={styles.botaoAdd} onClick={abirModal} title="Adicionar ponto de parada">
                    +
                </button>
                <div className={styles.linha}></div>
            </div>
            
            <div className={styles.ponto}>
                <span className={styles.bolinha}></span>
                <span className={styles.nomePonto}>{rota.destino}</span>
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