import React from 'react'

const Formulario = ({botao, eventoTeclado, cadastrar}) => {
  return (
    <form>
      <input type='text' onChange={eventoTeclado} name='nome' placeholder='Nome' className='form-control'/>
      <input type='text' onChange={eventoTeclado} name='marca' placeholder='Marca' className='form-control'/>
      
      {
        botao ? 
        <input type='button' value ='cadastrar' onClick={cadastrar} className='btn btn-primary m-2'></input>
        :
        <div>
          <input type='button' value ='alterar' className='btn btn-warning'></input>
          <input type='button' value ='remover' className='btn btn-danger'></input>
          <input type='button' value ='cancelar' className='btn btn-secondary'></input>
        </div>
      } 
      </form>
  )
}

export default Formulario
