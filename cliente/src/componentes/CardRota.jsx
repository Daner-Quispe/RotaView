import { LinhaRota } from "./LinhaRota";

export function CardRota( {rota} ) {
    return (
        <div className="card-rota">
            <div className="cabecalho-rota">
                <div>
                    <p>Tipo: {rota.tipo}</p>
                    <p>Linha: {rota.linha}</p>
                </div>

                <div>
                    <p>Operadora: {rota.operadora}</p>
                </div>

                <div className="icone-transporte">
                    {rota.tipo === "Ônibus"}
                    {rota.tipo === "Trem"}
                    {rota.tipo === "Metrô"}
                </div>

            </div>
            <LinhaRota rota={rota}/>
        </div>
    );
}