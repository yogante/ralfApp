package com.api.products.repositorio;

import com.api.products.modelo.ProdutoModelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long> {
}
