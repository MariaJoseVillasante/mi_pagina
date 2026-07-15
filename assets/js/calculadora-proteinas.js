document.addEventListener('DOMContentLoaded', () => {
  const alimentosOriginales = [
    { nombre: 'Frutos secos', proteina: 0.15, tipo: 'gramos' },
    { nombre: 'Huevo', proteina: 6, tipo: 'unidad' },
    { nombre: 'Leche', proteina: 0.034, tipo: 'ml' },
    { nombre: 'Pechuga de Pavo', proteina: 1.9, tipo: 'lámina' },
    { nombre: 'Queso fresco', proteina: 0.14, tipo: 'gramos' },
    { nombre: 'Queso mantecoso', proteina: 0.21, tipo: 'gramos' },
    { nombre: 'Queso mantecoso (lámina)', proteina: 6.5, tipo: 'lámina' },
    { nombre: 'Scoop de proteína', proteina: 25, tipo: 'scoop' },
    { nombre: 'Yogurt protein', proteina: 10, tipo: 'unidad' },
    { nombre: 'Taza Arroz', proteina: 5, tipo: 'unidad' },
    { nombre: 'Atún', proteina: 0.25, tipo: 'gramos' },
    { nombre: 'Camarones', proteina: 0.24, tipo: 'gramos' },
    { nombre: 'Carne de res', proteina: 0.26, tipo: 'gramos' },
    { nombre: 'Choclo', proteina: 0.031, tipo: 'gramos' },
    { nombre: 'Edamame', proteina: 0.11, tipo: 'gramos' },
    { nombre: 'Erizos', proteina: 0.13, tipo: 'gramos' },
    { nombre: 'Espinacas', proteina: 0.029, tipo: 'gramos' },
    { nombre: 'Garbanzos', proteina: 0.19, tipo: 'gramos' },
    { nombre: 'Lentejas', proteina: 0.09, tipo: 'gramos' },
    { nombre: 'Ostras', proteina: 9, tipo: 'unidad' },
    { nombre: 'Panitas de pollo', proteina: 0.167, tipo: 'gramos' },
    { nombre: 'Papas', proteina: 4, tipo: 'unidad' },
    { nombre: 'Pavo', proteina: 0.29, tipo: 'gramos' },
    { nombre: 'Pollo', proteina: 0.27, tipo: 'gramos' },
    { nombre: 'Porotos', proteina: 0.09, tipo: 'gramos' },
    { nombre: 'Porotos Negros', proteina: 0.216, tipo: 'gramos' },
    { nombre: 'Reineta', proteina: 0.19, tipo: 'gramos' },
    { nombre: 'Salmón', proteina: 0.20, tipo: 'gramos' },
    { nombre: 'Tofu', proteina: 0.29, tipo: 'gramos' },
  ];

  let alimentos = [...alimentosOriginales];

  const listaAlimentos = document.getElementById('listaAlimentos');
  const pesoInput = document.getElementById('peso');
  const proteinasObjetivoInput = document.getElementById('proteinasObjetivo');
  const resultado = document.getElementById('resultado');
  const metaProteinas = document.getElementById('metaProteinas');
  const btnRestaurarLista = document.getElementById('btnRestaurarLista');

  function generarListaAlimentos() {
    if (!listaAlimentos) return;

    listaAlimentos.innerHTML = '';

    alimentos.forEach((alimento, index) => {
      const fila = document.createElement('tr');
      fila.className = 'cart-item';
      fila.setAttribute('data-aos', 'fade-up');
      fila.setAttribute('data-aos-delay', 200 + index * 50);

      fila.innerHTML = `
        <th scope="row">${alimento.nombre}</th>
        <td>${alimento.proteina} g por ${alimento.tipo}</td>
        <td>
          <div class="quantity-selector">
            <button 
              class="quantity-btn decrease" 
              type="button"
              aria-label="Disminuir cantidad"
              data-action="decrease">
              <em class="bi bi-dash"></em>
            </button>

            <label for="cantidad-${index}" class="visually-hidden">
              Cantidad de ${alimento.nombre}
            </label>

            <input 
              id="cantidad-${index}" 
              type="number" 
              data-proteina="${alimento.proteina}"
              data-tipo="${alimento.tipo}"
              class="quantity-input" 
              value="0" 
              min="0" 
              step="1">

            <button 
              class="quantity-btn increase" 
              type="button"
              aria-label="Aumentar cantidad"
              data-action="increase">
              <em class="bi bi-plus"></em>
            </button>
          </div>
        </td>
        <td class="product-total">0 g</td>
        <td class="text-center">
          <button 
            class="btn btn-danger btn-sm" 
            type="button"
            aria-label="Eliminar alimento"
            data-action="delete"
            data-index="${index}">
            <em class="bi bi-trash"></em>
          </button>
        </td>
      `;

      listaAlimentos.appendChild(fila);
    });

    calcularProteinas();
  }

  function eliminarAlimento(index) {
    alimentos.splice(index, 1);
    generarListaAlimentos();
  }

  function restaurarLista() {
    alimentos = [...alimentosOriginales];
    generarListaAlimentos();
  }

  function actualizarMetaProteinas() {
    const peso = parseFloat(pesoInput.value) || 0;
    const meta = peso * 1.3;

    proteinasObjetivoInput.value = meta.toFixed(2);
    calcularProteinas();
  }

  function modificarCantidad(button, cambio) {
    const input = button
      .closest('.quantity-selector')
      .querySelector('.quantity-input');

    const nuevoValor = (parseFloat(input.value) || 0) + cambio;

    if (nuevoValor >= 0) {
      input.value = nuevoValor;
      calcularProteinas();
    }
  }

  function calcularProteinas() {
    let totalProteinas = 0;

    document.querySelectorAll('.quantity-input').forEach((input) => {
      const cantidad = parseFloat(input.value) || 0;
      const proteinaPorUnidad = parseFloat(input.dataset.proteina) || 0;
      const proteinaTotal = cantidad * proteinaPorUnidad;

      totalProteinas += proteinaTotal;

      const totalDisplay = input.closest('tr').querySelector('.product-total');
      totalDisplay.textContent = `${proteinaTotal.toFixed(2)} g`;
    });

    const peso = parseFloat(pesoInput.value) || 0;
    const objetivo = parseFloat(proteinasObjetivoInput.value) || peso * 1.3;

    let mensaje = '';

    if (!peso) {
      mensaje = '⚠️ Ingresa tu peso para calcular tu meta de proteínas.';
    } else if (totalProteinas >= objetivo) {
      mensaje = '✅ ¡Has alcanzado tu meta de proteínas!';
    } else {
      const diferencia = objetivo - totalProteinas;
      const scoopsFaltantes = Math.ceil(diferencia / 25);
      const huevosFaltantes = Math.ceil(diferencia / 6);

      mensaje = `❌ Te faltan ${diferencia.toFixed(2)} g de proteínas.
➡️ Puedes alcanzar tu meta consumiendo ${scoopsFaltantes} scoop(s) de proteína o ${huevosFaltantes} huevo(s).`;
    }

    resultado.innerText = `Total de proteínas: ${totalProteinas.toFixed(2)} g`;
    metaProteinas.innerText = mensaje;
  }

  if (btnRestaurarLista) {
    btnRestaurarLista.addEventListener('click', restaurarLista);
  }

  if (pesoInput) {
    pesoInput.addEventListener('input', actualizarMetaProteinas);
  }

  if (proteinasObjetivoInput) {
    proteinasObjetivoInput.addEventListener('input', calcularProteinas);
  }

  if (listaAlimentos) {
    listaAlimentos.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;

      const action = button.dataset.action;

      if (action === 'decrease') {
        modificarCantidad(button, -1);
      }

      if (action === 'increase') {
        modificarCantidad(button, 1);
      }

      if (action === 'delete') {
        eliminarAlimento(Number(button.dataset.index));
      }
    });

    listaAlimentos.addEventListener('input', (event) => {
      if (event.target.classList.contains('quantity-input')) {
        calcularProteinas();
      }
    });
  }

  generarListaAlimentos();
});