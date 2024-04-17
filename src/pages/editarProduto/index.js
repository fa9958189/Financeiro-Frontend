import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';


export default function EditarProduto() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");
  const [medidaPorMetro, setMedidaPorMetro] = useState("");
  const [valor, setValor] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");

  useEffect(() => {
    mostrarDados(id);
  }, [])

  async function mostrarDados(id) {
    const response = await api.get(`/produto/${id}`);
    const produto = response.data.produtos;

    setStatus(produto.status);
    setDescricao(produto.descricao);
    setMedidaPorMetro(produto.medida_por_metro);
    setValor(produto.valor);
    setDataEntrada(produto.data_entrada);
  }

  function salvarDados(e) {
    e.preventDefault();

    if (status === "" || descricao === "" || medidaPorMetro === "" || valor === "" || dataEntrada === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const produto = {
      id,
      status,
      descricao,
      medida_por_metro: medidaPorMetro,
      valor,
      data_entrada: dataEntrada
    };

    api.put(`/produto/${id}`, produto, { headers: { "Content-Type": "application/json" } })
      .then(function (response) {
        console.log(response.data);
        alert(response.data.mensagem);
        navigate('/listaprodutos');
      })
      .catch(function (error) {
        console.error("Erro ao editar produto:", error);
      });
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Editar Produto" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvarDados}>
            <input type='text'
              value={status}
              onChange={e => setStatus(e.target.value)}
              placeholder='Digite o status (Ativo/Inativo)'
            />
            <input
              type='text'
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder='Digite a descrição'
            />
            <input
              type='text'
              value={medidaPorMetro}
              onChange={e => setMedidaPorMetro(e.target.value)}
              placeholder='Digite a medida por metro'
            />
            <input
              type='number'
              value={valor}
              onChange={e => setValor(e.target.value)}
              placeholder='Digite o valor'
            />
            <input
              type='date'
              value={dataEntrada}
              onChange={e => setDataEntrada(e.target.value)}
              placeholder='Digite a data de entrada'
            />

            <div className='acao'>
              <button className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button className='btn-cancel'>
                <MdCancel />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
