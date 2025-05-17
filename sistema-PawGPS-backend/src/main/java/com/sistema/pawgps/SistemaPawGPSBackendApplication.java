package com.sistema.pawgps;

import com.sistema.pawgps.modelo.Rol;
import com.sistema.pawgps.modelo.Usuario;
import com.sistema.pawgps.modelo.UsuarioRol;
import com.sistema.pawgps.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class SistemaPawGPSBackendApplication implements CommandLineRunner {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(SistemaPawGPSBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		/*


			Usuario usuario = new Usuario();

			usuario.setNombre("Dirkin");
			usuario.setApellido("Ojeda");
			usuario.setUsername("Dirkin");
			usuario.setPassword(bCryptPasswordEncoder.encode( "3127413304"));
			usuario.setEmail("dirkinojedarogriguez@gmail.com");
			usuario.setTelefono("3212374663");
			usuario.setPerfil("foto.png");

			Rol rol = new Rol();
			rol.setRolId(1L);
			rol.setRolNombre("ADMIN");

			Set<UsuarioRol> usuariosRoles = new HashSet<>();
			UsuarioRol usuarioRol = new UsuarioRol();
			usuarioRol.setRol(rol);
			usuarioRol.setUsuario(usuario);
			usuariosRoles.add(usuarioRol);

			Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario,usuariosRoles);
			System.out.println(usuarioGuardado.getUsername());
			*/


	}
}