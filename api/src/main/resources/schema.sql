CREATE TABLE Transporte (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(10) NOT NULL,
    linha VARCHAR(30) NOT NULL,
    operadora VARCHAR(30) NOT NULL
);

CREATE TABLE Rota (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partida VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fkTransporte INT,
    FOREIGN KEY (fkTransporte) REFERENCES Transporte(id)
);

CREATE TABLE Parada (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomeParada VARCHAR(100) NOT NULL
);

CREATE TABLE Rota_parada (
    fkRota INT NOT NULL,
    fkParada INT NOT NULL,
    ordem INT,
    PRIMARY KEY (fkRota, fkParada),
    FOREIGN KEY (fkRota) REFERENCES Rota(id),
    FOREIGN KEY (fkParada) REFERENCES Parada(id)
);