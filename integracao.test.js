import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "./src/app.js";

// Simular os repositórios para não precisar acessar o banco de dados. 
vi.mock("./src/repositories/montadoraRepository.js", () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn()
    }
}));

vi.mock("./src/repositories/clienteRepository.js", () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn()
    }
}));

vi.mock("./src/repositories/veiculoRepository.js", () => ({
    default: {
        criar: vi.fn(),
        editar: vi.fn(),
        deletar: vi.fn(),
        selecionar: vi.fn()
    }
}));

// Simula os modelos para os testes não dependerem da implementação deles
vi.mock("./src/models/Montadora.js", () => ({
    Montadora: {
        criar: vi.fn((dados) => dados),
        editar: vi.fn((dados, id) => ({ ...dados, id }))
    }
}));

vi.mock("./src/models/Cliente.js", () => ({
    Cliente: {
        criar: vi.fn((dados) => dados),
        editar: vi.fn((dados, id) => ({ ...dados, id }))
    }
}));

vi.mock("./src/models/Veiculo.js", () => ({
    Veiculo: {
        criar: vi.fn((dados) => dados),
        editar: vi.fn((dados, id) => ({ ...dados, id }))
    }
}));

// Simular consulta de CEP
vi.mock("./src/utils/consultarCep.js", () => ({
    consultarCep: vi.fn(async (cep) => ({
        cep,
        logradouro: "Rua de Teste",
        bairro: "Centro",
        cidade: "São Paulo",
        uf: "SP"
    }))
}));

vi.mock("./src/utils/limparNumero.js", () => ({
    limparNumero: vi.fn((valor) => valor)
}));

import montadoraRepository from "./src/repositories/montadoraRepository.js";
import clienteRepository from "./src/repositories/clienteRepository.js";
import veiculoRepository from "./src/repositories/veiculoRepository.js";

beforeEach(() => {
    vi.clearAllMocks();
});

const montadora = {
    nome: "Toyota",
    pais: "Japão"
};

const cliente = {
    nome: "Ana Silva",
    cpf: "12345678901",
    cep: "01001000",
    numero: "100",
    complemento: "Casa"
};

const veiculo = {
    idMontadora: 1,
    idCliente: 1,
    modelo: "Corolla",
    placa: "ABC1234",
    ano: 2025,
    cor: "Prata",
    valor: 100000
};

// MONTADORAS

describe("Montadoras", () => {
    it("CT-001 - Criar montadora", async () => {
        montadoraRepository.criar.mockResolvedValue({ insertId: 1 });
        const resposta = await request(app).post("/montadoras").send(montadora);
        expect(resposta.status).toBe(201);
    });

    it("CT-002 - Erro ao criar montadora", async () => {
        montadoraRepository.criar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).post("/montadoras").send(montadora);
        expect(resposta.status).toBe(500);
    });

    it("CT-003 - Listar montadoras", async () => {
        montadoraRepository.selecionar.mockResolvedValue([montadora]);
        const resposta = await request(app).get("/montadoras");
        expect(resposta.status).toBe(200);
        expect(resposta.body.data).toHaveLength(1);
    });

    it("CT-004 - Erro ao listar montadoras", async () => {
        montadoraRepository.selecionar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).get("/montadoras");
        expect(resposta.status).toBe(500);
    });

    it("CT-005 - Atualizar montadora", async () => {
        montadoraRepository.editar.mockResolvedValue({ affectedRows: 1 });
        const resposta = await request(app).put("/montadoras?id=1").send(montadora);
        expect(resposta.status).toBe(200);
    });

    it("CT-006 - Erro ao atualizar montadora", async () => {
        montadoraRepository.editar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).put("/montadoras?id=1").send(montadora);
        expect(resposta.status).toBe(500);
    });

    it("CT-007 - Deletar montadora", async () => {
        montadoraRepository.deletar.mockResolvedValue({ affectedRows: 1 });
        const resposta = await request(app).delete("/montadoras/1");
        expect(resposta.status).toBe(200);
    });

    it("CT-008 - Erro ao deletar montadora", async () => {
        montadoraRepository.deletar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).delete("/montadoras/1");
        expect(resposta.status).toBe(500);
    });
});

// CLIENTES

describe("Clientes", () => {
    it("CT-009 - Criar cliente", async () => {
        clienteRepository.criar.mockResolvedValue({ insertId: 1 });
        const resposta = await request(app).post("/clientes").send(cliente);
        expect(resposta.status).toBe(201);
    });

    it("CT-010 - Erro ao criar cliente", async () => {
        clienteRepository.criar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).post("/clientes").send(cliente);
        expect(resposta.status).toBe(500);
    });

    it("CT-011 - Listar clientes", async () => {
        clienteRepository.selecionar.mockResolvedValue([cliente]);
        const resposta = await request(app).get("/clientes");
        expect(resposta.status).toBe(200);
        expect(resposta.body.data).toHaveLength(1);
    });

    it("CT-012 - Erro ao listar clientes", async () => {
        clienteRepository.selecionar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).get("/clientes");
        expect(resposta.status).toBe(500);
    });

    it("CT-013 - Atualizar cliente", async () => {
        clienteRepository.editar.mockResolvedValue({ affectedRows: 1 });
        const resposta = await request(app).put("/clientes?id=1").send(cliente);
        expect(resposta.status).toBe(200);
    });

    it("CT-014 - Erro ao atualizar cliente", async () => {
        clienteRepository.editar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).put("/clientes?id=1").send(cliente);
        expect(resposta.status).toBe(500);
    });

    it("CT-015 - Deletar cliente", async () => {
        clienteRepository.deletar.mockResolvedValue({ affectedRows: 1 });
        const resposta = await request(app).delete("/clientes/1");
        expect(resposta.status).toBe(200);
    });

    it("CT-016 - Erro ao deletar cliente", async () => {
        clienteRepository.deletar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).delete("/clientes/1");
        expect(resposta.status).toBe(500);
    });
});

// VEÍCULOS

describe("Veículos", () => {

    it("CT-017 - Criar veículo", async () => {
        veiculoRepository.criar.mockResolvedValue({ insertId: 1 });
        const resposta = await request(app).post("/veiculos").send(veiculo);
        expect(resposta.status).toBe(201);
    });

    it("CT-018 - Erro ao criar veículo", async () => {
        veiculoRepository.criar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).post("/veiculos").send(veiculo);
        expect(resposta.status).toBe(500);
    });

    it("CT-019 - Listar veículos", async () => {
        veiculoRepository.selecionar.mockResolvedValue([veiculo]);
        const resposta = await request(app).get("/veiculos");
        expect(resposta.status).toBe(200);
        expect(resposta.body.data).toHaveLength(1);
    });

    it("CT-020 - Erro ao listar veículos", async () => {
        veiculoRepository.selecionar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).get("/veiculos");
        expect(resposta.status).toBe(500);
    });

    it("CT-021 - Atualizar veículo", async () => {
        veiculoRepository.editar.mockResolvedValue({ affectedRows: 1 });
        const resposta = await request(app).put("/veiculos?id=1").send(veiculo);
        expect(resposta.status).toBe(200);
    });

    it("CT-022 - Erro ao atualizar veículo", async () => {
        veiculoRepository.editar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).put("/veiculos?id=1").send(veiculo);
        expect(resposta.status).toBe(500);
    });

    it("CT-023 - Deletar veículo", async () => {
        veiculoRepository.deletar.mockResolvedValue({ affectedRows: 1 });
        const resposta = await request(app).delete("/veiculos/1");
        expect(resposta.status).toBe(200);
    });

    it("CT-024 - Erro ao deletar veículo", async () => {
        veiculoRepository.deletar.mockRejectedValue(new Error("Erro"));
        const resposta = await request(app).delete("/veiculos/1");
        expect(resposta.status).toBe(500);
    });
});