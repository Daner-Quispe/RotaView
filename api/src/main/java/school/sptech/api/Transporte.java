package school.sptech.api;

import java.sql.Time;
import java.time.LocalTime;

public class Transporte {
    private Integer id;
    private String linha;
    private String tipo;
    private String origem;
    private String destino;
    private Time horario;

    public Transporte(String linha, String tipo, String origem, String destino, Time horario) {
        this.linha = linha;
        this.tipo = tipo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
    }

    public Transporte() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLinha() {
        return linha;
    }

    public void setLinha(String linha) {
        this.linha = linha;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public Time getHorario() {
        return horario;
    }

    public void setHorario(Time horario) {
        this.horario = horario;
    }
}
