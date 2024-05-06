
const listaPokemon = document.getElementById('pokemonList');
const inputBusquedaPokemon = document.getElementById('pokemonSearch');
const btnAgregarPokemon = document.getElementById('addPokemonBtn');
const btnResetear = document.getElementById('resetBtn');
const btnHistorial = document.getElementById('historyBtn');
const modalHistorial = document.getElementById('historyModal');
const listaHistorial = document.getElementById('historyList');
const btnCerrar = document.getElementsByClassName('close')[0];

let equipoActual = [];
let historialEquipos = [];

// FUNCION PARA ENCONTRAR EL POKEMON
async function buscarPokemon(terminoBusqueda) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${terminoBusqueda.toLowerCase()}`);
  if (!respuesta.ok) {
    throw new Error('El pokemon no existe ponga otro');
  }
  const datos = await respuesta.json();
  return datos;
}

// DETALLES DEL POKEMON AL MOSTRATLO
function mostrarPokemon(pokemon) {
  const tarjetaPokemon = `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid mb-2">
        <p class="card-text">ID: ${pokemon.id}</p>
        <p class="card-text">Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      </div>
    </div>
  `;
  listaPokemon.innerHTML += tarjetaPokemon;
}

// AGREGATR POKEMON AL EQUIPO
async function agregarPokemon() {
  if (equipoActual.length < 3) {
    const terminoBusqueda = inputBusquedaPokemon.value.trim();
    try {
      const pokemon = await buscarPokemon(terminoBusqueda);
      mostrarPokemon(pokemon);
      equipoActual.push(pokemon);
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert('Ya Selecionaste 3 Pokemon. Porfa , Empieza De Nuevo Para Agregar.');
  }
}

// FUNCION PARA REINICIAL EL EQUIPO QUE ESTA
function reiniciarEquipo() {
  if (equipoActual.length > 0) {
    historialEquipos.push([...equipoActual]);
    equipoActual = [];
    listaPokemon.innerHTML = '';
  } else {
    alert('No Hay Pokemones Agregados.');
  }
}

// ESTO ES PARA MOSTRAR EL HISTORIAL DE EQUIPOS
function mostrarHistorial() {
  listaHistorial.innerHTML = '';
  for (let i = 0; i < historialEquipos.length; i++) {
    const itemEquipo = document.createElement('li');
    itemEquipo.textContent = `Equipo ${i + 1}: ${historialEquipos[i].map(pokemon => pokemon.name).join(', ')}`;
    listaHistorial.appendChild(itemEquipo);
  }
  modalHistorial.style.display = 'block';
}


btnCerrar.onclick = function() {
  modalHistorial.style.display = 'none';
}

// EVENTOS DE LOS BOTONES
btnAgregarPokemon.addEventListener('click', agregarPokemon);
btnResetear.addEventListener('click', reiniciarEquipo);
btnHistorial.addEventListener('click', mostrarHistorial);


