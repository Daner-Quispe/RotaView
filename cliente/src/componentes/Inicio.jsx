import styles from "./Inicio.module.css";
import rota from "../assets/rota.png";
import colaborar from "../assets/business-people.png";
import cadastrar from "../assets/cadastrar.jpeg";

export function Inicio() {
    return (
        <div className={styles.fundoInicio}>
            <div className={styles.cardInicio}>
                <div className={styles.inicio}>
                    <h2>Conheça as rotas do Transporte Urbano</h2>
                    <p>
                        Encontre caminhos, linhas e pontos de parada <br />
                        através da plataforma colaborativa.
                    </p>
                </div>

                <div className={styles.sobre}>
                    <h3>Como funciona?</h3>
                    <div className={styles.topicos}>
                        <div className={styles.cardTopico}>
                            <p>Encontre Rotas</p>
                            <img src={rota} alt="" />
                        </div>
                        <div className={styles.cardTopico}>
                            <p>Cadastre novas Rotas</p>
                            <img src={cadastrar} alt="" />
                        </div>
                        <div className={styles.cardTopico}>
                            <p>Colabore com novas paradas</p>
                            <img src={colaborar} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}