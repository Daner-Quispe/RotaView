package school.sptech.api;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/rotas")
public class RotaController {
    private final JdbcTemplate template;

    public RotaController(JdbcTemplate template) {
        this.template = template;
    }

    @GetMapping
    public ResponseEntity<List<Transporte>> listar() {
        String sql = """
                SELECT t.id, t.tipo, t.linha, t.operadora, r.partida, r.destino 
                    FROM Transporte AS t JOIN Rota AS r 
                        ON t.id = r.fkTransporte
                """;

        List<Transporte> resultado = template.query(sql, new BeanPropertyRowMapper<>(Transporte.class));

        return ResponseEntity.status(200).body(resultado);
    }

    @GetMapping("/{id}/paradas")
   public ResponseEntity<List<Parada>> listarParadas(@PathVariable Integer id) {
        String sql = """
                SELECT p.id, p.nomeParada, rp.ordem 
                    FROM Parada AS p JOIN Rota_parada AS rp
                        ON p.id = rp.fkParada
                    WHERE rp.fkRota = ?
                    ORDER BY rp.ordem
                """;

        List<Parada> resultado = template.query(sql, new BeanPropertyRowMapper<>(Parada.class), id);

        return ResponseEntity.status(200).body(resultado);
    }

    @PostMapping
    public ResponseEntity<Transporte> cadastrar(@RequestBody Transporte transporte) {
        if (transporte.getTipo() == null || transporte.getTipo().isBlank() ||
               transporte.getLinha() == null || transporte.getLinha().isBlank() ||
               transporte.getOperadora() == null || transporte.getOperadora().isBlank() ||
               transporte.getPartida() == null || transporte.getPartida().isBlank() ||
               transporte.getDestino() == null || transporte.getDestino().isBlank()
           ) {
            return ResponseEntity.status(400).build();
        }

        if (existeRota(transporte.getTipo(), transporte.getLinha(), transporte.getOperadora(), transporte.getPartida(), transporte.getDestino())) {
            return ResponseEntity.status(409).build();
        }

        String transporteSql = "INSERT INTO transporte (tipo, linha, operadora) VALUES (?, ?, ?)";

        KeyHolder holder = new GeneratedKeyHolder();
        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(
                    transporteSql, Statement.RETURN_GENERATED_KEYS
            );
            statement.setString(1, transporte.getTipo());
            statement.setString(2, transporte.getLinha());
            statement.setString(3, transporte.getOperadora());

            return statement;
        }, holder);

        int idGerado= holder.getKey().intValue();
        transporte.setId(idGerado);

        String rotaSql = "INSERT INTO rota (partida, destino, fkTransporte) VALUES (?, ?, ?)";
        template.update(rotaSql, transporte.getPartida(), transporte.getDestino(), idGerado);


        return ResponseEntity.status(201).body(transporte);
    }

    @PostMapping("/{id}/paradas")
    public ResponseEntity<Parada> adicionarParada(@PathVariable Integer id, @RequestBody Parada parada) {
        if (parada.getNomeParada() == null || parada.getNomeParada().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        if (!existeRotaPorId(id)) {
            return ResponseEntity.status(404).build();
        }

        String paradaSql = "INSERT INTO Parada (nomeParada) VALUES (?)";

        KeyHolder holder = new GeneratedKeyHolder();
        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(
                    paradaSql, Statement.RETURN_GENERATED_KEYS
            );
            statement.setString(1, parada.getNomeParada());

            return statement;
        }, holder);

        int idGerado= holder.getKey().intValue();
        parada.setId(idGerado);

        String rotaParadaSql = "INSERT INTO Rota_parada (fkRota, fkParada, ordem) VALUES (?, ?, ?)";
        template.update(rotaParadaSql, id, idGerado, parada.getOrdem());

        return ResponseEntity.status(201).body(parada);
    }


    private boolean existeRota(String tipo, String linha, String operadora, String partida, String destino) {
        String sql = """
                SELECT COUNT(*) FROM Transporte AS t JOIN Rota AS r 
                    ON t.id = r.fkTransporte
                    WHERE UPPER(t.tipo) = UPPER(?)
                      AND UPPER(t.linha) = UPPER(?)
                      AND UPPER(t.operadora) = UPPER(?) 
                      AND UPPER(r.partida) = UPPER(?) 
                      AND UPPER(r.destino) = UPPER(?)
                """;
        Integer quantidade = template.queryForObject(sql, Integer.class, tipo, linha, operadora, partida, destino);
        return quantidade != null && quantidade > 0;
   }

   private boolean existeRotaPorId(Integer id) {
        String sql = "SELECT COUNT(*) FROM Rota WHERE id = ?";
        Integer quantidade = template.queryForObject(sql, Integer.class, id);

        return quantidade != null && quantidade > 0;
   }

}
