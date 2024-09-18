import './App.css';
import Tabela from './Tabela';
import Formulario from './Formulario';
import { useEffect, useState } from 'react';

function App() {
  // Objeto Produto
  const produto = {
    codigo : 0,
    nome: "",
    marca:""
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  // UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido =>setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados do formulario
  const aoDigitar =(e)=>{
    setObjProduto({...objProduto, [e.target.name]:e.target.value})
    console.log(e.target);
  }

  // cadastrar produto

  const cadastrar =()=>{
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type': 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      console.log(retorno_convertido);
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else {
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }      
    })
  }

  // alterar produto

  const alterar =()=>{
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type': 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      console.log(retorno_convertido);
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else {
        // Mensagem
        alert('Produto alterado com sucesso!');
         // Copia do vetor de produtos
        let vetorTemp = [...produtos];

        //Índice
        let indice = vetorTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo;
        });

        //alterar produto do vetorTemp
        vetorTemp[indice] = objProduto;

        // Atualiza o vetor de produtos
        setProdutos(vetorTemp);

        // Limpar formulario
        limparFormulario();

      }      
    })
  }

  // Limpar formulário
  const limparFormulario =()=>{
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

   //Selecionar produto
   const selecionarProduto =(indice)=>{
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  // Remover com  o novo dado
  const remover = ()=>{
    fetch('http://localhost:8080/remover/' + objProduto.codigo, {
      method:'DELETE',
      headers:{
        'Content-type': 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      console.log(retorno_convertido);

      // Mensagem
      alert(retorno_convertido.mensagem);

      // Copia do vetor de produtos
      let vetorTemp = [...produtos];

      //Índice
      let indice = vetorTemp.findIndex((p)=>{
        return p.codigo === objProduto.codigo;
      });

      //Remover produto do vetorTemp
      vetorTemp.splice(indice, 1);

      // Atualiza o vetor de produtos
      setProdutos(vetorTemp);

      // Limpar formulario
      limparFormulario();

      
    })
  }


  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      
      <Formulario 
      botao={btnCadastrar} 
      eventoTeclado={aoDigitar} 
      cadastrar={cadastrar} 
      obj={objProduto}
      // cancelar={limparFormulario}
      remover={remover}
      alterar={alterar}
      />
      <Tabela 
      vetor={produtos}
      selecionar={selecionarProduto}
      />
    </div>
  );
}

export default App;
