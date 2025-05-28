// src/main/java/com/sistema/pawgps/repositorio/ProductoRepository.java
package com.sistema.pawgps.repositorio

import com.sistema.pawgps.modelo.Producto
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductoRepository : JpaRepository<Producto?, Long?>