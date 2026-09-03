CREATE TABLE IF NOT EXISTS transporte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    linha VARCHAR(50),
    tipo VARCHAR(30),
    origem VARCHAR(200),
    destino VARCHAR(200),
    horario TIME
);