package school.sptech.api;

import java.sql.Time;
import java.time.LocalTime;

public class Transporte {
    private Integer id;
    private String tipo;
    private String linha;
    private String operadora;
    private String partida;
    private String destino;

    public Transporte(Integer id, String tipo, String linha, String operadora, String partida, String destino) {
        this.id = id;
        this.tipo = tipo;
        this.linha = linha;
        this.operadora = operadora;
        this.partida = partida;
        this.destino = destino;
    }

    public Transporte() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getLinha() {
        return linha;
    }

    public void setLinha(String linha) {
        this.linha = linha;
    }

    public String getOperadora() {
        return operadora;
    }

    public void setOperadora(String operadora) {
        this.operadora = operadora;
    }

    public String getPartida() {
        return partida;
    }

    public void setPartida(String partida) {
        this.partida = partida;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }
}

