(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body when page is scrolled
   */
  function toggleScrolled() {
    const body = document.body;
    const header = document.querySelector('#header');
    if (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Animation on scroll init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * Init typed.js
   */
  const typed = document.querySelector('.typed');
  if (typed) {
    let typedStrings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperEl => {
      const config = JSON.parse(swiperEl.querySelector(".swiper-config").innerHTML.trim());
      if (swiperEl.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperEl, config);
      } else {
        new Swiper(swiperEl, config);
      }
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Correct scrolling for hash links
   */
  function correctHashScroll() {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  /**
   * Navmenu scrollspy
   */
  const navmenuLinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenuLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(i => i.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Throttled scroll handler
   */
  let scrolling = false;
  window.addEventListener('scroll', () => {
    if (!scrolling) {
      window.requestAnimationFrame(() => {
        toggleScrolled();
        toggleScrollTop();
        navmenuScrollspy();
        scrolling = false;
      });
      scrolling = true;
    }
  });

  /**
   * Unified on load
   */
  window.addEventListener('load', () => {
    toggleScrolled();
    toggleScrollTop();
    aosInit();
    initSwiper();
    navmenuScrollspy();
    correctHashScroll();
  });

})();

// inicio mini soluciones 

// inicio  que comer

// -----------------------------------------------------
// 1. CONFIGURACIÓN: Listas de recetas + ingredientes + links
//   { nombre: "", link: "", ingredientes: ["", "", ""] },
// -----------------------------------------------------

const Carne = [
  { nombre: "Carne Mongoliana", link: "https://www.recetasthermomix.cl/?recipe=carne-mongoliana", ingredientes: ["30 g de aceite de oliva", "1 trozo de 3 cm de jengibre", "1-2 dientes de ajo (opcional)", "1-2 ají verde (opcional)", "500 g de posta negra o asiento", "100 g de salsa de soya", "1 1/2 cucharadita de maicena", "3 cebollines", "1/2 pimentón rojo"] },
  { nombre: "NACHOS CON CARNE Y SALSA DE QUESO CHEDDAR", link: "https://www.recetasthermomix.cl/?recipe=nachos-con-carne-y-salsa-de-queso-cheddar", ingredientes: ["120 g de queso cheddar", "100 g de crema de leche", "200 g de tomate en conserva", "300 g de posta negra de vacuno, semicongelada", "80 g de cebolla", "30 g de apio", "10 g de ajo", "70 g de pimentón verde", "30 g de aceite de maravilla", "1 cucharada de paprika", "1 cucharada de orégano", "½ cucharadita de comino", "300 g de tortillas de maíz crocantes (nachos)", "2 cucharadas de cilantro picado fino"] },
  { nombre: "Coliflor gratinada con carne al estilo italiano", link: "https://www.recetasthermomix.cl/?recipe=coliflor-gratinada-con-carne-al-estilo-italiano", ingredientes: ["500 g de ramilletes de coliflor", "30 g de puerro", "2 dientes de ajo", "30 g de aceite de oliva", "600 g de carne picada de ternera", "200 g de tomate maduro", "2 ½ cucharaditas de tomillo seco", "½ cucharadita de albahaca seca", "1 cucharadita de orégano seco", "80 g de tomate concentrado", "60 g de crema de leche", "250 g de mozzarella fresca", "250 g de mozzarella", "1 ramita de tomillo fresco"] },
  { nombre: "ALBÓNDIGAS CON SALSA CREMOSA DE MOSTAZA", link: "https://www.recetasthermomix.cl/?recipe=albondigas-con-salsa-cremosa-de-mostaza", ingredientes: ["500 g de posta negra cortada en cubos de 3 cm, sin nervios ni grasa. O carne molida", "50 g de pan desmenuzado", "50 g de leche", "100 g de cebolla", "½ cucharadita de merquén", "½ cucharada de orégano", "½ cucharadita de paprika", "½ cucharadita de ajo en polvo", "½ cucharadita de perejil seco", "1 huevo", "30 g de aceite", "100 g de crema de leche", "30 g de mostaza Dijon", "10 g de salsa inglesa", "0 g de salsa de soya ligera", "1 cucharada de almidón de maíz", "120 g de caldo de carne o agua", "2 cucharadas de perejil picado fino"] },
  { nombre: "PASTEL DE PAPAS", link: "https://www.recetasthermomix.cl/?recipe=pastel-de-papas", ingredientes: ["400 g de cebolla", "30 g de aceite de oliva", "1 hoja de laurel", "1 cucharadita de ají de color", "500 g de carne molida", "3 huevos duros", "12 unidades de aceitunas sin cuesco", "24 g unidades de pasas rubias (opcional)", "1200 g de papas", "400 g de leche o agua", "50 g de mantequilla", "2-3 cucharadas de azúcar granulada"] },
  { nombre: "ASADO ALEMÁN", link: "https://www.recetasthermomix.cl/?recipe=asado-aleman", ingredientes: ["6 huevos", "120 g de pan rallado", "100 g de leche", "400 g de tocino laminado (opcional)", "30 g de aceite de oliva", "80 g de cebolla", "100 g de  pimentón rojo", "500 g de carne molida fresca", "1/2 cucharadita de perejil deshidratado"] },
  { nombre: "BOEUF BOURGUIGNON", link: "https://www.recetasthermomix.cl/?recipe=boeuf-bourguignon", ingredientes: ["60 g de aceite de oliva", "1000 g de sobrecostilla (vacuno) en trozos de 4-5 cm", "150 g de tocino ahumado (en tiras de 5 mm)", "250 g de cebolla", "2 dientes de ajo", "150 g de zanahorias en rodajas", "250 g de vino tinto", "250 g de caldo de carne", "1 cucharada de tomate concentrado", "2 ramitas de tomillo fresco o bien 1 cucharadita de tomillo seco", "1 hoja de laurel seca", "200 g de champiñones frescos", "200 g de cebollas perla o chalotas"] },
  { nombre: "Cazuela de Vacuno", link: "https://www.recetasthermomix.cl/?recipe=cazuela-de-vacuno", ingredientes: ["½ pimentón rojo", "2 dientes de ajo (opcional)", "1 zanahoria", "1 ramita de apio", "½ cebolla", "40 grs. de aceite de oliva", "200 grs. de verduras surtidas congelada (choclo, arvejas, porotos verdes)", "600 grs. de asado de tira o costillas troceado", "1/2 cdita de orégano", "1 cda de concentrado de caldo de verduras Thermomix o cubo de caldo de verduras (opcional)", "200 grs. de zapallo", "8 papas", "3 cucharadas de arroz", "1 cucharada de perejil picado", "Cilantro para decorar"] },
  { nombre: "FILETE A LA PIMIENTA", link: "https://www.recetasthermomix.cl/?recipe=filete-a-la-pimienta", ingredientes: ["40 g de mezcla de pimientas recién molidas", "1200 g de filetes de res", "225 g de tocino ahumado", "40 g de mantequilla", "40 g de cebolla", "30 g de brandy", "250 g de crema"] },
  { nombre: "GOULASH (ESTOFADO AL ESTILO HÚNGARO)", link: "https://www.recetasthermomix.cl/?recipe=goulash-estofado-al-estilo-hungaro", ingredientes: ["1/2 cucharadita de comino en grano", "3 dientes de ajo (opcional)", "3 ramitas de perejil", "3 ramitas de mejorana", "1 trozo de piel de limón", "450 g de cebolla", "30 g de aceite de oliva", "45-50 g de harina", "1000 g de posta negra (o asiento, o filete)", "10 g de azúcar", "30 g de concentrado de tomate", "2 zanahorias medianas", "10 g de mostaza", "1 cucharada de pimentón dulce o paprika", "1 cucharada de pimentón picante dulce", "2 hojas secas de laurel", "1 cucharada de concentrado de caldo verduras o 1 pastilla de concentrado de carne", "200 g de vino cabernet sauvignon"] },
  { nombre: "CHARQUICAN", link: "https://www.recetasthermomix.cl/?recipe=charquican", ingredientes: ["400 g de carne limpia, sin grasa, cortada en cubos grandes y semicongelada. O molida", "100 g de charqui (opcional)", "25 g de aceite de oliva", "1 cebolla mediana", "1 diente de ajo (opcional)", "1/2 cda. de ají color o paprika", "1/2 cdta. de orégano", "1000 g de verduras (papas, zapallo, zanahorias, pimentón cortados en cubitos y choclo picado y porotitos verdes picados)", "1 cda de concentrado de verduras ó 1 cubo", "cilantro o perejil picado para decorar"] },
  { nombre: "ALBÓNDIGAS CON SALSA DE TOMATE", link: "https://www.recetasthermomix.cl/?recipe=albondigas-con-salsa-de-tomate", ingredientes: ["40 g de pan fresco o duro", "80 g de leche", "6-12 ramitas de perejil fresco", "2 diente de ajo (opcional)", "400 g de carne de vacuno o ternera picada o molida", "2 huevos", "1 cebolla en mitades (50-80 g aprox)", "20 g de aceite de oliva extra virgen", "600 g de tomate triturado en conserva"] },
  { nombre: "PASTEL DE CHOCLO", link: "https://www.recetasthermomix.cl/?recipe=pastel-de-choclo", ingredientes: ["400 g de cebolla ", "40 g de aceite", "1 hoja de laurel", "1 cucharadita de ají de color o paprika", "500 g de carne molida", "3 huevos duros", "12 aceitunas (opcional)", "1000 g de granos de choclo congelado", "6 hojas de albahaca frescas", "100 g de leche líquida", "60 g de azúcar", "merquén a gusto (opcional)"] },
  { nombre: "STROGONOFF", link: "https://www.recetasthermomix.cl/?recipe=strogonoff", ingredientes: ["500 g de posta negra (o asiento, o filete) cortada en tiras de 1 cm", "25-30 g de harina", "3 chalotas", "20 g aceite de oliva", "100 g vino tinto", "1 hoja de laurel", "10 g de mostaza", "10 g de salsa inglesa", "200 g de crema de leche líquida", "200 g de champiñones"] },
  { nombre: "CARBONADA", link: "https://www.recetasthermomix.cl/?recipe=carbonada", ingredientes: ["1 cebolla chica", "¼ de pimentón verde y rojo", "1 zanahoria", "15 gr de aceite de oliva", "1 cdta de ají color", "250-300 gr de carne picada o molida", "500-600 gr de verduras surtidas picadas en cubos (papas, zanahorias, zapallo, arvejitas, choclo, porotitos verdes y lo que sea de su agrado)", "1 cda de concentrado de caldo de verduras Thermomix (o 1 cubo de concentrado de caldo de verduras o carne)", "cilantro o perejil picado para decorar"] },
  { nombre: "SALSA BOLOÑESA", link: "https://www.recetasthermomix.cl/?recipe=salsa-bolonesa", ingredientes: ["30 g de apio", "70 g de zanahoria", "100 g de cebolla", "1 ramita de albahaca fresca (solo las hojas) (opcional)", "50 g de aceite de oliva", "400 g de carne picada mixta", "70 g de vino tinto", "1 cucharada de tomate concentrado (opcional)", "400 g de tomate triturado en conserva", "1 hoja de laurel seca", "1 pizca de nuez moscada molida"] },
  { nombre: "LASAÑA BOLOÑESA CON CHAMPIÑONES", link: "https://www.recetasthermomix.cl/?recipe=lasana-de-bolonesa-con-champinones", ingredientes: ["150 - 200 g de queso (manchego semicurado, emmental, etc.)", "200 g de champiñones frescos", "130 g de zanahorias", "130 g de cebolla", "1 diente de ajo", "1 pimentón verde italiano en trozos o bien 1 trozo de apio", "400 g de tomate triturado en conserva", "50 g de aceite de oliva", "500 g de carne picada mixta", "2 pastillas de caldo de carne", "1 cucharadita de orégano seco", "1 hoja de laurel seca", "800 g de leche", "60 g de mantequilla", "70 g de harina", "¼ de cucharadita de nuez moscada molida", "18 placas de lasaña secas precocidas", "5 - 6 cucharaditas de mantequilla"] },
  { nombre: "CONCHIGLIONI RELLENOS CON BOLOÑESA", link: "https://www.recetasthermomix.cl/?recipe=conchiglioni-rellenos-con-bolonesa", ingredientes: ["100g de cebolla cortada en trozos", "2 dientes de ajo (opcional)", "100 g de zanahoria", "50 g de apio", "200 g de champiñones", "400 g de tomate triturado", "60 g de de aceite de oliva y un poco más para la fuente", "350 g de carne molida", "1 cdta de orégano", "400 g de Conchiglioni (pasta con forma de caracol)", "100 g de queso parmesano rallado", "40 g de mantequilla", "40 g de harina sin polvos","700 g de leche","nuez moscada a gusto"] },
  { nombre: "FILETE MARINADO Y SALSA BEARNESA", link: "https://www.recetasthermomix.cl/?recipe=filete-marinado-y-salsa-bearnesa", ingredientes: ["1000 g de filete de vacuno desgrasado", "2 cucharadas de mostaza de grano", "1/2 cucharita de pimienta negra recién molida", "3 ramitas de romero y/o tomillo, solo las hojas", "50 g de salsa de soya baja en sodio", "50 g de chalotas peladas", "1 ramita de estragón fresco, solo las hojas", "50 g de vino blanco seco", "1 cucharada de vinagre preferentemente de estragón", "200 g de mantequilla en trozos", "4 yemas de huevo"] },
  { nombre: "ESPAGUETTI CON ALBÓNDIGAS", link: "https://www.recetasthermomix.cl/?recipe=espaguetti-con-albondigas", ingredientes: ["300 g de carne molida", "1 huevo", "1 cdita de ajo en polvo", "50 g de pan molido", "30 g de vino blanco (opcional)", "150 g de cebolla blanca, en cuartos", "2 dientes de ajo, pelados", "40 g de aceite vegetal", "1 cdita de paprika", "50 g de vino blanco", "500 g de caldo de res o bien 500 g de agua más 1 cda de concentrado de caldo de res", "500 g de puré de tomate, martajado o triturado", "1 cdita de orégano seco", "1 cdita de azúcar", "300 g de espagueti", "100 g de queso parmesano rallado", "20 hojas de albahaca frescas"] },
  { nombre: "1. POLLO GANSO CON SALSA ESPAÑOLA", link: "https://www.recetasthermomix.cl/?recipe=pollo-ganso-con-salsa-espanola", ingredientes: ["1000 g de pollo ganso (p. ej.: asiento o punta de ganso)", "10 g de mostaza", "30 g de aceite oliva", "150 g de vino blanco", "200 g de zanahorias", "1 cebolla", "½ pimentón rojo ", "1 ramita de apio", "40 g de mantequilla", "1 cucharadita de maicena (opcional)", ""] },
  { nombre: "GUISO DE CARNE A LA JARDINERA", link: "https://www.recetasthermomix.cl/?recipe=guiso-de-carne-a-la-jardinera", ingredientes: ["1 cebolla", "1 zanahoria + 200g", "50 g de aceite de oliva", "20 g de hojas de perejil fresco", "1/2 cucharadita de paprika", "1/2 cucharadita de comino en polvo (opcional)", "500-600 g de posta o asiento", "100 g de vino blanco", "1 cucharada de caldo de verduras", "500 g de papas", "100 g de arvejitas congeladas", "1 cucharada de orégano"] },
  { nombre: "FILETE CON SALSA DE ALCAPARRAS", link: "https://www.recetasthermomix.cl/?recipe=filete-con-salsa-de-alcaparras-2", ingredientes: ["900-1000 g de filete de vacuno sin grasa", "2 cucharadas de mostaza de grano", "10 g de aceite de oliva", "1 ramita de romero fresco", "1 ramita de tomillo fresco", "90 g de aceite de oliva", "30 g de cilantro fresco", "50 g de salsa de soya light o baja en sodio", "50 g de alcaparras drenadas"] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  // desdeaqui repetidas
  { nombre: "NACHOS CON CARNE Y SALSA DE QUESO CHEDDAR", link: "https://www.recetasthermomix.cl/?recipe=nachos-con-carne-y-salsa-de-queso-cheddar", ingredientes: ["120 g de queso cheddar", "100 g de crema de leche", "200 g de tomate en conserva", "300 g de posta negra de vacuno, semicongelada", "80 g de cebolla", "30 g de apio", "10 g de ajo", "70 g de pimentón verde", "30 g de aceite de maravilla", "1 cucharada de paprika", "1 cucharada de orégano", "½ cucharadita de comino", "300 g de tortillas de maíz crocantes (nachos)", "2 cucharadas de cilantro picado fino"] },
  { nombre: "Coliflor gratinada con carne al estilo italiano", link: "https://www.recetasthermomix.cl/?recipe=coliflor-gratinada-con-carne-al-estilo-italiano", ingredientes: ["500 g de ramilletes de coliflor", "30 g de puerro", "2 dientes de ajo", "30 g de aceite de oliva", "600 g de carne picada de ternera", "200 g de tomate maduro", "2 ½ cucharaditas de tomillo seco", "½ cucharadita de albahaca seca", "1 cucharadita de orégano seco", "80 g de tomate concentrado", "60 g de crema de leche", "250 g de mozzarella fresca", "250 g de mozzarella", "1 ramita de tomillo fresco"] },
  { nombre: "ALBÓNDIGAS CON SALSA CREMOSA DE MOSTAZA", link: "https://www.recetasthermomix.cl/?recipe=albondigas-con-salsa-cremosa-de-mostaza", ingredientes: ["500 g de posta negra cortada en cubos de 3 cm, sin nervios ni grasa. O carne molida", "50 g de pan desmenuzado", "50 g de leche", "100 g de cebolla", "½ cucharadita de merquén", "½ cucharada de orégano", "½ cucharadita de paprika", "½ cucharadita de ajo en polvo", "½ cucharadita de perejil seco", "1 huevo", "30 g de aceite", "100 g de crema de leche", "30 g de mostaza Dijon", "10 g de salsa inglesa", "0 g de salsa de soya ligera", "1 cucharada de almidón de maíz", "120 g de caldo de carne o agua", "2 cucharadas de perejil picado fino"] },
  { nombre: "PASTEL DE PAPAS", link: "https://www.recetasthermomix.cl/?recipe=pastel-de-papas", ingredientes: ["400 g de cebolla", "30 g de aceite de oliva", "1 hoja de laurel", "1 cucharadita de ají de color", "500 g de carne molida", "3 huevos duros", "12 unidades de aceitunas sin cuesco", "24 g unidades de pasas rubias (opcional)", "1200 g de papas", "400 g de leche o agua", "50 g de mantequilla", "2-3 cucharadas de azúcar granulada"] },
  { nombre: "ASADO ALEMÁN", link: "https://www.recetasthermomix.cl/?recipe=asado-aleman", ingredientes: ["6 huevos", "120 g de pan rallado", "100 g de leche", "400 g de tocino laminado (opcional)", "30 g de aceite de oliva", "80 g de cebolla", "100 g de  pimentón rojo", "500 g de carne molida fresca", "1/2 cucharadita de perejil deshidratado"] },
  { nombre: "BOEUF BOURGUIGNON", link: "https://www.recetasthermomix.cl/?recipe=boeuf-bourguignon", ingredientes: ["60 g de aceite de oliva", "1000 g de sobrecostilla (vacuno) en trozos de 4-5 cm", "150 g de tocino ahumado (en tiras de 5 mm)", "250 g de cebolla", "2 dientes de ajo", "150 g de zanahorias en rodajas", "250 g de vino tinto", "250 g de caldo de carne", "1 cucharada de tomate concentrado", "2 ramitas de tomillo fresco o bien 1 cucharadita de tomillo seco", "1 hoja de laurel seca", "200 g de champiñones frescos", "200 g de cebollas perla o chalotas"] },
  { nombre: "Cazuela de Vacuno", link: "https://www.recetasthermomix.cl/?recipe=cazuela-de-vacuno", ingredientes: ["½ pimentón rojo", "2 dientes de ajo (opcional)", "1 zanahoria", "1 ramita de apio", "½ cebolla", "40 grs. de aceite de oliva", "200 grs. de verduras surtidas congelada (choclo, arvejas, porotos verdes)", "600 grs. de asado de tira o costillas troceado", "1/2 cdita de orégano", "1 cda de concentrado de caldo de verduras Thermomix o cubo de caldo de verduras (opcional)", "200 grs. de zapallo", "8 papas", "3 cucharadas de arroz", "1 cucharada de perejil picado", "Cilantro para decorar"] },
  { nombre: "FILETE A LA PIMIENTA", link: "https://www.recetasthermomix.cl/?recipe=filete-a-la-pimienta", ingredientes: ["40 g de mezcla de pimientas recién molidas", "1200 g de filetes de res", "225 g de tocino ahumado", "40 g de mantequilla", "40 g de cebolla", "30 g de brandy", "250 g de crema"] },
  { nombre: "GOULASH (ESTOFADO AL ESTILO HÚNGARO)", link: "https://www.recetasthermomix.cl/?recipe=goulash-estofado-al-estilo-hungaro", ingredientes: ["1/2 cucharadita de comino en grano", "3 dientes de ajo (opcional)", "3 ramitas de perejil", "3 ramitas de mejorana", "1 trozo de piel de limón", "450 g de cebolla", "30 g de aceite de oliva", "45-50 g de harina", "1000 g de posta negra (o asiento, o filete)", "10 g de azúcar", "30 g de concentrado de tomate", "2 zanahorias medianas", "10 g de mostaza", "1 cucharada de pimentón dulce o paprika", "1 cucharada de pimentón picante dulce", "2 hojas secas de laurel", "1 cucharada de concentrado de caldo verduras o 1 pastilla de concentrado de carne", "200 g de vino cabernet sauvignon"] },
  { nombre: "CHARQUICAN", link: "https://www.recetasthermomix.cl/?recipe=charquican", ingredientes: ["400 g de carne limpia, sin grasa, cortada en cubos grandes y semicongelada. O molida", "100 g de charqui (opcional)", "25 g de aceite de oliva", "1 cebolla mediana", "1 diente de ajo (opcional)", "1/2 cda. de ají color o paprika", "1/2 cdta. de orégano", "1000 g de verduras (papas, zapallo, zanahorias, pimentón cortados en cubitos y choclo picado y porotitos verdes picados)", "1 cda de concentrado de verduras ó 1 cubo", "cilantro o perejil picado para decorar"] },
  { nombre: "ALBÓNDIGAS CON SALSA DE TOMATE", link: "https://www.recetasthermomix.cl/?recipe=albondigas-con-salsa-de-tomate", ingredientes: ["40 g de pan fresco o duro", "80 g de leche", "6-12 ramitas de perejil fresco", "2 diente de ajo (opcional)", "400 g de carne de vacuno o ternera picada o molida", "2 huevos", "1 cebolla en mitades (50-80 g aprox)", "20 g de aceite de oliva extra virgen", "600 g de tomate triturado en conserva"] },
  { nombre: "PASTEL DE CHOCLO", link: "https://www.recetasthermomix.cl/?recipe=pastel-de-choclo", ingredientes: ["400 g de cebolla ", "40 g de aceite", "1 hoja de laurel", "1 cucharadita de ají de color o paprika", "500 g de carne molida", "3 huevos duros", "12 aceitunas (opcional)", "1000 g de granos de choclo congelado", "6 hojas de albahaca frescas", "100 g de leche líquida", "60 g de azúcar", "merquén a gusto (opcional)"] },
  { nombre: "STROGONOFF", link: "https://www.recetasthermomix.cl/?recipe=strogonoff", ingredientes: ["500 g de posta negra (o asiento, o filete) cortada en tiras de 1 cm", "25-30 g de harina", "3 chalotas", "20 g aceite de oliva", "100 g vino tinto", "1 hoja de laurel", "10 g de mostaza", "10 g de salsa inglesa", "200 g de crema de leche líquida", "200 g de champiñones"] },
  { nombre: "CARBONADA", link: "https://www.recetasthermomix.cl/?recipe=carbonada", ingredientes: ["1 cebolla chica", "¼ de pimentón verde y rojo", "1 zanahoria", "15 gr de aceite de oliva", "1 cdta de ají color", "250-300 gr de carne picada o molida", "500-600 gr de verduras surtidas picadas en cubos (papas, zanahorias, zapallo, arvejitas, choclo, porotitos verdes y lo que sea de su agrado)", "1 cda de concentrado de caldo de verduras Thermomix (o 1 cubo de concentrado de caldo de verduras o carne)", "cilantro o perejil picado para decorar"] },
  { nombre: "SALSA BOLOÑESA", link: "https://www.recetasthermomix.cl/?recipe=salsa-bolonesa", ingredientes: ["30 g de apio", "70 g de zanahoria", "100 g de cebolla", "1 ramita de albahaca fresca (solo las hojas) (opcional)", "50 g de aceite de oliva", "400 g de carne picada mixta", "70 g de vino tinto", "1 cucharada de tomate concentrado (opcional)", "400 g de tomate triturado en conserva", "1 hoja de laurel seca", "1 pizca de nuez moscada molida"] },
  { nombre: "LASAÑA BOLOÑESA CON CHAMPIÑONES", link: "https://www.recetasthermomix.cl/?recipe=lasana-de-bolonesa-con-champinones", ingredientes: ["150 - 200 g de queso (manchego semicurado, emmental, etc.)", "200 g de champiñones frescos", "130 g de zanahorias", "130 g de cebolla", "1 diente de ajo", "1 pimentón verde italiano en trozos o bien 1 trozo de apio", "400 g de tomate triturado en conserva", "50 g de aceite de oliva", "500 g de carne picada mixta", "2 pastillas de caldo de carne", "1 cucharadita de orégano seco", "1 hoja de laurel seca", "800 g de leche", "60 g de mantequilla", "70 g de harina", "¼ de cucharadita de nuez moscada molida", "18 placas de lasaña secas precocidas", "5 - 6 cucharaditas de mantequilla"] },
  { nombre: "CONCHIGLIONI RELLENOS CON BOLOÑESA", link: "https://www.recetasthermomix.cl/?recipe=conchiglioni-rellenos-con-bolonesa", ingredientes: ["100g de cebolla cortada en trozos", "2 dientes de ajo (opcional)", "100 g de zanahoria", "50 g de apio", "200 g de champiñones", "400 g de tomate triturado", "60 g de de aceite de oliva y un poco más para la fuente", "350 g de carne molida", "1 cdta de orégano", "400 g de Conchiglioni (pasta con forma de caracol)", "100 g de queso parmesano rallado", "40 g de mantequilla", "40 g de harina sin polvos","700 g de leche","nuez moscada a gusto"] },
  { nombre: "FILETE MARINADO Y SALSA BEARNESA", link: "https://www.recetasthermomix.cl/?recipe=filete-marinado-y-salsa-bearnesa", ingredientes: ["1000 g de filete de vacuno desgrasado", "2 cucharadas de mostaza de grano", "1/2 cucharita de pimienta negra recién molida", "3 ramitas de romero y/o tomillo, solo las hojas", "50 g de salsa de soya baja en sodio", "50 g de chalotas peladas", "1 ramita de estragón fresco, solo las hojas", "50 g de vino blanco seco", "1 cucharada de vinagre preferentemente de estragón", "200 g de mantequilla en trozos", "4 yemas de huevo"] },
  { nombre: "ESPAGUETTI CON ALBÓNDIGAS", link: "https://www.recetasthermomix.cl/?recipe=espaguetti-con-albondigas", ingredientes: ["300 g de carne molida", "1 huevo", "1 cdita de ajo en polvo", "50 g de pan molido", "30 g de vino blanco (opcional)", "150 g de cebolla blanca, en cuartos", "2 dientes de ajo, pelados", "40 g de aceite vegetal", "1 cdita de paprika", "50 g de vino blanco", "500 g de caldo de res o bien 500 g de agua más 1 cda de concentrado de caldo de res", "500 g de puré de tomate, martajado o triturado", "1 cdita de orégano seco", "1 cdita de azúcar", "300 g de espagueti", "100 g de queso parmesano rallado", "20 hojas de albahaca frescas"] },
  { nombre: "Carne Mongoliana", link: "https://www.recetasthermomix.cl/?recipe=carne-mongoliana", ingredientes: ["30 g de aceite de oliva", "1 trozo de 3 cm de jengibre", "1-2 dientes de ajo (opcional)", "1-2 ají verde (opcional)", "500 g de posta negra o asiento", "100 g de salsa de soya", "1 1/2 cucharadita de maicena", "3 cebollines", "1/2 pimentón rojo"] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "1. POLLO GANSO CON SALSA ESPAÑOLA", link: "https://www.recetasthermomix.cl/?recipe=pollo-ganso-con-salsa-espanola", ingredientes: ["1000 g de pollo ganso (p. ej.: asiento o punta de ganso)", "10 g de mostaza", "30 g de aceite oliva", "150 g de vino blanco", "200 g de zanahorias", "1 cebolla", "½ pimentón rojo ", "1 ramita de apio", "40 g de mantequilla", "1 cucharadita de maicena (opcional)", ""] },
  { nombre: "GUISO DE CARNE A LA JARDINERA", link: "https://www.recetasthermomix.cl/?recipe=guiso-de-carne-a-la-jardinera", ingredientes: ["1 cebolla", "1 zanahoria + 200g", "50 g de aceite de oliva", "20 g de hojas de perejil fresco", "1/2 cucharadita de paprika", "1/2 cucharadita de comino en polvo (opcional)", "500-600 g de posta o asiento", "100 g de vino blanco", "1 cucharada de caldo de verduras", "500 g de papas", "100 g de arvejitas congeladas", "1 cucharada de orégano"] },
  { nombre: "FILETE CON SALSA DE ALCAPARRAS", link: "https://www.recetasthermomix.cl/?recipe=filete-con-salsa-de-alcaparras-2", ingredientes: ["900-1000 g de filete de vacuno sin grasa", "2 cucharadas de mostaza de grano", "10 g de aceite de oliva", "1 ramita de romero fresco", "1 ramita de tomillo fresco", "90 g de aceite de oliva", "30 g de cilantro fresco", "50 g de salsa de soya light o baja en sodio", "50 g de alcaparras drenadas"] },
];

const Legumbre = [
  { nombre: "HUMMUS", link: "https://www.recetasthermomix.cl/?recipe=hummus", ingredientes: ["400 g de garbanzos cocidos", "1 diente de ajo", "30 g de tahini", "65 g de jugo de limón", "½ cucharadita de comino", "85 g de aceite de oliva"] },
  { nombre: "HAMBURGUESAS DE LENTEJAS Y QUINOA", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-lentejas-y-quinoa", ingredientes: ["queso parmesano", "ajo", "cilantro fresco", "queso crema", "crema de leche", "jugo de limón", "quinoa", "aceite de oliva", "cebolla morada", "pimentón rojo", "lentejas cocidas", "pan rallado", "huevo", "comino", "pimienta"] },
  { nombre: "ENSALADA DE GARBANZOS", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-garbanzos", ingredientes: ["20 g de hojas de perejil fresco", "90 g de aceite de oliva", "55 g de vinagre de vino tinto", "¾ cdita de comino en polvo", "350 g de garbanzos", "150 g de pepino", "150 g de tomates cherry", "50 g de cebolla morada", "1 palta"] },
  { nombre: "HAMBURGUESAS DE POROTOS NEGRO Y QUÍNOA", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-porotos-negro-y-quinoa", ingredientes: ["100 g cebolla", "80 g de zanahoria", "50 g de apio", "2 diente de ajo", "20 g de aceite de maravilla", "100 g de quínoa", "450 g de porotos negros cocidos", "1½ cucharada de perejil picado fino"] },
  { nombre: "Ensalada de quinoa roja y garbanzos", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-quinoa-roja", ingredientes: ["200 g de quinoa roja", "200 g de garbanzos cocidos", "100 g de rúcula o bien espinaca baby", "1 pimentón rojo", "150 g de aceitunas negras", "2 - 3 dientes de ajo (opcional)", "½ cucharadita de tomillo seco", "4 ramitas de albahaca fresca (solo las hojas)", "20 g de vinagre balsámico", "60 g de aceite de oliva"] },
  { nombre: "HAMBURGUESAS DE LENTEJAS", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-lentejas-diana-palazon", ingredientes: ["100g cebollin", "80g papas", "80g zanahoria", "60g aceite de oliva", "160g arroz integral cocido", "400g lentejas cocidas", "50g copos de avena", "1cda perejil fresco", "2cdas curry", "1cda harina de arroz"] },
  { nombre: "CURRY DE GARBANZOS Y VERDURAS", link: "https://www.recetasthermomix.cl/?recipe=curry-de-garbanzos-y-verduras", ingredientes: ["40 g de aceite de coco o bien 40 g de aceite de oliva", "100 g de cebolla", "1 cucharada de curry en polvo", "1 pizca de azafrán molido", "1 pizca de jengibre molido", "1 cucharadita de pimentón dulce en polvo", "1 pizca de nuez moscada molida", "120 g de tomate", "250 g zapallito italiano", "200 g de pimentón rojo", "150 g de ramilletes de brócoli", "200 g de leche de coco", "270 g de garbanzos cocidos", "50 g de espinacas baby fresca", "cilantro fresco"] },
  { nombre: "DIP DE POROTOS NEGROS ESTILO TEXMEX", link: "https://www.recetasthermomix.cl/?recipe=dip-de-porotos-negros-estilo-texmex", ingredientes: ["400 g de porotos negros cocidos", "20 g de cebolla", "15 g de cilantro", "2 cucharaditas de tabasco de chipotle", "60 g de tomate", "45 g aceite de maravilla", "30 g de jugo de limón", "1 diente de ajo", "1 cucharada de cebolla morada"] },
  { nombre: "HAMBURGUESAS DE BETARRAGA Y POROTOS", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-betarraga-y-porotos", ingredientes: ["180 g de betarraga", "80 g de cebolla", "50 g de zanahoria", "70 g de apio", "2 dientes ajo (opcional)", "30 g de aceite de oliva", "250 g de porotos negros cocidos", "55 g de pan rallado"] },
  { nombre: "Falafel de garbanzos", link: "https://www.recetasthermomix.cl/?recipe=falafel-de-garbanzos", ingredientes: ["300 g de garbanzos secos", "3 dientes de ajo", "150 g de cebolla", "10 ramitas de perejil fresco (solo las hojas) o bien 10 ramitas de cilantro fresco (solo las hojas)", "1 cucharadita de comino molido", "30 g de pan rallado", "300 g de aceite"] },
  { nombre: "POROTOS NEGROS A LA CUBANA", link: "https://www.recetasthermomix.cl/?recipe=porotos-negros-a-la-cubana", ingredientes: ["350 g de porotos negros cocidos", "2 tomates grandes", "40 g de aceite de oliva", "1 cebolla mediana"] },
  { nombre: "1. Lentejas guisadas", link: "https://www.recetasthermomix.cl/?recipe=lentejas-guisadas-2", ingredientes: ["150 g de cebolla en cuartos", "100 g de pimentón rojo en trozos o bien 100 g de pimentón verde en trozos", "2 dientes de ajo", "1 zanahoria (aprox. 60 g) en trozos", "50 g de aceite de oliva", "1 cucharadita de pimentón o paprika", "80 g de chorizo en rodajas", "100 g de jamón serrano en dados o bien 100 g de dados de tocino", "800 g de lentejas cocidas (en conserva), lavadas y escurridas", "1 hoja de laurel seca", "1 cucharadita de sal o bien 1 pastilla de caldo de verduras", ""] },
  { nombre: "Ensaladilla de garbanzos y palta", link: "https://www.recetasthermomix.cl/?recipe=ensaladilla-de-garbanzos-y-palta", ingredientes: ["1000 g de papas", "2 paltas", "200 - 300 g de mayonesa", "6 huevos", "400 g de garbanzos cocidos", "2 cebollín", "280 g de choclo en conserva", "150 g de aceitunas negras sin hueso (1 lata)", "6 - 8 pimientos en conserva escurridos"] },
  { nombre: "FALAFEL", link: "https://www.recetasthermomix.cl/?recipe=falafel", ingredientes: ["400 g de garbanzos secos", "1/2 cebolla morada", "1 o 2 dientes de ajo", "2 o 3 ramitas de perejil fresco ", "1/2 cucharadita de comino molido", "1/2 cucharadita de curry", "1/2 cucharadita de polvos de hornear", "500 g de aceite para freír"] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "HAMBURGUESAS DE LENTEJAS Y QUINOA", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-lentejas-y-quinoa", ingredientes: ["queso parmesano", "ajo", "cilantro fresco", "queso crema", "crema de leche", "jugo de limón", "quinoa", "aceite de oliva", "cebolla morada", "pimentón rojo", "lentejas cocidas", "pan rallado", "huevo", "comino", "pimienta"] },
  { nombre: "ENSALADA DE GARBANZOS", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-garbanzos", ingredientes: ["20 g de hojas de perejil fresco", "90 g de aceite de oliva", "55 g de vinagre de vino tinto", "¾ cdita de comino en polvo", "350 g de garbanzos", "150 g de pepino", "150 g de tomates cherry", "50 g de cebolla morada", "1 palta"] },
  { nombre: "HAMBURGUESAS DE POROTOS NEGRO Y QUÍNOA", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-porotos-negro-y-quinoa", ingredientes: ["100 g cebolla", "80 g de zanahoria", "50 g de apio", "2 diente de ajo", "20 g de aceite de maravilla", "100 g de quínoa", "450 g de porotos negros cocidos", "1½ cucharada de perejil picado fino"] },
  { nombre: "Ensalada de quinoa roja y garbanzos", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-quinoa-roja", ingredientes: ["200 g de quinoa roja", "200 g de garbanzos cocidos", "100 g de rúcula o bien espinaca baby", "1 pimentón rojo", "150 g de aceitunas negras", "2 - 3 dientes de ajo (opcional)", "½ cucharadita de tomillo seco", "4 ramitas de albahaca fresca (solo las hojas)", "20 g de vinagre balsámico", "60 g de aceite de oliva"] },
  { nombre: "HAMBURGUESAS DE LENTEJAS", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-lentejas-diana-palazon", ingredientes: ["100g cebollin", "80g papas", "80g zanahoria", "60g aceite de oliva", "160g arroz integral cocido", "400g lentejas cocidas", "50g copos de avena", "1cda perejil fresco", "2cdas curry", "1cda harina de arroz"] },
  { nombre: "CURRY DE GARBANZOS Y VERDURAS", link: "https://www.recetasthermomix.cl/?recipe=curry-de-garbanzos-y-verduras", ingredientes: ["40 g de aceite de coco o bien 40 g de aceite de oliva", "100 g de cebolla", "1 cucharada de curry en polvo", "1 pizca de azafrán molido", "1 pizca de jengibre molido", "1 cucharadita de pimentón dulce en polvo", "1 pizca de nuez moscada molida", "120 g de tomate", "250 g zapallito italiano", "200 g de pimentón rojo", "150 g de ramilletes de brócoli", "200 g de leche de coco", "270 g de garbanzos cocidos", "50 g de espinacas baby fresca", "cilantro fresco"] },
  { nombre: "HUMMUS", link: "https://www.recetasthermomix.cl/?recipe=hummus", ingredientes: ["400 g de garbanzos cocidos", "1 diente de ajo", "30 g de tahini", "65 g de jugo de limón", "½ cucharadita de comino", "85 g de aceite de oliva"] },
  { nombre: "HAMBURGUESAS DE BETARRAGA Y POROTOS", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-betarraga-y-porotos", ingredientes: ["180 g de betarraga", "80 g de cebolla", "50 g de zanahoria", "70 g de apio", "2 dientes ajo (opcional)", "30 g de aceite de oliva", "250 g de porotos negros cocidos", "55 g de pan rallado"] },
  { nombre: "Falafel de garbanzos", link: "https://www.recetasthermomix.cl/?recipe=falafel-de-garbanzos", ingredientes: ["300 g de garbanzos secos", "3 dientes de ajo", "150 g de cebolla", "10 ramitas de perejil fresco (solo las hojas) o bien 10 ramitas de cilantro fresco (solo las hojas)", "1 cucharadita de comino molido", "30 g de pan rallado", "300 g de aceite"] },
  { nombre: "POROTOS NEGROS A LA CUBANA", link: "https://www.recetasthermomix.cl/?recipe=porotos-negros-a-la-cubana", ingredientes: ["350 g de porotos negros cocidos", "2 tomates grandes", "40 g de aceite de oliva", "1 cebolla mediana"] },
  { nombre: "1. Lentejas guisadas", link: "https://www.recetasthermomix.cl/?recipe=lentejas-guisadas-2", ingredientes: ["150 g de cebolla en cuartos", "100 g de pimentón rojo en trozos o bien 100 g de pimentón verde en trozos", "2 dientes de ajo", "1 zanahoria (aprox. 60 g) en trozos", "50 g de aceite de oliva", "1 cucharadita de pimentón o paprika", "80 g de chorizo en rodajas", "100 g de jamón serrano en dados o bien 100 g de dados de tocino", "800 g de lentejas cocidas (en conserva), lavadas y escurridas", "1 hoja de laurel seca", "1 cucharadita de sal o bien 1 pastilla de caldo de verduras", ""] },
  { nombre: "Ensaladilla de garbanzos y palta", link: "https://www.recetasthermomix.cl/?recipe=ensaladilla-de-garbanzos-y-palta", ingredientes: ["1000 g de papas", "2 paltas", "200 - 300 g de mayonesa", "6 huevos", "400 g de garbanzos cocidos", "2 cebollín", "280 g de choclo en conserva", "150 g de aceitunas negras sin hueso (1 lata)", "6 - 8 pimientos en conserva escurridos"] },
  { nombre: "FALAFEL", link: "https://www.recetasthermomix.cl/?recipe=falafel", ingredientes: ["400 g de garbanzos secos", "1/2 cebolla morada", "1 o 2 dientes de ajo", "2 o 3 ramitas de perejil fresco ", "1/2 cucharadita de comino molido", "1/2 cucharadita de curry", "1/2 cucharadita de polvos de hornear", "500 g de aceite para freír"] },
  { nombre: "DIP DE POROTOS NEGROS ESTILO TEXMEX", link: "https://www.recetasthermomix.cl/?recipe=dip-de-porotos-negros-estilo-texmex", ingredientes: ["400 g de porotos negros cocidos", "20 g de cebolla", "15 g de cilantro", "2 cucharaditas de tabasco de chipotle", "60 g de tomate", "45 g aceite de maravilla", "30 g de jugo de limón", "1 diente de ajo", "1 cucharada de cebolla morada"] },
];

const Pescado = [
  { nombre: "RISOTTO AL AZAFRÁN Y SALMÓN AL VAPOR", link: "https://www.recetasthermomix.cl/?recipe=risotto-al-azafran-y-salmon-al-vapor", ingredientes: ["40 g de queso parmesano", "3 unidad de chalota", "20 g de mantequilla", "40 g de aceite de oliva", "1 g de azafrán", "320 g de arroz (para risotto ej. Arbóreo)", "60 g de vino blanco", "400 g de salmón cortado en trozos", "1 cdta de concentrado de caldo de verduras", "1 limón (su jugo)", "hojas frescas de perejil para decorar"] },
  { nombre: "ENSALADA NÓRDICA DE ARROZ Y SALMÓN CON ALIÑO DE ENELDO (salmón)", link: "https://www.recetasthermomix.cl/?recipe=ensalada-nordica-de-arroz-y-salmon-con-alino-de-eneldo", ingredientes: ["140 g de aceite de oliva", "2 cucharadas de azúcar rubia", "2 cucharadas de vinagre", "2 cucharadas de mostaza de Dijon", "1 ramillete de eneldo fresco picado o eneldo seco", "300 g de arroz de grano largo", "200 g de salmón ahumado cortado en láminas", "1 palta grande"] },
  { nombre: "ENSALADA SICILIANA CON CAMARONES", link: "https://www.recetasthermomix.cl/?recipe=ensalada-siciliana-con-camarones", ingredientes: ["200 g de cebolla morada", "30-40 g de vino tinto", "10 g de perejil fresco", "50 g de aceite de oliva", "40 g de jugo de limón", "500 g de camarones calibre 36-40 si piel y desvenados (aprox. 1 kg de camarones sin pelar)", "1-2 láminas de limón sutil (2-3 mm) o 1 limón en láminas (2-3 mm)", "200 g de hinojo", "400 g de tomates cherry"] },
  { nombre: "ARROZ CON BRÓCOLI, ATÚN Y PALTA", link: "https://www.recetasthermomix.cl/?recipe=arroz-con-brocoli-atun-y-palta", ingredientes: ["350 g de arroz de grano largo", "300 g de ramilletes de brócoli", "2 paltas maduras", "2 latas de atún en aceite de oliva de 80 g"] },
  { nombre: "REINETA CON ACEITUNAS Y ALCAPARRAS", link: "https://www.recetasthermomix.cl/?recipe=reineta-con-aceitunas-y-alcaparras", ingredientes: ["30 g de aceitunas negra sin carozo", "10 g de alcaparras", "2 tomates maduros", "1 cebolla", "2 – 3 ramitas de perejil (sólo las hojas)", "50 g de aceite de oliva", "30 g de vino blanco", "10 g de jugo de limón", "2 filetes de Reineta", "ralladura de limón a gusto"] },
  { nombre: "SALMÓN A LA NARANJA CON CUSCÚS DE BRÓCOLI", link: "https://www.recetasthermomix.cl/?recipe=salmon-a-la-naranja-con-cuscus-de-brocoli", ingredientes: ["1 cucharadita de pasta de jengibre (ver receta) o 1 cm de jengibre fresco ", "1 naranja", "40 g de salsa de soya light", "300 g de ramilletes de brócoli", "10 g de mantequilla", "40 g de aceite de oliva", "1 cucharadita de ají de color o paprika", "320 g de arroz integral con semillas"] },
  { nombre: "CURRY ROJO DE CAMARONES", link: "https://www.recetasthermomix.cl/?recipe=curry-rojo-de-camarones", ingredientes: ["5 cebollines", "1/2 ají verde", "1 cm de jengibre", "40 g de aceite de maravilla", "½ taza de tomates en tarro", "1 cdta de pasta de Curry Rojo tailandés", "1 cdta de ralladura de limón", "3 cdas de hojas frescas de cilantro", "500 g de leche de coco", "1 cda de salsa de pescado", "1 cda de maicena", "2 cdas de hojas frescas de albahaca", "500 g de camarones ecuatorianos crudos, pelados y sin vena"] },
  { nombre: "REINETA EN PAPILLOTE CON ESPÁRRAGOS", link: "https://www.recetasthermomix.cl/?recipe=reineta-en-papillote-con-esparragos", ingredientes: ["8 espárragos verdes", "1 cebollas moradas", "4 filetes de reineta (de aprox. 170 g)", "80 g de mantequilla", "2 ramitas de oregano fresco", "4 tomates cherry"] },
  { nombre: "Pad thai de langostinos", link: "https://www.recetasthermomix.cl/?recipe=pad-thai-de-camarones", ingredientes: ["50 g de maní tostados o fritos sin sal", "200 g de fideos orientales de arroz (tipo tallarín M)", "60 g de chalotas en mitades", "6 dientes de ajo", "30 g de azúcar", "45 g de salsa de pescado", "30 g de salsa de soja", "30 g de pulpa de tamarindo o bien 4 - 6 ciruelas pasas sin hueso", "1 - 4 pizcas de chile seco desmenuzado tostado", "3 cucharadas de aceite de oliva", "400 g de langostinos crudos sin pelar", "2 huevos", "100 g de tofu firme en dados (1,5 cm) o bien 100 g de queso fresco en dados (1,5 cm)", "3 - 4 cebollín rectos en trozos (4 cm) o bien 5 - 6 ajetes en trozos (4 cm)", "200 g de brotes de soja frescos", "1 cucharada de cilantro fresco picado", "1 - 2 limones en gajos", "salsa tailandesa de chiles o bien de chile seco desmenuzado tostado"] },
  { nombre: "SALMÓN AL VAPOR CON VERDURAS", link: "https://www.recetasthermomix.cl/?recipe=salmon-al-vapor-con-verduras", ingredientes: ["300 g de papas", "100 g de zanahoria", "100 g de pimentón rojo", "100 g de ramilletes de brócoli", "3 hojas de lechuga", "2 rodajas de salmón fresco (aprox. 500 g en total)", "1 limón cortado en rodajas", "1 ramita de eneldo fresco"] },
  { nombre: "CURRY VERDE DE CAMARONES (RECETA TAILANDESA)", link: "https://www.recetasthermomix.cl/?recipe=curry-verde-de-pollo-o-camarones-receta-tailandesa", ingredientes: ["100 g de mani", "200 g de cebolla", "30 g de aceite maravilla", "40 g de pasta verde de curry", "400 g de leche de coco", "500 g de camarones frescosmpelados y limpios", "100 g de arvejitas", "6 hojas de lima kefir (se puede sustituir por hojas de limón no tratadas)", "1 cucharada de salsa de pescado (o caldo concentrado)", "1 cucharada de jugo de limón", "1 cucharadita de ralladura de piel de limón", "10 g de azúcar rubia", "hojas de cilantro para servir"] },
  { nombre: "SALMÓN Y ARROZ BASMATI CON SALSA CREMA DE ENELDO", link: "https://www.recetasthermomix.cl/?recipe=salmon-y-arroz-basmati-con-salsa-crema-de-eneldo", ingredientes: ["20 g de aceite de oliva", "250 g de arroz basmati", "4 lomos de salmón fresco sin piel ni espinas (125 g c/u)", "60 g de cebolla", "1 diente de ajo", "10 g de mantequilla", "400 g de crema de leche (35% de grasa)", "pastilla de caldo de verduras desmenuzada", "1 ½ cucharadas de tomate concentrado", "2 ramitas de eneldo fresco (solo las hojas) o bien 1 cucharadita de eneldo seco", "1 - 2 pellizcos de merquén (opcional)", "1 cucharadita de maicena"] },
  { nombre: "FETUCCINI CON SALSA ALFREDO Y CAMARONES", link: "https://www.recetasthermomix.cl/?recipe=fetuccini-con-salsa-alfredo-y-camarones", ingredientes: ["130 g de queso parmesano", "500 g de camarones grandes, crudos y pelados", "220 g fetuccine (pasta larga seca)", "30 g de mantequilla", "190 g de queso crema", "1 diente de ajo", "500 g de leche", "30 g de vino blanco", "5 g concentrado de caldo de pollo"] },
  { nombre: "ENSALADA DE ARROZ CON HUEVOS Y ATÚN", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-arroz-con-huevos-y-atun", ingredientes: ["250 g de arroz de grano largo", "2 huevos", "120 g de zanahoria", "280 g de zapallo italiano", "100 g de arvejas congeladas", "200 g de atún en aceite", "15 - 20 g de pepinillos en vinagre", "1 ramita de menta fresca", "1 - 2 cucharadas de vinagre (opcional) o bien 1 - 2 cucharadas de jugo de limón (opcional)", "7 tomates cherry"] },
  { nombre: "ENSALADA DE PASTA Y VEGETALES CON LANGOSTINOS", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-pasta-y-vegetales-con-langostinos", ingredientes: ["300 g de vino blanco", "200 g de jugo de naranja", "200 g de arvejas congelados", "300 g de langostinos cocidos", "70 g de aceite de oliva", "300 g de pasta corta seca", "50 - 60 g de aceitunas negras sin hueso", "30 g de alcaparras", "250 g de tomates cherry", "30 g de jugo de limón", "20 g de salsa de soya"] },
  { nombre: "REINETA EN PAPILLOTE CON ESPÁRRAGOS", link: "https://www.recetasthermomix.cl/?recipe=reineta-en-papillote-con-esparragos", ingredientes: ["8 espárragos verdes", "1 cebollas morada", "4 filetes de reineta (de aprox. 170 g)", "80 g de mantequilla", "2 ramitas de oregano fresco picado", "4 tomates cherry"] },
  { nombre: "PAPILLOTE DE PESCADO ESTILO MARROQUÍ", link: "https://www.recetasthermomix.cl/?recipe=papillote-de-pescado-estilo-marroqui", ingredientes: ["5 g hojas de perejil", "5 g cilantro hojas y tallos", "60 g de aceite de oliva", "½ cucharada de paprika", "1 pellizco de azafrán", "1 cubo de jengibre de 1x1cm", "60 g naranja jugo", "600 g de filete de pescado blanco en 4 porciones (150 g cada una aprox.)", "160 g de cebolla en pluma", "200 g tomate cherry"] },
  { nombre: "RISOTTO DE CAMARÓN CON LECHE DE COCO", link: "https://www.recetasthermomix.cl/?recipe=risotto-de-camaron-con-leche-de-coco", ingredientes: ["30 g de queso parmesano", "2 dientes de ajo (opcional)", "1 trozo de ají amarillo", "5 g de hojas de cilantro frescas", "40 g de mantequilla", "200 g de camarones limpios", "80 g de cebolla o chalota", "25 g de aceite de oliva", "300 g de arroz arbóreo", "300 g de leche de coco", "100 g de vino blanco"] },
  { nombre: "CANCATO DE REINETA Y ENSALADA DE PAPAS CON LACTONESA DE MERQUÉN", link: "https://www.recetasthermomix.cl/?recipe=cancato-de-reineta-y-ensalada-de-papas-con-lactonesa-de-merquen", ingredientes: ["300 g de cebolla", "20 g de mantequilla", "30 g de tomates deshidratados", "120 g de chorizo", "500 g de filetes de reineta", "4 láminas de queso mantecoso", "500 g de papas", "100 g de leche", "5 g de mostaza de Dijon", "hojas de cilantro o perejil, picado (armado)"] },
  { nombre: "TRUCHA SALMONADA AL VAPOR DE CILANTRO, ESPÁRRAGOS Y ESPUMA DE JENGIBRE", link: "https://www.recetasthermomix.cl/?recipe=trucha-salmonada-al-vapor-de-cilantro-esparragos-y-espuma-de-jengibre", ingredientes: ["3 yemas de huevo", "50 g de salsa de soya", "50 g de vinagre blanco", "10 g de jengibre rallado", "180 g de mantequilla sin sal", "hojas de eneldo frescas", "20 g de semilla de cilantro", "20 unidades de espárragos verdes", "6 piezas de trucha salmonada de 130 g cada uno"] },
  { nombre: "CORVINA CON PAPAS Y TOMATES AL GRATÍN", link: "https://www.recetasthermomix.cl/?recipe=corvina-con-papas-y-tomates-al-gratin", ingredientes: ["100 g de cebolla", "2 dientes de ajo", "150 g de aceite de oliva", "600 g de papas", "60 g de mantequilla", "300 g de tomates maduros", "100 g de pimentón rojo", "6 filetes de corvina", "100-150 g de vino blanco seco"] },
  { nombre: "CHUPE O PASTEL DE JAIBA", link: "https://www.recetasthermomix.cl/?recipe=chupe-o-pastel-de-jaiba", ingredientes: ["5 g de mantequilla", "60 g de queso parmesano", "90 g de pan blanco en trozos (puede ser añejo o fresco y cuanta más miga, mejor)", "360 g de leche líquida", "150 g de cebolla cortada en dos (1 unidad aprox.)", "50 g de aceite de oliva", "150 g de vino blanco", "300 g de carne de jaiba descongelada y desmenuzada (bien escurrida)", "1 pizca de nuez moscada", "1 cucharada de ciboulette picado", "30 g de crema de leche líquida", "6 pinzas de jaibas"] },
  { nombre: "SALMÓN AL VAPOR CON PAPAS", link: "https://www.recetasthermomix.cl/?recipe=salmon-al-vapor-con-papas", ingredientes: ["300-400 g de papas con cascara", "50 g de aceite de oliva", "1000 g de salmón cortado en filetes de 200-250 g c/u", "1 limón en rodajas", "1 ramita de eneldo para decorar"] },
  { nombre: "1. REINETA AL VAPOR CON SALSA DE PUERRO Y AZAFRÁN", link: "https://www.recetasthermomix.cl/?recipe=reineta-al-vapor-con-salsa-de-puerro-y-azafran", ingredientes: ["100 g de puerro", "20 g de mantequilla", "1 pellizco de hebras de azafrán", "50 g de vino blanco seco", "400 g de caldo de pollo", "1 cucharadita de maicena", "200 g de zapallito italiano", "150 g de ramilletes de brócoli", "1 cucharada de aceite", "800 g de filetes de reineta", "100 g de yogur natural sin azúcar"] },
  { nombre: "CHOP SUEY DE GAMBAS", link: "https://www.recetasthermomix.cl/?recipe=chop-suey-de-gambas", ingredientes: ["60 g de setas shiitake secas", "12 gambones frescos pelados", "1 cucharada de maicena", "20 g de raíz de jengibre fresca", "1 diente de ajo", "200 g de pimiento verde", "200 g de pimiento rojo", "200 g de cebolla", "200 g de ramilletes de brócoli", "30 g de salsa de soya", "40 g de aceite de girasol", "100 g de dientes de dragón", "2 cucharadas de manís fritos salados (opcional)"] },
  { nombre: "CHAMPIÑONES RELLENOS DE VERDURA Y GAMBAS", link: "https://www.recetasthermomix.cl/?recipe=champinones-rellenos-de-verdura-y-gamba", ingredientes: ["8 champiñones grandes", "100 g de zapallito italiano", "1 diente de ajo", "50 g de cebolla", "30 g de pimentón rojo", "30 g de pimentón verde", "30 g de zanahoria", "1 ramita de perejil fresco", "30 g de aceite de oliva", "100 g de gambas crudas peladas", "1 cucharadita de maicena"] },
  { nombre: "CALDILLO DE CONGRIO", link: "https://www.recetasthermomix.cl/?recipe=caldillo-de-congrio-2", ingredientes: ["1 cabeza de congrio sin ojos o 2 pastillas de caldo de pescado", "100 g de cebolla cortada en cuatro", "90 g de zanahoria cortada en cuatro", "3 ramitas de perejil fresco", "1 ramita de apio", "1 hoja de laurel", "1 ramita de tomillo", "500 g de vino blanco seco", "6 filetes de congrio sin piel y sin espinas (120 g c/u aprox.)", "20 g de aceite de oliva", "3 cucharadas de jugo de limón", "30 g de aceite de oliva", "180 g de cebolla blanca cortada en pluma (1 unidad aprox.)", "2 dientes de ajo cortados en dos", "150-200 g de tomates en conserva", "1 cucharadita de ají de color o paprika", "360-400 g de papas (6 unidades aprox.)", "2 ramitas de culantro o perejil fresco, solo las hojas"] },
  // desde aqui repetido
  { nombre: "REINETA EN PAPILLOTE CON ESPÁRRAGOS", link: "https://www.recetasthermomix.cl/?recipe=reineta-en-papillote-con-esparragos", ingredientes: ["8 espárragos verdes", "1 cebollas moradas", "4 filetes de reineta (de aprox. 170 g)", "80 g de mantequilla", "2 ramitas de oregano fresco", "4 tomates cherry"] },
  { nombre: "ENSALADA NÓRDICA DE ARROZ Y SALMÓN CON ALIÑO DE ENELDO (salmón)", link: "https://www.recetasthermomix.cl/?recipe=ensalada-nordica-de-arroz-y-salmon-con-alino-de-eneldo", ingredientes: ["140 g de aceite de oliva", "2 cucharadas de azúcar rubia", "2 cucharadas de vinagre", "2 cucharadas de mostaza de Dijon", "1 ramillete de eneldo fresco picado o eneldo seco", "300 g de arroz de grano largo", "200 g de salmón ahumado cortado en láminas", "1 palta grande"] },
  { nombre: "ENSALADA SICILIANA CON CAMARONES", link: "https://www.recetasthermomix.cl/?recipe=ensalada-siciliana-con-camarones", ingredientes: ["200 g de cebolla morada", "30-40 g de vino tinto", "10 g de perejil fresco", "50 g de aceite de oliva", "40 g de jugo de limón", "500 g de camarones calibre 36-40 si piel y desvenados (aprox. 1 kg de camarones sin pelar)", "1-2 láminas de limón sutil (2-3 mm) o 1 limón en láminas (2-3 mm)", "200 g de hinojo", "400 g de tomates cherry"] },
  { nombre: "ARROZ CON BRÓCOLI, ATÚN Y PALTA", link: "https://www.recetasthermomix.cl/?recipe=arroz-con-brocoli-atun-y-palta", ingredientes: ["350 g de arroz de grano largo", "300 g de ramilletes de brócoli", "2 paltas maduras", "2 latas de atún en aceite de oliva de 80 g"] },
  { nombre: "REINETA CON ACEITUNAS Y ALCAPARRAS", link: "https://www.recetasthermomix.cl/?recipe=reineta-con-aceitunas-y-alcaparras", ingredientes: ["30 g de aceitunas negra sin carozo", "10 g de alcaparras", "2 tomates maduros", "1 cebolla", "2 – 3 ramitas de perejil (sólo las hojas)", "50 g de aceite de oliva", "30 g de vino blanco", "10 g de jugo de limón", "2 filetes de Reineta", "ralladura de limón a gusto"] },
  { nombre: "SALMÓN A LA NARANJA CON CUSCÚS DE BRÓCOLI", link: "https://www.recetasthermomix.cl/?recipe=salmon-a-la-naranja-con-cuscus-de-brocoli", ingredientes: ["1 cucharadita de pasta de jengibre (ver receta) o 1 cm de jengibre fresco ", "1 naranja", "40 g de salsa de soya light", "300 g de ramilletes de brócoli", "10 g de mantequilla", "40 g de aceite de oliva", "1 cucharadita de ají de color o paprika", "320 g de arroz integral con semillas"] },
  { nombre: "CURRY ROJO DE CAMARONES", link: "https://www.recetasthermomix.cl/?recipe=curry-rojo-de-camarones", ingredientes: ["5 cebollines", "1/2 ají verde", "1 cm de jengibre", "40 g de aceite de maravilla", "½ taza de tomates en tarro", "1 cdta de pasta de Curry Rojo tailandés", "1 cdta de ralladura de limón", "3 cdas de hojas frescas de cilantro", "500 g de leche de coco", "1 cda de salsa de pescado", "1 cda de maicena", "2 cdas de hojas frescas de albahaca", "500 g de camarones ecuatorianos crudos, pelados y sin vena"] },
  { nombre: "RISOTTO AL AZAFRÁN Y SALMÓN AL VAPOR", link: "https://www.recetasthermomix.cl/?recipe=risotto-al-azafran-y-salmon-al-vapor", ingredientes: ["40 g de queso parmesano", "3 unidad de chalota", "20 g de mantequilla", "40 g de aceite de oliva", "1 g de azafrán", "320 g de arroz (para risotto ej. Arbóreo)", "60 g de vino blanco", "400 g de salmón cortado en trozos", "1 cdta de concentrado de caldo de verduras", "1 limón (su jugo)", "hojas frescas de perejil para decorar"] },
  { nombre: "Pad thai de langostinos", link: "https://www.recetasthermomix.cl/?recipe=pad-thai-de-camarones", ingredientes: ["50 g de maní tostados o fritos sin sal", "200 g de fideos orientales de arroz (tipo tallarín M)", "60 g de chalotas en mitades", "6 dientes de ajo", "30 g de azúcar", "45 g de salsa de pescado", "30 g de salsa de soja", "30 g de pulpa de tamarindo o bien 4 - 6 ciruelas pasas sin hueso", "1 - 4 pizcas de chile seco desmenuzado tostado", "3 cucharadas de aceite de oliva", "400 g de langostinos crudos sin pelar", "2 huevos", "100 g de tofu firme en dados (1,5 cm) o bien 100 g de queso fresco en dados (1,5 cm)", "3 - 4 cebollín rectos en trozos (4 cm) o bien 5 - 6 ajetes en trozos (4 cm)", "200 g de brotes de soja frescos", "1 cucharada de cilantro fresco picado", "1 - 2 limones en gajos", "salsa tailandesa de chiles o bien de chile seco desmenuzado tostado"] },
  { nombre: "SALMÓN AL VAPOR CON VERDURAS", link: "https://www.recetasthermomix.cl/?recipe=salmon-al-vapor-con-verduras", ingredientes: ["300 g de papas", "100 g de zanahoria", "100 g de pimentón rojo", "100 g de ramilletes de brócoli", "3 hojas de lechuga", "2 rodajas de salmón fresco (aprox. 500 g en total)", "1 limón cortado en rodajas", "1 ramita de eneldo fresco"] },
  { nombre: "CURRY VERDE DE CAMARONES (RECETA TAILANDESA)", link: "https://www.recetasthermomix.cl/?recipe=curry-verde-de-pollo-o-camarones-receta-tailandesa", ingredientes: ["100 g de mani", "200 g de cebolla", "30 g de aceite maravilla", "40 g de pasta verde de curry", "400 g de leche de coco", "500 g de camarones frescosmpelados y limpios", "100 g de arvejitas", "6 hojas de lima kefir (se puede sustituir por hojas de limón no tratadas)", "1 cucharada de salsa de pescado (o caldo concentrado)", "1 cucharada de jugo de limón", "1 cucharadita de ralladura de piel de limón", "10 g de azúcar rubia", "hojas de cilantro para servir"] },
  { nombre: "SALMÓN Y ARROZ BASMATI CON SALSA CREMA DE ENELDO", link: "https://www.recetasthermomix.cl/?recipe=salmon-y-arroz-basmati-con-salsa-crema-de-eneldo", ingredientes: ["20 g de aceite de oliva", "250 g de arroz basmati", "4 lomos de salmón fresco sin piel ni espinas (125 g c/u)", "60 g de cebolla", "1 diente de ajo", "10 g de mantequilla", "400 g de crema de leche (35% de grasa)", "pastilla de caldo de verduras desmenuzada", "1 ½ cucharadas de tomate concentrado", "2 ramitas de eneldo fresco (solo las hojas) o bien 1 cucharadita de eneldo seco", "1 - 2 pellizcos de merquén (opcional)", "1 cucharadita de maicena"] },
  { nombre: "FETUCCINI CON SALSA ALFREDO Y CAMARONES", link: "https://www.recetasthermomix.cl/?recipe=fetuccini-con-salsa-alfredo-y-camarones", ingredientes: ["130 g de queso parmesano", "500 g de camarones grandes, crudos y pelados", "220 g fetuccine (pasta larga seca)", "30 g de mantequilla", "190 g de queso crema", "1 diente de ajo", "500 g de leche", "30 g de vino blanco", "5 g concentrado de caldo de pollo"] },
  { nombre: "ENSALADA DE ARROZ CON HUEVOS Y ATÚN", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-arroz-con-huevos-y-atun", ingredientes: ["250 g de arroz de grano largo", "2 huevos", "120 g de zanahoria", "280 g de zapallo italiano", "100 g de arvejas congeladas", "200 g de atún en aceite", "15 - 20 g de pepinillos en vinagre", "1 ramita de menta fresca", "1 - 2 cucharadas de vinagre (opcional) o bien 1 - 2 cucharadas de jugo de limón (opcional)", "7 tomates cherry"] },
  { nombre: "ENSALADA DE PASTA Y VEGETALES CON LANGOSTINOS", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-pasta-y-vegetales-con-langostinos", ingredientes: ["300 g de vino blanco", "200 g de jugo de naranja", "200 g de arvejas congelados", "300 g de langostinos cocidos", "70 g de aceite de oliva", "300 g de pasta corta seca", "50 - 60 g de aceitunas negras sin hueso", "30 g de alcaparras", "250 g de tomates cherry", "30 g de jugo de limón", "20 g de salsa de soya"] },
  { nombre: "PAPILLOTE DE PESCADO ESTILO MARROQUÍ", link: "https://www.recetasthermomix.cl/?recipe=papillote-de-pescado-estilo-marroqui", ingredientes: ["5 g hojas de perejil", "5 g cilantro hojas y tallos", "60 g de aceite de oliva", "½ cucharada de paprika", "1 pellizco de azafrán", "1 cubo de jengibre de 1x1cm", "60 g naranja jugo", "600 g de filete de pescado blanco en 4 porciones (150 g cada una aprox.)", "160 g de cebolla en pluma", "200 g tomate cherry"] },
  { nombre: "RISOTTO DE CAMARÓN CON LECHE DE COCO", link: "https://www.recetasthermomix.cl/?recipe=risotto-de-camaron-con-leche-de-coco", ingredientes: ["30 g de queso parmesano", "2 dientes de ajo (opcional)", "1 trozo de ají amarillo", "5 g de hojas de cilantro frescas", "40 g de mantequilla", "200 g de camarones limpios", "80 g de cebolla o chalota", "25 g de aceite de oliva", "300 g de arroz arbóreo", "300 g de leche de coco", "100 g de vino blanco"] },
  { nombre: "CANCATO DE REINETA Y ENSALADA DE PAPAS CON LACTONESA DE MERQUÉN", link: "https://www.recetasthermomix.cl/?recipe=cancato-de-reineta-y-ensalada-de-papas-con-lactonesa-de-merquen", ingredientes: ["300 g de cebolla", "20 g de mantequilla", "30 g de tomates deshidratados", "120 g de chorizo", "500 g de filetes de reineta", "4 láminas de queso mantecoso", "500 g de papas", "100 g de leche", "5 g de mostaza de Dijon", "hojas de cilantro o perejil, picado (armado)"] },
  { nombre: "TRUCHA SALMONADA AL VAPOR DE CILANTRO, ESPÁRRAGOS Y ESPUMA DE JENGIBRE", link: "https://www.recetasthermomix.cl/?recipe=trucha-salmonada-al-vapor-de-cilantro-esparragos-y-espuma-de-jengibre", ingredientes: ["3 yemas de huevo", "50 g de salsa de soya", "50 g de vinagre blanco", "10 g de jengibre rallado", "180 g de mantequilla sin sal", "hojas de eneldo frescas", "20 g de semilla de cilantro", "20 unidades de espárragos verdes", "6 piezas de trucha salmonada de 130 g cada uno"] },
  { nombre: "CALDILLO DE CONGRIO", link: "https://www.recetasthermomix.cl/?recipe=caldillo-de-congrio-2", ingredientes: ["1 cabeza de congrio sin ojos o 2 pastillas de caldo de pescado", "100 g de cebolla cortada en cuatro", "90 g de zanahoria cortada en cuatro", "3 ramitas de perejil fresco", "1 ramita de apio", "1 hoja de laurel", "1 ramita de tomillo", "500 g de vino blanco seco", "6 filetes de congrio sin piel y sin espinas (120 g c/u aprox.)", "20 g de aceite de oliva", "3 cucharadas de jugo de limón", "30 g de aceite de oliva", "180 g de cebolla blanca cortada en pluma (1 unidad aprox.)", "2 dientes de ajo cortados en dos", "150-200 g de tomates en conserva", "1 cucharadita de ají de color o paprika", "360-400 g de papas (6 unidades aprox.)", "2 ramitas de culantro o perejil fresco, solo las hojas"] },
  { nombre: "CORVINA CON PAPAS Y TOMATES AL GRATÍN", link: "https://www.recetasthermomix.cl/?recipe=corvina-con-papas-y-tomates-al-gratin", ingredientes: ["100 g de cebolla", "2 dientes de ajo", "150 g de aceite de oliva", "600 g de papas", "60 g de mantequilla", "300 g de tomates maduros", "100 g de pimentón rojo", "6 filetes de corvina", "100-150 g de vino blanco seco"] },
  { nombre: "CHUPE O PASTEL DE JAIBA", link: "https://www.recetasthermomix.cl/?recipe=chupe-o-pastel-de-jaiba", ingredientes: ["5 g de mantequilla", "60 g de queso parmesano", "90 g de pan blanco en trozos (puede ser añejo o fresco y cuanta más miga, mejor)", "360 g de leche líquida", "150 g de cebolla cortada en dos (1 unidad aprox.)", "50 g de aceite de oliva", "150 g de vino blanco", "300 g de carne de jaiba descongelada y desmenuzada (bien escurrida)", "1 pizca de nuez moscada", "1 cucharada de ciboulette picado", "30 g de crema de leche líquida", "6 pinzas de jaibas"] },
  { nombre: "SALMÓN AL VAPOR CON PAPAS", link: "https://www.recetasthermomix.cl/?recipe=salmon-al-vapor-con-papas", ingredientes: ["300-400 g de papas con cascara", "50 g de aceite de oliva", "1000 g de salmón cortado en filetes de 200-250 g c/u", "1 limón en rodajas", "1 ramita de eneldo para decorar"] },
  { nombre: "1. REINETA AL VAPOR CON SALSA DE PUERRO Y AZAFRÁN", link: "https://www.recetasthermomix.cl/?recipe=reineta-al-vapor-con-salsa-de-puerro-y-azafran", ingredientes: ["100 g de puerro", "20 g de mantequilla", "1 pellizco de hebras de azafrán", "50 g de vino blanco seco", "400 g de caldo de pollo", "1 cucharadita de maicena", "200 g de zapallito italiano", "150 g de ramilletes de brócoli", "1 cucharada de aceite", "800 g de filetes de reineta", "100 g de yogur natural sin azúcar"] },
  { nombre: "CHOP SUEY DE GAMBAS", link: "https://www.recetasthermomix.cl/?recipe=chop-suey-de-gambas", ingredientes: ["60 g de setas shiitake secas", "12 gambones frescos pelados", "1 cucharada de maicena", "20 g de raíz de jengibre fresca", "1 diente de ajo", "200 g de pimiento verde", "200 g de pimiento rojo", "200 g de cebolla", "200 g de ramilletes de brócoli", "30 g de salsa de soya", "40 g de aceite de girasol", "100 g de dientes de dragón", "2 cucharadas de manís fritos salados (opcional)"] },
  { nombre: "CHAMPIÑONES RELLENOS DE VERDURA Y GAMBAS", link: "https://www.recetasthermomix.cl/?recipe=champinones-rellenos-de-verdura-y-gamba", ingredientes: ["8 champiñones grandes", "100 g de zapallito italiano", "1 diente de ajo", "50 g de cebolla", "30 g de pimentón rojo", "30 g de pimentón verde", "30 g de zanahoria", "1 ramita de perejil fresco", "30 g de aceite de oliva", "100 g de gambas crudas peladas", "1 cucharadita de maicena"] },
  { nombre: "REINETA EN PAPILLOTE CON ESPÁRRAGOS", link: "https://www.recetasthermomix.cl/?recipe=reineta-en-papillote-con-esparragos", ingredientes: ["8 espárragos verdes", "1 cebollas morada", "4 filetes de reineta (de aprox. 170 g)", "80 g de mantequilla", "2 ramitas de oregano fresco picado", "4 tomates cherry"] },
];

const Pollo = [
  { nombre: "POLLO CON SALSA DE MANÍ", link: "https://www.recetasthermomix.cl/?recipe=pollo-con-salsa-de-mani", ingredientes: ["600 g de pechuga de pollo", "1 cucharadita de maicena", "2 cucharadas de salsa de soya", "1/2 cucharadita de ajo", "1/2 cucharadita de jengibre rallado", "1 cucharada de jugo de limón recién exprimido", "1/2 cucharadita de curry", "1/2 cucharadita de cúrcuma molida", "2 cucharadas de cebollín o ciboulette picado para decorar", "150 g de maní sin sal", "200 g de agua caliente o leche de coco", "50 g de crema de leche o crema de coco"] },
  { nombre: "CURRY VERDE DE POLLO (RECETA TAILANDESA)", link: "https://www.recetasthermomix.cl/?recipe=curry-verde-de-pollo-o-camarones-receta-tailandesa", ingredientes: ["100 g de mani", "200 g de cebolla", "30 g de aceite maravilla", "40 g de pasta verde de curry", "400 g de leche de coco", "500 g de filetes de pollo", "100 g de arvejitas", "6 hojas de lima kefir (se puede sustituir por hojas de limón no tratadas)", "1 cucharada de salsa de pescado (o caldo concentrado)", "1 cucharada de jugo de limón", "1 cucharadita de ralladura de piel de limón", "10 g de azúcar rubia", "hojas de cilantro para servir"] },
  { nombre: "ARROZ VERDE CON POLLO Y CILANTRO", link: "https://www.recetasthermomix.cl/?recipe=arroz-verde-con-pollo-y-cilantro", ingredientes: ["800 g de filetillo de pollo", "jugo de 1/2 limón", "20 g de aceite de oliva", "100 g de zanahoria", "30 g de pimentón rojo", "1 paquete de cilantro", "120 g de cebolla", "2 dientes de ajo", "1/2 cucharadita de curcuma (o ají de color o ají amarillo)", "100 g de cerveza", "200 g de arroz", "200 g de arvejitas"] },
  { nombre: "CURRY DE POLLO CON ESPINACAS", link: "https://www.recetasthermomix.cl/?recipe=curry-de-pollo-con-espinacas", ingredientes: ["6 dientes de ajo", "1 trozo de jengibre fresco", "2 cebollas", "100 g de aceite de maravilla", "700 – 800 g de filetillos de pollo", "1 cucharadita de cúrcuma en polvo", "1,5 cucharadita de garam masala", "1,5 cucharadita de comino molido", "1 clavo de olor (entero)", "1 palito de canela", "1 cucharada de harina de arroz (o maicena)", "1 lata de tomates en conserva (220 g aprox.)", "400 g de leche de coco", "300 g de arroz basmati (o arroz grado 1)", "250 g de yogur natural (sin azúcar)"] },
  { nombre: "PANQUEQUES DE POLLO Y CHAMPIÑONES AL GRATIN", link: "https://www.recetasthermomix.cl/?recipe=panqueques-de-pollo-y-champinones-al-gratin", ingredientes: ["290 g de harina", "1000 g de leche", "2 huevos", "100 g de queso parmesano", "80 g de cebolla", "70 g de aceite de oliva", "200 g de champiñones frescos", "400 g de filetillo de pollo", "200 g de crema", "1 pizca de nuez moscada"] },
  { nombre: "QUICHE DE POLLO CON TOMATE Y ALBAHACA", link: "https://www.recetasthermomix.cl/?recipe=quiche-de-pollo-con-tomate-y-albahaca", ingredientes: ["270 g de harina", "130 g de aceite de oliva", "18 - 20 hojas de albahaca fresca", "150 g de cebolla", "30 g de tomate deshidratado", "300 g de pechuga de pollo deshuesada", "250 g de tomate cherry", "200 g de crema", "2 huevos", "60 g de queso feta", "1 pizca de nuez moscada en polvo"] },
  { nombre: "Tiras de pechuga de pollo doradas", link: "https://www.recetasthermomix.cl/?recipe=tiras-de-pechuga-de-pollo-doradas", ingredientes: ["20 g de aceite de oliva", "1 diente de ajo", "250 g de pechuga de pollo"] },
  { nombre: "Risotto de pollo y verduras", link: "https://www.recetasthermomix.cl/?recipe=risotto-de-pollo-y-verduras", ingredientes: ["1 - 2 dientes de ajo", "100 g de cebolla", "50 g de pimiento rojo", "50 g de pimiento verde", "50 g de aceite de oliva", "300 g de truto corto de pollo de pollo sin piel ni hueso", "200 g de arroz de grano redondo", "1 pastilla de caldo de pollo", "1 cucharada de pimentón", "¼ de cucharadita de colorante alimentario", "100 g de arvejas congelados (opcional)", "100 g de zanahoria"] },
  { nombre: "Crepes rellenas de pollo, espinacas y queso de cabra con salsa de puerros", link: "https://www.recetasthermomix.cl/?recipe=crepes-rellenas-de-pollo-espinacas-y-queso-de-cabra-con-salsa-de-puerros", ingredientes: ["90 - 105 g de mantequilla", "650 g de leche", "180 g de harina", "3 huevos", "200 g de cebolla", "2 - 3 dientes de ajo", "50 g de aceite de oliva", "800 g de trutro de pollo sin piel ni hueso", "100 g de vino blanco", "300 g de hojas de espinaca frescas", "1 - 2 pizcas de nuez moscada molida", "4 cucharadas de queso crema (aprox. 150 g)", "7 rodajas de queso de cabra en rulo (aprox. 120 g)", "300 g de puerro", "20 g de maicena", "1 pizca de nuez moscada molida", "2 - 3 cucharadas de queso parmesano"] },
  { nombre: "AJÍ DE GALLINA", link: "https://www.recetasthermomix.cl/?recipe=aji-de-gallina", ingredientes: ["1 cucharadita de concentrado de caldo de ave o de verduras o 1 cubo de caldo de ave", "4 rebanadas de pan de molde blanco, sin bordes o 6-8 galletas de soda", "1 cucharadita de cúrcuma o palillo", "1 cucharadita de pasta de ají amarillo o 1 ají amarillo sin pepitas", "80 g de nueces o maní (opcional)", "100 g de queso parmesano (opcional)", "120 g de cebolla morada (1 unidad aprox.)", "1 diente de ajo (opcional)", "40 g de aceite de oliva", "800-1000 g de pechuga de pollo deshuesada sin piel", "200 g leche evaporada", "aceitunas negras para decorar", "huevos duros (opcional)"] },
  { nombre: "PECHUGA DE PAVO AL CURRY", link: "https://www.recetasthermomix.cl/?recipe=pechuga-de-pavo-al-curry", ingredientes: ["70 g de aceite de oliva", "1 cucharada rasa de curry en polvo", "900 - 1000 g de pechuga de pavo sin piel ni hueso (en una pieza)", "700 g de cebolla", "30 g de mantequilla", "20 g de salsa de soya"] },
  { nombre: "POLLO ARVEJADO (TRUTRO CORTO)", link: "https://www.recetasthermomix.cl/?recipe=pollo-arvejado-trutro-corto", ingredientes: ["20 g de aceite de oliva", "1 cebolla", "2 zanahorias", "1 pimentón rojo grande ", "30 g de vino blanco", "100 g de concentrado de tomate", "6 a 8 presas de pollo Trutro corto sin grasa ni cuero", "25 g de concentrado de verduras", "150 g de arvejas congeladas", "200 g de champiñones", "10 g de cilantro o perejil picado"] },
  { nombre: "PASTA DE AVE PALTA Y AVE PIMENTÓN", link: "https://www.recetasthermomix.cl/?recipe=pasta-de-ave-palta-y-ave-pimenton", ingredientes: ["50 g de tallo de apio pelado", "100 g de zanahoria", "700 g de pechuga de pollo descongelada, deshuesada y sin piel", "2 ramitas de perejil fresco", "1 hoja de laurel seco", "100 g de pimentón rojo", "150 g de aceite de maravilla", "80 g de leche líquida", "1 cucharadita de jugo de limón", "200 g de palta"] },
  { nombre: "SOPA DE POLLO Y ARROZ", link: "https://www.recetasthermomix.cl/?recipe=sopa-de-pollo-y-arroz", ingredientes: ["1 carcasa de pollo (esqueleto)", "40 g de rabanito", "30 g de apio", "100 g de zanahoria", "80 g de puerro", "1 diente de ajo", "50 g de aceite de oliva", "70 g de vino de Jerez seco", "100 - 120 g de arroz", "1 cucharada de perejil fresco picado"] },
  { nombre: "SOPA DE AVE", link: "https://www.recetasthermomix.cl/?recipe=sopa-de-ave", ingredientes: ["2 huevos duros", "2 - 3 puerros en rodajas (sólo la parte blanca)", "1 zanahoria pequeña", "1 diente de ajo", "50 g de aceite de oliva extra virgen", "1 pechuga de pollo sin piel en trozos pequeños", "2 pastillas de concentrado de caldo de pollo", "50 g de brandy de Jerez", "1 cucharada de perejil fresco picado (para espolvorear)"] },
  { nombre: "1. ARROZ BASMATI CON POLLO Y VERDURAS AL VAPOR CON SALSA DE SÉSAMO, JENGIBRE Y SOYA", link: "https://www.recetasthermomix.cl/?recipe=arroz-basmati-con-pollo-y-verduras-al-vapor-con-salsa-de-sesamo-jengibre-y-soya", ingredientes: ["20 g de aceite", "320 g de arroz basmati", "800 g de filetitos de pollo", "2 zapallitos italianos", "2 zanahorias cortadas", "1/2 pimentón", "champiñones cortados en cuartos y/o dientes de dragón (opcional)", "1 trozo de jengibre fresco", "60 g de salsa de soya", "1 cucharadita de semillas de sésamo" ] },
  { nombre: "ENSALADA DE PAPAS Y VERDURAS CON POLLO", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-papas-y-verduras-con-pollo", ingredientes: ["300 g de zanahorias", "2 cucharaditas de sal", "300 g de papas", "300 g de porotos verdes frescos", "150 g de arvejas congeladas", "350 g de pechuga de pollo", "250 g de lechuga escarola", "150 g de crema de leche", "1 limón", "10 - 15 g de hierbas frescas variadas (por ej. ciboulette, perejil, eneldo)", "100 g de brotes de soja frescos (opcional)"] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  // desde aqui repetido
  { nombre: "PANQUEQUES DE POLLO Y CHAMPIÑONES AL GRATIN", link: "https://www.recetasthermomix.cl/?recipe=panqueques-de-pollo-y-champinones-al-gratin", ingredientes: ["290 g de harina", "1000 g de leche", "2 huevos", "100 g de queso parmesano", "80 g de cebolla", "70 g de aceite de oliva", "200 g de champiñones frescos", "400 g de filetillo de pollo", "200 g de crema", "1 pizca de nuez moscada"] },
  { nombre: "POLLO CON SALSA DE MANÍ", link: "https://www.recetasthermomix.cl/?recipe=pollo-con-salsa-de-mani", ingredientes: ["600 g de pechuga de pollo", "1 cucharadita de maicena", "2 cucharadas de salsa de soya", "1/2 cucharadita de ajo", "1/2 cucharadita de jengibre rallado", "1 cucharada de jugo de limón recién exprimido", "1/2 cucharadita de curry", "1/2 cucharadita de cúrcuma molida", "2 cucharadas de cebollín o ciboulette picado para decorar", "150 g de maní sin sal", "200 g de agua caliente o leche de coco", "50 g de crema de leche o crema de coco"] },
  { nombre: "CURRY VERDE DE POLLO (RECETA TAILANDESA)", link: "https://www.recetasthermomix.cl/?recipe=curry-verde-de-pollo-o-camarones-receta-tailandesa", ingredientes: ["100 g de mani", "200 g de cebolla", "30 g de aceite maravilla", "40 g de pasta verde de curry", "400 g de leche de coco", "500 g de filetes de pollo", "100 g de arvejitas", "6 hojas de lima kefir (se puede sustituir por hojas de limón no tratadas)", "1 cucharada de salsa de pescado (o caldo concentrado)", "1 cucharada de jugo de limón", "1 cucharadita de ralladura de piel de limón", "10 g de azúcar rubia", "hojas de cilantro para servir"] },
  { nombre: "ARROZ VERDE CON POLLO Y CILANTRO", link: "https://www.recetasthermomix.cl/?recipe=arroz-verde-con-pollo-y-cilantro", ingredientes: ["800 g de filetillo de pollo", "jugo de 1/2 limón", "20 g de aceite de oliva", "100 g de zanahoria", "30 g de pimentón rojo", "1 paquete de cilantro", "120 g de cebolla", "2 dientes de ajo", "1/2 cucharadita de curcuma (o ají de color o ají amarillo)", "100 g de cerveza", "200 g de arroz", "200 g de arvejitas"] },
  { nombre: "CURRY DE POLLO CON ESPINACAS", link: "https://www.recetasthermomix.cl/?recipe=curry-de-pollo-con-espinacas", ingredientes: ["6 dientes de ajo", "1 trozo de jengibre fresco", "2 cebollas", "100 g de aceite de maravilla", "700 – 800 g de filetillos de pollo", "1 cucharadita de cúrcuma en polvo", "1,5 cucharadita de garam masala", "1,5 cucharadita de comino molido", "1 clavo de olor (entero)", "1 palito de canela", "1 cucharada de harina de arroz (o maicena)", "1 lata de tomates en conserva (220 g aprox.)", "400 g de leche de coco", "300 g de arroz basmati (o arroz grado 1)", "250 g de yogur natural (sin azúcar)"] },
  { nombre: "SOPA DE POLLO Y ARROZ", link: "https://www.recetasthermomix.cl/?recipe=sopa-de-pollo-y-arroz", ingredientes: ["1 carcasa de pollo (esqueleto)", "40 g de rabanito", "30 g de apio", "100 g de zanahoria", "80 g de puerro", "1 diente de ajo", "50 g de aceite de oliva", "70 g de vino de Jerez seco", "100 - 120 g de arroz", "1 cucharada de perejil fresco picado"] },
  { nombre: "QUICHE DE POLLO CON TOMATE Y ALBAHACA", link: "https://www.recetasthermomix.cl/?recipe=quiche-de-pollo-con-tomate-y-albahaca", ingredientes: ["270 g de harina", "130 g de aceite de oliva", "18 - 20 hojas de albahaca fresca", "150 g de cebolla", "30 g de tomate deshidratado", "300 g de pechuga de pollo deshuesada", "250 g de tomate cherry", "200 g de crema", "2 huevos", "60 g de queso feta", "1 pizca de nuez moscada en polvo"] },
  { nombre: "Tiras de pechuga de pollo doradas", link: "https://www.recetasthermomix.cl/?recipe=tiras-de-pechuga-de-pollo-doradas", ingredientes: ["20 g de aceite de oliva", "1 diente de ajo", "250 g de pechuga de pollo"] },
  { nombre: "Risotto de pollo y verduras", link: "https://www.recetasthermomix.cl/?recipe=risotto-de-pollo-y-verduras", ingredientes: ["1 - 2 dientes de ajo", "100 g de cebolla", "50 g de pimiento rojo", "50 g de pimiento verde", "50 g de aceite de oliva", "300 g de truto corto de pollo de pollo sin piel ni hueso", "200 g de arroz de grano redondo", "1 pastilla de caldo de pollo", "1 cucharada de pimentón", "¼ de cucharadita de colorante alimentario", "100 g de arvejas congelados (opcional)", "100 g de zanahoria"] },
  { nombre: "AJÍ DE GALLINA", link: "https://www.recetasthermomix.cl/?recipe=aji-de-gallina", ingredientes: ["1 cucharadita de concentrado de caldo de ave o de verduras o 1 cubo de caldo de ave", "4 rebanadas de pan de molde blanco, sin bordes o 6-8 galletas de soda", "1 cucharadita de cúrcuma o palillo", "1 cucharadita de pasta de ají amarillo o 1 ají amarillo sin pepitas", "80 g de nueces o maní (opcional)", "100 g de queso parmesano (opcional)", "120 g de cebolla morada (1 unidad aprox.)", "1 diente de ajo (opcional)", "40 g de aceite de oliva", "800-1000 g de pechuga de pollo deshuesada sin piel", "200 g leche evaporada", "aceitunas negras para decorar", "huevos duros (opcional)"] },
  { nombre: "POLLO ARVEJADO (TRUTRO CORTO)", link: "https://www.recetasthermomix.cl/?recipe=pollo-arvejado-trutro-corto", ingredientes: ["20 g de aceite de oliva", "1 cebolla", "2 zanahorias", "1 pimentón rojo grande ", "30 g de vino blanco", "100 g de concentrado de tomate", "6 a 8 presas de pollo Trutro corto sin grasa ni cuero", "25 g de concentrado de verduras", "150 g de arvejas congeladas", "200 g de champiñones", "10 g de cilantro o perejil picado"] },
  { nombre: "PASTA DE AVE PALTA Y AVE PIMENTÓN", link: "https://www.recetasthermomix.cl/?recipe=pasta-de-ave-palta-y-ave-pimenton", ingredientes: ["50 g de tallo de apio pelado", "100 g de zanahoria", "700 g de pechuga de pollo descongelada, deshuesada y sin piel", "2 ramitas de perejil fresco", "1 hoja de laurel seco", "100 g de pimentón rojo", "150 g de aceite de maravilla", "80 g de leche líquida", "1 cucharadita de jugo de limón", "200 g de palta"] },
  { nombre: "SOPA DE AVE", link: "https://www.recetasthermomix.cl/?recipe=sopa-de-ave", ingredientes: ["2 huevos duros", "2 - 3 puerros en rodajas (sólo la parte blanca)", "1 zanahoria pequeña", "1 diente de ajo", "50 g de aceite de oliva extra virgen", "1 pechuga de pollo sin piel en trozos pequeños", "2 pastillas de concentrado de caldo de pollo", "50 g de brandy de Jerez", "1 cucharada de perejil fresco picado (para espolvorear)"] },
  { nombre: "1. ARROZ BASMATI CON POLLO Y VERDURAS AL VAPOR CON SALSA DE SÉSAMO, JENGIBRE Y SOYA", link: "https://www.recetasthermomix.cl/?recipe=arroz-basmati-con-pollo-y-verduras-al-vapor-con-salsa-de-sesamo-jengibre-y-soya", ingredientes: ["20 g de aceite", "320 g de arroz basmati", "800 g de filetitos de pollo", "2 zapallitos italianos", "2 zanahorias cortadas", "1/2 pimentón", "champiñones cortados en cuartos y/o dientes de dragón (opcional)", "1 trozo de jengibre fresco", "60 g de salsa de soya", "1 cucharadita de semillas de sésamo" ] },
  { nombre: "ENSALADA DE PAPAS Y VERDURAS CON POLLO", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-papas-y-verduras-con-pollo", ingredientes: ["300 g de zanahorias", "2 cucharaditas de sal", "300 g de papas", "300 g de porotos verdes frescos", "150 g de arvejas congeladas", "350 g de pechuga de pollo", "250 g de lechuga escarola", "150 g de crema de leche", "1 limón", "10 - 15 g de hierbas frescas variadas (por ej. ciboulette, perejil, eneldo)", "100 g de brotes de soja frescos (opcional)"] },
  { nombre: "PECHUGA DE PAVO AL CURRY", link: "https://www.recetasthermomix.cl/?recipe=pechuga-de-pavo-al-curry", ingredientes: ["70 g de aceite de oliva", "1 cucharada rasa de curry en polvo", "900 - 1000 g de pechuga de pavo sin piel ni hueso (en una pieza)", "700 g de cebolla", "30 g de mantequilla", "20 g de salsa de soya"] },
  { nombre: "Crepes rellenas de pollo, espinacas y queso de cabra con salsa de puerros", link: "https://www.recetasthermomix.cl/?recipe=crepes-rellenas-de-pollo-espinacas-y-queso-de-cabra-con-salsa-de-puerros", ingredientes: ["90 - 105 g de mantequilla", "650 g de leche", "180 g de harina", "3 huevos", "200 g de cebolla", "2 - 3 dientes de ajo", "50 g de aceite de oliva", "800 g de trutro de pollo sin piel ni hueso", "100 g de vino blanco", "300 g de hojas de espinaca frescas", "1 - 2 pizcas de nuez moscada molida", "4 cucharadas de queso crema (aprox. 150 g)", "7 rodajas de queso de cabra en rulo (aprox. 120 g)", "300 g de puerro", "20 g de maicena", "1 pizca de nuez moscada molida", "2 - 3 cucharadas de queso parmesano"] },
  
];

const Verdura = [
  { nombre: "CEVICHE DE CHAMPIÑON", link: "https://www.recetasthermomix.cl/?recipe=ceviche-de-champinon", ingredientes: ["40 g de aceite de oliva", "150 g de jugo de limón", "150 g de cebolla morada", "10 g de ají verde (opcional)", "200 g de tomate en trozos", "4 ramitas de cilantro", "10 hojas de hierbabuena fresca", "500 g de champiñones en cubos", "1 palta en trozos", "", ""] },
  { nombre: "ENSALADA DE QUINOA", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-quinoa", ingredientes: ["20 g de jugo de limón", "15 g de vinagre de vino blanco", "10 g de cilantro fresco", "85 g de aceite de oliva", "250 g de quinoa blanca", "160 g de brócoli", "100 g de zanahorias baby", "150 g de rúcula baby", "200 g de palta", "50 g de tomate cherry", "1 pieza de queso mozarella fresco"] },
  { nombre: "ENSALADA DE ZANAHORIA CON CILANTRO Y CURRY", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-zanahoria-con-cilantro-y-curry", ingredientes: ["2 trozos pequeños de jengibre fresco", "10-12 ramitas de cilantro fresco", "1 cucharadita de mostaza a la antigua", "1/2 cucharadita de curry en polvo", "40 g de aceite de maravilla", "180 g de yogur griego", "600 g de zanahorias", "1 cucharadita de sésamo tostado", "1 ají verde"] },
  { nombre: "ENSALADA DE VEGETALES", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-vegetales", ingredientes: ["250 g de repollo", "60 g de zanahoria", "50 g de manzana verde", "50 g de pimentón verde", "50 g de cebolla morada", "8 a 10 ramitas de perejil", "50 g jugo de limón", "75 g de aceite de oliva extra virgen"] },
  { nombre: "PAPAS PARA GUARNICIÓN O PARA TORTILLA", link: "https://www.recetasthermomix.cl/?recipe=papas-para-guarnicion-o-para-tortilla", ingredientes: ["100 g de aceite de oliva virgen extra", "2 dientes de ajo laminados o bien 120 g de cebolla en tiras", "600 g de papas", "10 ramitas de perejil fresco", "1 cucharadita de vinagre"] },
  { nombre: "Ensalada italiana de pasta con pesto", link: "https://www.recetasthermomix.cl/?recipe=ensalada-italiana-de-pasta-con-pesto", ingredientes: ["80 g de queso parmesano", "30 g de piñones o nueces", "1 diente de ajo", "80 g de albahaca fresca", "150 g de aceite de oliva", "500 g de pasta corta seca (tipo farfalle)", "150 g de aceitunas negras sin hueso", "400 g de tomates cherry", "300 g de mozzarellas mini"] },
  { nombre: "PAPAS AL GRATIN", link: "https://www.recetasthermomix.cl/?recipe=papas-al-gratin", ingredientes: ["5 g de mantequilla", "1-2 dientes de ajo (opcional)", "1200 g de papas", "400-500 g de crema de leche", "1 pellizco de nuez moscada", "80-100 g de queso parmesano"] },
  { nombre: "1. ENSALADA COLESLAW", link: "https://www.recetasthermomix.cl/?recipe=ensalada-coleslaw", ingredientes: ["3 huevos duros", "300 g de repollo blanco", "300 g de zanahoria", "200 g de pepinillos en vinagre", "200 g de aceitunas descarozadas", "300 g de repollo morado", "lactonesa"] },
  { nombre: "QUICHE VEGETARIANA CON ESPINACAS Y PIMENTÓN ROJO", link: "https://www.recetasthermomix.cl/?recipe=quiche-vegetariana-con-espinacas-y-pimenton-rojo", ingredientes: ["100 g de vino blanco o bien 100 g de agua", "80 g de aceite de oliva", "300 g de harina", "20 g de mantequilla", "60 g de cebolla en trozos", "180 - 200 g de pimentón rojo", "1 diente de ajo", "200 g de hojas de espinaca frescas o bien 200 g de espinacas congeladas (previamente descongeladas y escurridas)", "45 g de tomates secos en trozos", "15 aceitunas negras sin hueso", "80 g de queso feta (o de cabra)", "½ cucharadita de orégano seco", "2 - 3 pizcas de nuez moscada molida", "80 g de queso parmesano", "4 huevos", "60 g de leche"] },
  { nombre: "Ensalada de cuscús de coliflor", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-cuscus-de-coliflor", ingredientes: ["30 g de almendras", "300 g de coliflor", "30 g de aceite de oliva", "100 g de cebolla morada", "5 g de cilantro", "150 g de tomate", "50 g de aceitunas verdes o negras sin carozo", "15 g de jugo de limón"] },
  { nombre: "HAMBURGUESAS DE QUÍNOA", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-quinoa", ingredientes: ["120 g de cebolla", "1 diente de ajo", "50 g de zanahoria", "50 g de apio", "30 g de aceite", "200 g de quínoa", "1 huevo", "1 cucharadita de orégano", "½ cucharadita de ciboulette seco", "1 pellizco de comino"] },
  { nombre: "Ensalada de zanahoria rallada", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-zanahoria-rallada", ingredientes: ["400 g de zanahorias", "1 chalota", "2 - 3 ramitas de perejil fresco", "40 g de aceite de oliva", "15 g de vinagre o bien 15 g de jugo de limón", "10 g de mostaza"] },
  { nombre: "Papas gratinadas con crema de queso", link: "https://www.recetasthermomix.cl/?recipe=patatas-gratinadas-con-crema-de-queso", ingredientes: ["100 g de queso gouda", "100 g de cebollín", "200 g de crema de leche", "1 pizca de nuez moscada molida", "800 g de papas"] },
  { nombre: "PIZZA CON TOMATE Y MOZZARELLA FRESCOS", link: "https://www.recetasthermomix.cl/?recipe=pizza-con-tomate-y-mozzarella-frescos", ingredientes: ["1 cucharadita de azúcar", "20 g de levadura fresca", "400 g de harina sin polvos", "30 g de aceite de girasol", "100 g de tomate triturado en conserva", "6 hojas de albahaca fresca", "10 g de aceite de oliva virgen extra", "16 tomates cherry ", "90 g de rúcula", "200 g de burrata"] },
  { nombre: "Ensalada rápida de brócoli", link: "https://www.recetasthermomix.cl/?recipe=ensalada-rapida-de-brocoli", ingredientes: ["350 g de ramilletes de brócoli", "1 manzana (aprox. 150 g)", "20 g de cebolla", "100 g de zapallito italiano", "20 g de vinagre de sidra o bien 20 g de jugo de limón", "60 g de aceite de oliva extra virgen", "40 g de pasas sin semillas (opcional)"] },
  { nombre: "ENSALADA RUSA", link: "https://www.recetasthermomix.cl/?recipe=ensalada-rusa", ingredientes: ["600 g de papas", "150 g de zanahorias", "120 g de arvejas congeladas", "4 huevos", "80 g de aceitunas descarozadas", "60 g de pepinillos en vinagre", "200 g aproximadamente de atún en tarro", "300 g o al gusto de mayonesa"] },
  { nombre: "Champiñones o setas al ajillo", link: "https://www.recetasthermomix.cl/?recipe=champinones-o-setas-al-ajillo", ingredientes: ["4 dientes de ajo", "10 ramitas de perejil fresco (solo las hojas)", "400 g de champiñones", "50 g de aceite de oliva"] },
  { nombre: "Pebre", link: "https://www.recetasthermomix.cl/?recipe=pebre", ingredientes: ["15 g de hojas de cilantro fresco", "60-90 g de ají verde (2 unidades aprox)", "120 g de cebolla morada (1 unidad aprox)", "330-350 g de tomate (2-3 unidades aprox)", "20 g de aceite de oliva", "20 g de jugo de limón"] },
  { nombre: "PAPAS ARRUGADAS", link: "https://www.recetasthermomix.cl/?recipe=papas-arrugadas", ingredientes: ["750 g de papas pequeñas"] },
  { nombre: "QUINOA CON VERDURAS", link: "https://www.recetasthermomix.cl/?recipe=quinoa-con-verduras", ingredientes: ["300 g de quinoa blanca lavada", "200 g de zanahoria pelada", "50-80 g de cebolla (1/2 unidad aprox.)", "1 zapallo italiano", "1 tomate", "2 tallos de apio", "½ pimentón rojo", "40 g de aceite de oliva", "1 cm de jengibre pelado", "80 g de salsa de soya", "10 g de semillas de sésamo"] },
  { nombre: "Cuscús de coliflor y verduras crudivegano", link: "https://www.recetasthermomix.cl/?recipe=cuscus-de-coliflor-y-verduras-crudivegano", ingredientes: ["50 g de aceite de oliva extra virgen", "20 g de jugo de limón", "1 pellizco de curry en polvo", "1 pellizco de cúrcuma molida (opcional)", "500 g de ramilletes de coliflor", "70 g de zanahoria", "30 g de apio", "70 g de zapallito italiano", "10 tomates cherry", "70 g de pimentón amarillo", "4 - 5 ramitas de hojas de menta fresca"] },
  { nombre: "ARROZ INTEGRAL", link: "https://www.recetasthermomix.cl/?recipe=arroz-integral", ingredientes: ["350 g de arroz integral", "20 g de aceite de oliva", "2 dientes de ajo (opcional)"] },
  { nombre: "GRATIN DE PAPAS CON CHAMPIÑONES", link: "https://www.recetasthermomix.cl/?recipe=gratin-de-papas-con-champinones", ingredientes: ["400 g de champiñones parís", "4 dientes de ajo (opcional)", "10 ramitas de perejil (solo las hojas)", "20 g de aceite de oliva", "5 g de mantequilla", "800 g de papas", "1 chalota", "80 g de leche", "50 g de mantequilla", "60 g de queso mozzarella laminado", "40 g de queso parmesano rallado"] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  { nombre: "", link: "", ingredientes: ["", "", ""] },
  // desde aqui repetidas 
  { nombre: "ENSALADA DE QUINOA", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-quinoa", ingredientes: ["20 g de jugo de limón", "15 g de vinagre de vino blanco", "10 g de cilantro fresco", "85 g de aceite de oliva", "250 g de quinoa blanca", "160 g de brócoli", "100 g de zanahorias baby", "150 g de rúcula baby", "200 g de palta", "50 g de tomate cherry", "1 pieza de queso mozarella fresco"] },
  { nombre: "ENSALADA DE ZANAHORIA CON CILANTRO Y CURRY", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-zanahoria-con-cilantro-y-curry", ingredientes: ["2 trozos pequeños de jengibre fresco", "10-12 ramitas de cilantro fresco", "1 cucharadita de mostaza a la antigua", "1/2 cucharadita de curry en polvo", "40 g de aceite de maravilla", "180 g de yogur griego", "600 g de zanahorias", "1 cucharadita de sésamo tostado", "1 ají verde"] },
  { nombre: "ENSALADA DE VEGETALES", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-vegetales", ingredientes: ["250 g de repollo", "60 g de zanahoria", "50 g de manzana verde", "50 g de pimentón verde", "50 g de cebolla morada", "8 a 10 ramitas de perejil", "50 g jugo de limón", "75 g de aceite de oliva extra virgen"] },
  { nombre: "PAPAS PARA GUARNICIÓN O PARA TORTILLA", link: "https://www.recetasthermomix.cl/?recipe=papas-para-guarnicion-o-para-tortilla", ingredientes: ["100 g de aceite de oliva virgen extra", "2 dientes de ajo laminados o bien 120 g de cebolla en tiras", "600 g de papas", "10 ramitas de perejil fresco", "1 cucharadita de vinagre"] },
  { nombre: "Ensalada italiana de pasta con pesto", link: "https://www.recetasthermomix.cl/?recipe=ensalada-italiana-de-pasta-con-pesto", ingredientes: ["80 g de queso parmesano", "30 g de piñones o nueces", "1 diente de ajo", "80 g de albahaca fresca", "150 g de aceite de oliva", "500 g de pasta corta seca (tipo farfalle)", "150 g de aceitunas negras sin hueso", "400 g de tomates cherry", "300 g de mozzarellas mini"] },
  { nombre: "PAPAS AL GRATIN", link: "https://www.recetasthermomix.cl/?recipe=papas-al-gratin", ingredientes: ["5 g de mantequilla", "1-2 dientes de ajo (opcional)", "1200 g de papas", "400-500 g de crema de leche", "1 pellizco de nuez moscada", "80-100 g de queso parmesano"] },
  { nombre: "Ensalada de zanahoria rallada", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-zanahoria-rallada", ingredientes: ["400 g de zanahorias", "1 chalota", "2 - 3 ramitas de perejil fresco", "40 g de aceite de oliva", "15 g de vinagre o bien 15 g de jugo de limón", "10 g de mostaza"] },
  { nombre: "Papas gratinadas con crema de queso", link: "https://www.recetasthermomix.cl/?recipe=patatas-gratinadas-con-crema-de-queso", ingredientes: ["100 g de queso gouda", "100 g de cebollín", "200 g de crema de leche", "1 pizca de nuez moscada molida", "800 g de papas"] },
  { nombre: "PIZZA CON TOMATE Y MOZZARELLA FRESCOS", link: "https://www.recetasthermomix.cl/?recipe=pizza-con-tomate-y-mozzarella-frescos", ingredientes: ["1 cucharadita de azúcar", "20 g de levadura fresca", "400 g de harina sin polvos", "30 g de aceite de girasol", "100 g de tomate triturado en conserva", "6 hojas de albahaca fresca", "10 g de aceite de oliva virgen extra", "16 tomates cherry ", "90 g de rúcula", "200 g de burrata"] },
  { nombre: "Ensalada rápida de brócoli", link: "https://www.recetasthermomix.cl/?recipe=ensalada-rapida-de-brocoli", ingredientes: ["350 g de ramilletes de brócoli", "1 manzana (aprox. 150 g)", "20 g de cebolla", "100 g de zapallito italiano", "20 g de vinagre de sidra o bien 20 g de jugo de limón", "60 g de aceite de oliva extra virgen", "40 g de pasas sin semillas (opcional)"] },
  { nombre: "Champiñones o setas al ajillo", link: "https://www.recetasthermomix.cl/?recipe=champinones-o-setas-al-ajillo", ingredientes: ["4 dientes de ajo", "10 ramitas de perejil fresco (solo las hojas)", "400 g de champiñones", "50 g de aceite de oliva"] },
  { nombre: "PAPAS ARRUGADAS", link: "https://www.recetasthermomix.cl/?recipe=papas-arrugadas", ingredientes: ["750 g de papas pequeñas"] },
  { nombre: "QUINOA CON VERDURAS", link: "https://www.recetasthermomix.cl/?recipe=quinoa-con-verduras", ingredientes: ["300 g de quinoa blanca lavada", "200 g de zanahoria pelada", "50-80 g de cebolla (1/2 unidad aprox.)", "1 zapallo italiano", "1 tomate", "2 tallos de apio", "½ pimentón rojo", "40 g de aceite de oliva", "1 cm de jengibre pelado", "80 g de salsa de soya", "10 g de semillas de sésamo"] },
  { nombre: "Cuscús de coliflor y verduras crudivegano", link: "https://www.recetasthermomix.cl/?recipe=cuscus-de-coliflor-y-verduras-crudivegano", ingredientes: ["50 g de aceite de oliva extra virgen", "20 g de jugo de limón", "1 pellizco de curry en polvo", "1 pellizco de cúrcuma molida (opcional)", "500 g de ramilletes de coliflor", "70 g de zanahoria", "30 g de apio", "70 g de zapallito italiano", "10 tomates cherry", "70 g de pimentón amarillo", "4 - 5 ramitas de hojas de menta fresca"] },
  { nombre: "HAMBURGUESAS DE QUÍNOA", link: "https://www.recetasthermomix.cl/?recipe=hamburguesas-de-quinoa", ingredientes: ["120 g de cebolla", "1 diente de ajo", "50 g de zanahoria", "50 g de apio", "30 g de aceite", "200 g de quínoa", "1 huevo", "1 cucharadita de orégano", "½ cucharadita de ciboulette seco", "1 pellizco de comino"] },
  { nombre: "ARROZ INTEGRAL", link: "https://www.recetasthermomix.cl/?recipe=arroz-integral", ingredientes: ["350 g de arroz integral", "20 g de aceite de oliva", "2 dientes de ajo (opcional)"] },
  { nombre: "ENSALADA RUSA", link: "https://www.recetasthermomix.cl/?recipe=ensalada-rusa", ingredientes: ["600 g de papas", "150 g de zanahorias", "120 g de arvejas congeladas", "4 huevos", "80 g de aceitunas descarozadas", "60 g de pepinillos en vinagre", "200 g aproximadamente de atún en tarro", "300 g o al gusto de mayonesa"] },
  { nombre: "GRATIN DE PAPAS CON CHAMPIÑONES", link: "https://www.recetasthermomix.cl/?recipe=gratin-de-papas-con-champinones", ingredientes: ["400 g de champiñones parís", "4 dientes de ajo (opcional)", "10 ramitas de perejil (solo las hojas)", "20 g de aceite de oliva", "5 g de mantequilla", "800 g de papas", "1 chalota", "80 g de leche", "50 g de mantequilla", "60 g de queso mozzarella laminado", "40 g de queso parmesano rallado"] },
  { nombre: "1. ENSALADA COLESLAW", link: "https://www.recetasthermomix.cl/?recipe=ensalada-coleslaw", ingredientes: ["3 huevos duros", "300 g de repollo blanco", "300 g de zanahoria", "200 g de pepinillos en vinagre", "200 g de aceitunas descarozadas", "300 g de repollo morado", "lactonesa"] },
  { nombre: "QUICHE VEGETARIANA CON ESPINACAS Y PIMENTÓN ROJO", link: "https://www.recetasthermomix.cl/?recipe=quiche-vegetariana-con-espinacas-y-pimenton-rojo", ingredientes: ["100 g de vino blanco o bien 100 g de agua", "80 g de aceite de oliva", "300 g de harina", "20 g de mantequilla", "60 g de cebolla en trozos", "180 - 200 g de pimentón rojo", "1 diente de ajo", "200 g de hojas de espinaca frescas o bien 200 g de espinacas congeladas (previamente descongeladas y escurridas)", "45 g de tomates secos en trozos", "15 aceitunas negras sin hueso", "80 g de queso feta (o de cabra)", "½ cucharadita de orégano seco", "2 - 3 pizcas de nuez moscada molida", "80 g de queso parmesano", "4 huevos", "60 g de leche"] },
  { nombre: "Ensalada de cuscús de coliflor", link: "https://www.recetasthermomix.cl/?recipe=ensalada-de-cuscus-de-coliflor", ingredientes: ["30 g de almendras", "300 g de coliflor", "30 g de aceite de oliva", "100 g de cebolla morada", "5 g de cilantro", "150 g de tomate", "50 g de aceitunas verdes o negras sin carozo", "15 g de jugo de limón"] },
  { nombre: "Pebre", link: "https://www.recetasthermomix.cl/?recipe=pebre", ingredientes: ["15 g de hojas de cilantro fresco", "60-90 g de ají verde (2 unidades aprox)", "120 g de cebolla morada (1 unidad aprox)", "330-350 g de tomate (2-3 unidades aprox)", "20 g de aceite de oliva", "20 g de jugo de limón"] },
  
];

const Aperitivo = [
  { nombre: "APERITIVO CON QUESO DE CABRA PICANTE", link: "https://www.recetasthermomix.cl/?recipe=aperitivo-con-queso-de-cabra-picante", ingredientes: ["100 g de queso de cabra en trozos", "100 g de queso fresco en trozos", "4 tomates pera maduros, cortados en cuartos (sin semillas)", "40 g de aceite de oliva", "150 g de pimentón rojo en juliana", "150 g de pimentón verde en juliana", "150 g de pimentón amarillo en juliana", "1/2 cucharadita de orégano seco", "", ""] },
  { nombre: "Focaccia con Cebolla", link: "https://www.recetasthermomix.cl/?recipe=focaccia-con-cebolla", ingredientes: ["600 grs. de harina de fuerza", "20 grs. de aceite de oliva y un poco más", "25 grs. de levadura fresca (ó 10 grs. de levadura seca = 1 cda rasa)", "1 pizca de azúcar", "400 grs. (+/- 4 unidades) – (si ud. desea, pueden ser picadas corte “pluma”)", "40 grs. de aceite de oliva", "Hierbas aromatizantes (a su gusto) (aprox 2 cucharadas) para dar sabor", "", ""] },
  { nombre: "GUACAMOLE", link: "https://www.recetasthermomix.cl/?recipe=guacamole", ingredientes: ["5 ramitas de cilantro fresco, solo las hojas", "80-100 g de cebolla cortada en cuatro", "1 ají verde cortado por la mitad y sin pepas", "1 diente de ajo", "100-120 g de tomate cortado en cuatro (1 unidad)", "450 g de paltas maduras peladas y sin cuesco", "1 cucharada de jugo de limón", "", ""] },
  { nombre: "MOUSSE DE CILANTRO", link: "https://www.recetasthermomix.cl/?recipe=mousse-de-cilantro", ingredientes: ["71⁄2 g de gelatina sin sabor en polvo (1 sobre)", "120 g de hojas de cilantro fresco y algo más para decorar", "340 g de yogur natural sin azúcar", "140 g de mayonesa", "40 g de ají verde cortado en trozos, sin pepas (1 unidad aprox.) y algo más para decorar", "10 g de mostaza de Dijon", "aceite de oliva para decorar", "", ""] },
  { nombre: "Nachos con porotos negros y guacamole", link: "https://www.recetasthermomix.cl/?recipe=nachos-con-porotos-negros-y-guacamole", ingredientes: ["230 g de queso cheddar, cortado en trozos", "70 g de cebolla blanca", "120 g de tomate, cortado en cuartos", "200 g de palta (1 pieza aprox.)", "65 g de tomate verde, en cuartos", "25 g de jugo de limón", "820 g de porotos negros enteros cocidos y enlatados (1 lata grande)", "1 diente de ajo", "¼ cdita de semillas de comino, o al gusto", "1 cdita de manteca de cerdo", "500 g de nachos", "4 cdas de crema ácida, para decorar", "", ""] },
  { nombre: "SOPAIPILLAS DE BETARRAGA", link: "https://www.recetasthermomix.cl/?recipe=sopaipillas-de-betarraga", ingredientes: ["400 g de betarraga pelada y cortada en cuartos", "460 g de harina", "75 g de manteca", "", ""] },
  { nombre: "PESTO DE ESPINACAS Y NUECES", link: "https://www.recetasthermomix.cl/?recipe=pesto-de-espinacas-y-nueces", ingredientes: ["100 g de queso parmesano", "100 g de hojas de espinaca fresca", "6 dientes de ajo", "50 g de nueces", "80 g de aceite de oliva", "", ""] },
  { nombre: "SOPAIPILLAS CHILENAS", link: "https://www.recetasthermomix.cl/?recipe=sopaipillas-chilenas", ingredientes: ["200 g de zapallo camote pelado y cortado en trozos medianos de 3 cm aprox.", "½ cucharadita de azúcar", "500 g de harina", "1 cucharadita de polvos de hornear", "30 g de mantequilla a temperatura ambiente", "800 g de aceite de maravilla", "", ""] },
  { nombre: "PATÉ DE TOMATES", link: "https://www.recetasthermomix.cl/?recipe=pate-de-tomates", ingredientes: ["70 g de  tomates secos", "10 g de diente de ajo", "150 g de pimentón rojos", "200 g de cebolla", "30 g de aceite de oliva", "½ cdta. de paprika", "1 cdta.  de orégano", "½ cdta. de albahaca seca", "½ cdta. raza de comino", "1 trozo de piel de limón de unos 2 x 5 cm", "100 gr de nueces", "1 cdta gelatina sin sabor", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "PIZZA AL ESTILO NAPOLITANA", link: "https://www.recetasthermomix.cl/?recipe=pizza-al-estilo-napolitana", ingredientes: ["10 g de levadura fresca", "10 g de miel", "250 g de harina ", "2 bolas de mozzarella fresca", "150 g de pulpa de tomate (passata)", "1 cucharadita de orégano seco", "20 g de aceite de oliva", "hojas de albahaca fresca"] },
  { nombre: "QUESADILLAS DE ALCACHOFAS Y ESPINACAS", link: "https://www.recetasthermomix.cl/?recipe=quesadillas-de-alcachofas-y-espinacas", ingredientes: ["150 g de hojas de espinaca frescas", "30 g de aceite de oliva", "200 g de alcachofas congeladas o en conserva", "30 g de leche", "150 g de queso cremoso", "150 g de queso mozzarella rallada", "50 g de queso parmesano rallado", "8 tortillas de trigo", "", ""] },
  { nombre: "FOCACCIA DE PAPA Y ROMERO", link: "https://www.recetasthermomix.cl/?recipe=focaccia-de-papa-y-romero", ingredientes: ["1 cucharadita de azúcar", "10 g de levadura seca instantánea", "2 cucharaditas de orégano", "400 g de harina", "30 g de aceite de oliva, y un poco más para engrasar", "20 g de cebolla morada, fileteada", "100 g de papa, en rodajas muy finas", "2 ramitas de romero, solamente las hojas", "2 cucharaditas de sal gruesa", "3 cucharaditas de aceite de albahaca", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  // desde aqui repetido
  { nombre: "SOPAIPILLAS CHILENAS", link: "https://www.recetasthermomix.cl/?recipe=sopaipillas-chilenas", ingredientes: ["200 g de zapallo camote pelado y cortado en trozos medianos de 3 cm aprox.", "½ cucharadita de azúcar", "500 g de harina", "1 cucharadita de polvos de hornear", "30 g de mantequilla a temperatura ambiente", "800 g de aceite de maravilla", "", ""] },
  { nombre: "Focaccia con Cebolla", link: "https://www.recetasthermomix.cl/?recipe=focaccia-con-cebolla", ingredientes: ["600 grs. de harina de fuerza", "20 grs. de aceite de oliva y un poco más", "25 grs. de levadura fresca (ó 10 grs. de levadura seca = 1 cda rasa)", "1 pizca de azúcar", "400 grs. (+/- 4 unidades) – (si ud. desea, pueden ser picadas corte “pluma”)", "40 grs. de aceite de oliva", "Hierbas aromatizantes (a su gusto) (aprox 2 cucharadas) para dar sabor", "", ""] },
  { nombre: "SOPAIPILLAS DE BETARRAGA", link: "https://www.recetasthermomix.cl/?recipe=sopaipillas-de-betarraga", ingredientes: ["400 g de betarraga pelada y cortada en cuartos", "460 g de harina", "75 g de manteca", "", ""] },
  { nombre: "PATÉ DE TOMATES", link: "https://www.recetasthermomix.cl/?recipe=pate-de-tomates", ingredientes: ["70 g de  tomates secos", "10 g de diente de ajo", "150 g de pimentón rojos", "200 g de cebolla", "30 g de aceite de oliva", "½ cdta. de paprika", "1 cdta.  de orégano", "½ cdta. de albahaca seca", "½ cdta. raza de comino", "1 trozo de piel de limón de unos 2 x 5 cm", "100 gr de nueces", "1 cdta gelatina sin sabor", "", ""] },
  { nombre: "PIZZA AL ESTILO NAPOLITANA", link: "https://www.recetasthermomix.cl/?recipe=pizza-al-estilo-napolitana", ingredientes: ["10 g de levadura fresca", "10 g de miel", "250 g de harina ", "2 bolas de mozzarella fresca", "150 g de pulpa de tomate (passata)", "1 cucharadita de orégano seco", "20 g de aceite de oliva", "hojas de albahaca fresca"] },
  { nombre: "QUESADILLAS DE ALCACHOFAS Y ESPINACAS", link: "https://www.recetasthermomix.cl/?recipe=quesadillas-de-alcachofas-y-espinacas", ingredientes: ["150 g de hojas de espinaca frescas", "30 g de aceite de oliva", "200 g de alcachofas congeladas o en conserva", "30 g de leche", "150 g de queso cremoso", "150 g de queso mozzarella rallada", "50 g de queso parmesano rallado", "8 tortillas de trigo", "", ""] },
  { nombre: "FOCACCIA DE PAPA Y ROMERO", link: "https://www.recetasthermomix.cl/?recipe=focaccia-de-papa-y-romero", ingredientes: ["1 cucharadita de azúcar", "10 g de levadura seca instantánea", "2 cucharaditas de orégano", "400 g de harina", "30 g de aceite de oliva, y un poco más para engrasar", "20 g de cebolla morada, fileteada", "100 g de papa, en rodajas muy finas", "2 ramitas de romero, solamente las hojas", "2 cucharaditas de sal gruesa", "3 cucharaditas de aceite de albahaca", "", ""] },
];

const Dulce = [
  { nombre: "BRIGADEIROS", link: "https://www.recetasthermomix.cl/?recipe=brigadeiros", ingredientes: ["370 g de leche condensada", "30 g de cacao amargo en polvo", "40 g de mantequilla", "150 g de mostacillas de chocolate o cacao amargo en polvo", "", ""] },
  { nombre: "Cake de chocolate cuatro cuartos", link: "https://www.recetasthermomix.cl/?recipe=cake-de-chocolate-cuatro-cuartos", ingredientes: ["200 g de mantequilla a temperatura ambiente (y un poco más para untar)", "200 g de azúcar", "4 huevos", "1 cucharada de vainilla líquida", "200 g de harina sin polvos de hornear (y un poco más para enharinar)", "1 sobre de polvo de hornear", "30 g de cacao puro en polvo", "azúcar flor para espolvorear", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },
  { nombre: "GALLETAS CON AVENA, ALMENDRA Y CHOCOLATE", link: "https://www.recetasthermomix.cl/?recipe=galletas-con-avena-almendra-y-chocolate", ingredientes: ["115 g de mantequilla sin sal, en cubos y a temperatura ambiente", "50 g de azúcar mascabado", "100 g de azúcar estandar", "140 g de harina", "½ cdita de bicarbonato de sodio", "½ cdita de polvo para hornear", "1 huevo", "1 cdita de esencia de vainilla", "120 g de copos de avena", "50 g almendras fileteadas", "50 g de chocolate (negro o blanco), en trozos o bien 50 g de chispas de chocolate (negro o blanco)", "", ""] },
  { nombre: "BLONDIES CON ALMENDRAS Y FRUTOS ROJOS", link: "https://www.recetasthermomix.cl/?recipe=blondies-con-almendras-y-frutos-rojos", ingredientes: ["250 g de harina sin polvos de hornear", "100 g de azúcar", "15 g de polvos de hornear", "2 cucharadas de coco rallado", "100 g de mantequilla a temperatura ambiente cortada en trozos", "2 huevos", "180 g de chocolate blanco en cortado en trozos de 1 cm aprox.", "40 g de arándanos congelados", "40 g de frambuesas congeladas", "10-15 g de almendras laminadas", "", ""] },
  { nombre: "Bizcocho de manzana", link: "https://www.recetasthermomix.cl/?recipe=bizcocho-de-manzana", ingredientes: ["130 g de mantequilla blanda en trozos (y algo más para engrasar el molde)", "3 - 4 manzanas ácidas (aprox. 180 g cada una)", "3 huevos", "150 g de azúcar", "30 g de brandy (opcional)", "200 g de harina", "1 cucharada de polvos para hornear (15 g)", "azúcar flor para espolvorear", "", ""] },
  { nombre: "1", link: "", ingredientes: ["", "", ""] },

];

const listas = {
  "Lunes": Carne,
  "Martes": Legumbre,
  "Miércoles": Pescado,
  "Jueves": Pollo,
  "Viernes": Verdura,
  "Sábado": Aperitivo,
  "Domingo": Dulce
};

// -----------------------------------------------------
// 2. Calcular la semana actual del año
// -----------------------------------------------------
function numeroSemana(fecha) {
  const f = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  
  const diaSemana = (f.getDay() + 6) % 7;
  f.setDate(f.getDate() - diaSemana + 3);

  const inicioAno = new Date(f.getFullYear(), 0, 4);
  const diaInicio = (inicioAno.getDay() + 6) % 7;
  inicioAno.setDate(inicioAno.getDate() - diaInicio + 3);

  const diff = f - inicioAno;
  return 1 + Math.round(diff / (7 * 24 * 3600 * 1000));
}

// -----------------------------------------------------
// Obtener fechas reales de Lunes a Viernes
//Funciones para formatear día y mes
//Obtener semana actual y fechas L–V
// -----------------------------------------------------
function obtenerDiasSemana(fecha) {
  const f = new Date(fecha);
  const diaSemana = f.getDay(); // 0=Domingo, 1=Lunes...

  // Mover la fecha al lunes de esa semana
  const lunes = new Date(f);
  lunes.setDate(f.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));

  const dias = {};
  const nombres = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  nombres.forEach((nombre, i) => {
    const d = new Date(lunes);
    d.setDate(lunes.getDate() + i);
    dias[nombre] = d;
  });

  return dias;
}

function formatoDia(d) {
  return d.getDate();
}

function formatoMes(d) {
  return d.toLocaleString("es-ES", { month: "short" });
}

const fechaHoy = new Date();
const semanaActual = numeroSemana(fechaHoy);
const fechasSemana = obtenerDiasSemana(fechaHoy);


// -----------------------------------------------------
// 3. Mostrar recetas según rotación semanal
// -----------------------------------------------------
let html = "";
let ingredientesTotales = [];

Object.keys(listas).forEach(dia => {
  const lista = listas[dia];
  const indexReceta = semanaActual % lista.length;
  const receta = lista[indexReceta];

  const fechaDelDia = fechasSemana[dia]; // ← fecha real del día correspondiente

  html += `
    <div class="event-item" data-aos="fade-up">
      <div class="event-date">
        <span class="day">${formatoDia(fechaDelDia)}</span>
        <span class="month">${formatoMes(fechaDelDia)}</span>
      </div>
      <div class="event-content">
        <h3>${dia}</h3>
        <p>${receta.nombre}</p>
        <a href="${receta.link}" target="_blank" class="btn-event">Ver receta <em class="bi bi-arrow-right"></em></a>
      </div>    
    </div>
  `;

  ingredientesTotales.push(...receta.ingredientes);
});

document.getElementById("recetas").innerHTML = html;

// -----------------------------------------------------
// 4. Mostrar ingredientes totales
// -----------------------------------------------------
document.getElementById("total-ingredientes").innerHTML =
  ingredientesTotales.map(i => `<li>${i}</li>`).join("");

// -----------------------------------------------------
// 5. Generar calendario del mes
// -----------------------------------------------------

function generarCalendario(fecha) {
  const año = fecha.getFullYear();
  const mes = fecha.getMonth();
  const primerDia = new Date(año, mes, 1);
  const ultimoDia = new Date(año, mes + 1, 0);
  const numDiasMes = ultimoDia.getDate();

  let html = `<div class="calendar-header"><h4>${fecha.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</h4></div>`;
  html += `<div class="calendar-body"><div class="weekdays">`;
  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  diasSemana.forEach(d => html += `<div>${d}</div>`);
  html += `</div><div class="days">`;

  // Ajuste: si domingo = 0, mantenerlo como 0 (CSS grid ya lo alinea)
  let diaSemanaPrimer = primerDia.getDay();

  // Días vacíos antes del 1
  for (let i = 1; i < diaSemanaPrimer; i++) {
    html += `<div class="day other-month"></div>`;
  }


  // Días del mes
  for (let dia = 1; dia <= numDiasMes; dia++) {
    const fechaTemp = new Date(año, mes, dia);
    const semanaDia = numeroSemana(fechaTemp);
    const diaNum = fechaTemp.getDay();

// Resaltar solo lunes-viernes de la semana actual
    const esSemanaActual = semanaDia === semanaActual;
    let clase = "day";

    if (esSemanaActual && diaNum >= 0 && diaNum <= 6) {
      clase += " has-event";
    }

    html += `<div class="${clase}">${dia}</div>`;
  }

  html += "</div></div>";

  return html;
}

document.getElementById("calendario").innerHTML = generarCalendario(new Date());



// fin que comer
document.addEventListener("DOMContentLoaded", () => {
  inicializarCalculadora();
});

// inicio calculadora de proteínas 


// fin calculadora de proteínas 

// inicio boleta honorarios

// fin boleta de honorarios

// fin mini soluciones