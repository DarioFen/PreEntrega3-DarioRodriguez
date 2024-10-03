class Contacto {
  constructor(nombre, apellido, telefono, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
  }
}

//ni bien carga el documento ejecuta 2 funciones
document.addEventListener('DOMContentLoaded', () => {
  cargarContactosPorDefecto();
  mostrarContactos();
});

//funcion util para no estar parseando el local storage cada vez que queremos traer contactos
function obtenerContactos() {
  return JSON.parse(localStorage.getItem('contactos')) || [];
}

//esta es la funcion que se ejecuta cuando se carga la pagina y verifica si hay algo en el local, si no hay los carga
function cargarContactosPorDefecto() {
  let contactos = obtenerContactos();

  if (!contactos || contactos.length === 0) {
      const contactosPorDefecto = [
          new Contacto('Juan', 'Pérez', '2292-4242', 'juan@gmail.com'),
          new Contacto('Ana', 'Gómez', '2292-5678', 'ana@gmail.com'),
          new Contacto('Carlos', 'López', '2292-8765', 'carlos@gmail.com'),
          new Contacto('María', 'Rodríguez', '2295-4321', 'maria@gmail.com'),
          new Contacto('Lucía', 'Martínez', '2293-7890', 'lucia@gmail.com')
      ];

      localStorage.setItem('contactos', JSON.stringify(contactosPorDefecto));
  }
}

//imprimimos todo en el dom
function mostrarContactos() {
  const contactos = obtenerContactos();
  const listaContactos = document.getElementById('lista-contactos');

  console.log(contactos);

  // Limpiamos la lista de contactos
  listaContactos.innerHTML = '';

  contactos.forEach((contacto, id) => {
      const li = crearElementoContacto(contacto, id);
      listaContactos.appendChild(li);
  });
}

function crearElementoContacto(contacto, id) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = `${contacto.nombre} ${contacto.apellido}`;

    const telefono = document.createElement('p');
    telefono.textContent = `Teléfono: ${contacto.telefono}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${contacto.email}`;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    botonEliminar.addEventListener('click', () => eliminarContacto(id));

    div.appendChild(strong);
    div.appendChild(telefono);
    div.appendChild(email);
    li.appendChild(div);
    li.appendChild(botonEliminar);

    //creamos todo primero y lo retornamos, asi queda mas limpio y despues en la funcion de mostrar es solo llamar la funcion
    return li;
}


document.querySelector('#procesar').addEventListener('click', agregarContacto);

// Función para agregar un contacto nuevo
function agregarContacto(e) {
  e.preventDefault();

  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const telefono = document.querySelector('#telefono').value;
  const email = document.querySelector('#email').value;

  // Validación de campos
  if (nombre === '' || apellido === '' || isNaN(telefono) || email === '') {
      alert('Uno de los campos tiene valores incorrectos');
      return;
  }

  const nuevoContacto = new Contacto(nombre, apellido, telefono, email);

  let contactos = obtenerContactos();

  contactos = [...contactos, nuevoContacto];

  localStorage.setItem('contactos', JSON.stringify(contactos));
  mostrarContactos();

  document.getElementById('form-contacto').reset();
}



function eliminarContacto(id) {
  let contactos = obtenerContactos();
  contactos = contactos.filter((contacto, contactoIndex) => contactoIndex !== id);
  localStorage.setItem('contactos', JSON.stringify(contactos));

  // Mostramos los contactos actualizados
  mostrarContactos();
}
