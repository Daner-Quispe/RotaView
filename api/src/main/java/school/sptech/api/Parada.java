package school.sptech.api;

public class Parada {
    private Integer id;
    private String nomeParada;
    private Integer ordem;

    public Parada(Integer id, String nomeParada, Integer ordem) {
        this.id = id;
        this.nomeParada = nomeParada;
        this.ordem = ordem;
    }

    public Parada() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeParada() {
        return nomeParada;
    }

    public void setNomeParada(String nomeParada) {
        this.nomeParada = nomeParada;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }
}
