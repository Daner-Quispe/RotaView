import { LinhaRota } from "./LinhaRota";
import onibus from "../assets/icon-onibus.jpeg";
import trem from "../assets/icon-trem.jpg";
import metro from "../assets/icon-metro.png";

export function CardRota( {rota} ) {
    const icones = {
        "Ônibus": onibus,
        "Trem": trem,
        "Metrô": metro
    };

    return (
        <div className="card-rota">
            <div className="cabecalho-rota">
                <div>
                    <p>Tipo: {rota.tipo}</p>
                    <p>Linha: {rota.linha}</p>
                </div>
                
                <div className="cabecalho-icon">
                    <div>
                        <p>Operadora: {rota.operadora}</p>
                    </div>
                    <div className="icone-transporte">
                        <img src={icones[rota.tipo]} alt={rota.tipo} />
                    </div>
                </div>
                

            </div>
            <LinhaRota rota={rota}/>
        </div>
    );
}