package school.sptech.api;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transporte")
public class TransporteController {
    private final JdbcTemplate template;

    public TransporteController(JdbcTemplate template) {
        this.template = template;
    }

}
