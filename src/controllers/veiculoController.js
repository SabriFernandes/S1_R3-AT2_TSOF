import { vi } from 'vitest'

// Mock do CEP
vi.mock('./src/utils/consultarCep.js', () => ({
    consultarCep: vi.fn(async (cep) => ({
        cep: cep,
        logradouro: 'Rua de Teste',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP'
    }))
}))

import app from './src/app.js'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'


// ==============================
// MONTADORAS
// ==============================

describe('API de montadoras', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-001 - Cadastrar montadora
    it('deve cadastrar uma montadora', async () => {

        const response = await request(app)
            .post('/montadoras')
            .send({
                nome: 'Toyota',
                pais: 'Japão'
            })

        expect(response.status).toBe(201)
    })

    // CT-002 - Listar montadoras
    it('deve listar as montadoras', async () => {

        const response = await request(app)
            .get('/montadoras')

        expect(response.status).toBe(200)
    })

    // CT-003 - Atualizar montadora
    it('deve atualizar uma montadora', async () => {

        const criada = await request(app)
            .post('/montadoras')
            .send({
                nome: 'Honda',
                pais: 'Japão'
            })

        const id = criada.body.data.insertId

        const response = await request(app)
            .put('/montadoras')
            .query({ id: id })
            .send({
                nome: 'Honda Atualizada',
                pais: 'Japão'
            })

        expect(response.status).toBe(200)
    })

    // CT-004 - Deletar montadora
    it('deve deletar uma montadora', async () => {

        const criada = await request(app)
            .post('/montadoras')
            .send({
                nome: 'Ford',
                pais: 'Estados Unidos'
            })

        const id = criada.body.data.insertId

        const response = await request(app)
            .delete(`/montadoras/${id}`)

        expect(response.status).toBe(200)
    })

    // CT-005 - Montadora não encontrada
    it('não deve atualizar uma montadora inexistente', async () => {

        const response = await request(app)
            .put('/montadoras')
            .query({ id: 999999 })
            .send({
                nome: 'Teste',
                pais: 'Brasil'
            })

        expect(response.status).toBe(404)
    })
})


// ==============================
// CLIENTES
// ==============================

describe('API de clientes', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-006 - Cadastrar cliente
    it('deve cadastrar um cliente', async () => {

        const response = await request(app)
            .post('/clientes')
            .send({
                nome: 'Carlos Oliveira',
                cpf: '12345678900',
                cep: '01001000',
                numero: '100',
                complemento: 'Casa'
            })

        expect(response.status).toBe(201)
    })

    // CT-007 - Listar clientes
    it('deve listar os clientes', async () => {

        const response = await request(app)
            .get('/clientes')

        expect(response.status).toBe(200)
    })

    // CT-008 - Atualizar cliente
    it('deve atualizar um cliente', async () => {

        const criada = await request(app)
            .post('/clientes')
            .send({
                nome: 'Ana Souza',
                cpf: '98765432100',
                cep: '01001000',
                numero: '200',
                complemento: ''
            })

        const id = criada.body.data.insertId

        const response = await request(app)
            .put('/clientes')
            .query({ id: id })
            .send({
                nome: 'Ana Souza Atualizada',
                cpf: '98765432100',
                cep: '01001000',
                numero: '250',
                complemento: ''
            })

        expect(response.status).toBe(200)
    })

    // CT-009 - Deletar cliente
    it('deve deletar um cliente', async () => {

        const criada = await request(app)
            .post('/clientes')
            .send({
                nome: 'Pedro Santos',
                cpf: '11122233344',
                cep: '01001000',
                numero: '300',
                complemento: ''
            })

        const id = criada.body.data.insertId

        const response = await request(app)
            .delete(`/clientes/${id}`)

        expect(response.status).toBe(200)
    })
})


// ==============================
// VEÍCULOS
// ==============================

describe('API de veículos', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    // CT-010 - Cadastrar veículo
    it('deve cadastrar um veículo', async () => {

        const response = await request(app)
            .post('/veiculos')
            .send({
                modelo: 'Corolla',
                ano: 2024,
                placa: 'ABC1234',
                id_montadora: 1,
                id_cliente: 1
            })

        expect(response.status).toBe(201)
    })

    // CT-011 - Listar veículos
    it('deve listar os veículos', async () => {

        const response = await request(app)
            .get('/veiculos')

        expect(response.status).toBe(200)
    })

    // CT-012 - Atualizar veículo
    it('deve atualizar um veículo', async () => {

        const criada = await request(app)
            .post('/veiculos')
            .send({
                modelo: 'Civic',
                ano: 2023,
                placa: 'DEF5678',
                id_montadora: 1,
                id_cliente: 1
            })

        const id = criada.body.data.insertId

        const response = await request(app)
            .put('/veiculos')
            .query({ id: id })
            .send({
                modelo: 'Civic Atualizado',
                ano: 2024,
                placa: 'DEF5678',
                id_montadora: 1,
                id_cliente: 1
            })

        expect(response.status).toBe(200)
    })

    // CT-013 - Deletar veículo
    it('deve deletar um veículo', async () => {

        const criada = await request(app)
            .post('/veiculos')
            .send({
                modelo: 'Onix',
                ano: 2022,
                placa: 'GHI9012',
                id_montadora: 1,
                id_cliente: 1
            })

        const id = criada.body.data.insertId

        const response = await request(app)
            .delete(`/veiculos/${id}`)

        expect(response.status).toBe(200)
    })

    // CT-014 - Veículo não encontrado
    it('não deve atualizar um veículo inexistente', async () => {

        const response = await request(app)
            .put('/veiculos')
            .query({ id: 999999 })
            .send({
                modelo: 'Teste',
                ano: 2025,
                placa: 'ZZZ9999',
                id_montadora: 1,
                id_cliente: 1
            })

        expect(response.status).toBe(404)
    })
})