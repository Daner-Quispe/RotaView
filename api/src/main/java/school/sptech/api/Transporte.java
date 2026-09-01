package school.sptech.api;

import java.time.LocalTime;

public class Transporte {
    private String linha;
    private String tipo;
    private String origem;
    private String destino;
    private LocalTime horario;

    public Transporte(String linha, String tipo, String origem, String destino, LocalTime horario) {
        this.linha = linha;
        this.tipo = tipo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
    }

    public Transporte() {
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

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }
}
