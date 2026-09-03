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
@RequestMapping("/transporte")
public class TransporteController {
    private final JdbcTemplate template;

    public TransporteController(JdbcTemplate template) {
        this.template = template;
    }

    @GetMapping
    public ResponseEntity<List<Transporte>> listar() {
        String sql = "SELECT * FROM transporte";

        List<Transporte> resultado =template.query(sql, new BeanPropertyRowMapper<>(Transporte.class));

        return ResponseEntity.status(200).body(resultado);
    }

    @PostMapping
    public ResponseEntity<Transporte> cadastrar(@RequestBody Transporte transporte) {
        String sql = "INSERT INTO transporte (linha, tipo, origem, destino, horario) VALUES (?, ?, ?, ?, ?)";

        KeyHolder holder = new GeneratedKeyHolder();
        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(
                    sql, Statement.RETURN_GENERATED_KEYS
            );
            statement.setString(1, transporte.getLinha());
            statement.setString(2, transporte.getTipo());
            statement.setString(3, transporte.getOrigem());
            statement.setString(4, transporte.getDestino());
            statement.setTime(5, transporte.getHorario());

            return statement;
        }, holder);

        int idGerado= holder.getKey().intValue();
        transporte.setId(idGerado);

        return ResponseEntity.status(201).body(transporte);
    }

}
