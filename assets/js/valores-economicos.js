(() => {
  const API_BASE_URL = 'https://mindicador.cl/api';
  const RETENCION_HONORARIOS = 0.1525;
  const FACTOR_MONTO_NETO = 1 - RETENCION_HONORARIOS;

  let valorUFCache = null;

  const formatterCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });

  function formatNumber(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return 'No disponible';
    }

    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value;
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const dailyIndicators = await response.json();

      setText('UF', `$${formatNumber(dailyIndicators.uf?.valor)}`);
      setText('DolarO', `$${formatNumber(dailyIndicators.dolar?.valor)}`);
      setText('DolarA', `$${formatNumber(dailyIndicators.dolar_intercambio?.valor)}`);
      setText('Euro', `$${formatNumber(dailyIndicators.euro?.valor)}`);
      setText('IPC', ` ${formatNumber(dailyIndicators.ipc?.valor)}%`);
      setText('UTM', `$${formatNumber(dailyIndicators.utm?.valor)}`);
      setText('IVP', `$${formatNumber(dailyIndicators.ivp?.valor)}`);
      setText('Imacec', ` ${formatNumber(dailyIndicators.imacec?.valor)}%`);
    } catch (error) {
      console.error('Error obteniendo indicadores económicos:', error);
    }
  }

  async function obtenerValorUF() {
    if (valorUFCache) {
      return valorUFCache;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/uf`);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const data = await response.json();
      valorUFCache = data.serie?.[0]?.valor || 0;

      return valorUFCache;
    } catch (error) {
      console.error('Error obteniendo el valor de la UF:', error);
      return 0;
    }
  }

  function cambiarUnidad() {
    const unidadSeleccionada = document.getElementById('unidadSeleccionada')?.value;
    const campoUF = document.getElementById('campoUF');
    const campoCLP = document.getElementById('campoCLP');

    if (!campoUF || !campoCLP) {
      return;
    }

    if (unidadSeleccionada === 'UF') {
      campoUF.style.display = 'block';
      campoCLP.style.display = 'none';
    } else {
      campoUF.style.display = 'none';
      campoCLP.style.display = 'block';
    }
  }

  async function calcularBoleta() {
    const valorUF = await obtenerValorUF();
    const unidadSeleccionada = document.getElementById('unidadSeleccionada')?.value;

    let valorCLP = 0;
    let cantidadUF = 0;

    if (unidadSeleccionada === 'UF') {
      cantidadUF = parseFloat(document.getElementById('cantidadUF')?.value) || 0;
      valorCLP = cantidadUF * valorUF;
    } else {
      valorCLP = parseFloat(document.getElementById('cantidadCLP')?.value) || 0;
      cantidadUF = valorUF ? valorCLP / valorUF : 0;
    }

    const retencion = valorCLP * RETENCION_HONORARIOS;
    const valorNeto = valorCLP - retencion;

    setText('ufDisplay', cantidadUF.toFixed(2));
    setText('valorCLP', formatterCLP.format(valorCLP));
    setText('retencion', formatterCLP.format(retencion));
    setText('valorNeto', formatterCLP.format(valorNeto));
  }

  async function calcularMontoBruto() {
    const valorUF = await obtenerValorUF();

    const montoNetoUF = parseFloat(document.getElementById('montoNetoUF')?.value) || 0;
    const montoNetoCLP =
      parseFloat(document.getElementById('montoNetoCLP')?.value) ||
      montoNetoUF * valorUF;

    const montoBrutoCLP = montoNetoCLP / FACTOR_MONTO_NETO;

    setText('montoBruto', formatterCLP.format(montoBrutoCLP));
  }

  function toggleEconomicos() {
    const econContainer = document.getElementById('economicos');
    const button = document.querySelector('button');

    if (!econContainer || !button) {
      return;
    }

    if (econContainer.style.display === 'none') {
      econContainer.style.display = 'block';
      button.textContent = 'Ver menos';
    } else {
      econContainer.style.display = 'none';
      button.textContent = 'Ver más';
    }
  }

  function initEventListeners() {
    document.getElementById('unidadSeleccionada')?.addEventListener('change', () => {
      cambiarUnidad();
      calcularBoleta();
    });

    document.getElementById('cantidadUF')?.addEventListener('input', calcularBoleta);
    document.getElementById('cantidadCLP')?.addEventListener('input', calcularBoleta);
    document.getElementById('btnCalcularBoleta')?.addEventListener('click', calcularBoleta);

    document.getElementById('montoNetoUF')?.addEventListener('input', calcularMontoBruto);
    document.getElementById('montoNetoCLP')?.addEventListener('input', calcularMontoBruto);
    document.getElementById('btnCalcularMontoBrutoUF')?.addEventListener('click', calcularMontoBruto);
    document.getElementById('btnCalcularMontoBrutoCLP')?.addEventListener('click', calcularMontoBruto);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    cambiarUnidad();
    fetchData();
    setInterval(fetchData, 60000);
  });

  window.toggleEconomicos = toggleEconomicos;
})();
