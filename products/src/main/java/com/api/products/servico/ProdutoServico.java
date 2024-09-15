package com.api.products.servico;

import com.api.products.modelo.ProdutoModelo;
import com.api.products.repositorio.ProdutoRepositorio;
import com.api.products.reposta.RespostaModelo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProdutoServico {

    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String asao){
        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do produto é obligatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getMarca().equals("")){
            rm.setMensagem("A marca do produto é obligatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (asao.equals("cadastrar")) {
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
            }
        }
    }


    //Metodo para remover produtos
    public ResponseEntity<RespostaModelo> remover(Long codigo){
        pr.deleteById(codigo);
        rm.setMensagem("O produto foi removido con sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }


}
