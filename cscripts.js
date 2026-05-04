// Função para carregar e inserir arquivos HTML dinamicamente
function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${file}: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Adiciona lógica para destacar a aba ativa somente após o carregamento da navbar
      if (id === "sidebar") {
        const currentPage = window.location.pathname.split("/").pop();
        const links = document.querySelectorAll("#sidebar .nav-link");

        links.forEach(link => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });
      }
    })
    .catch(error => console.error("Erro ao carregar o componente:", error));
}

// Carrega os componentes na página
loadComponent("header", "cheader.html");
loadComponent("navbar", "csidebar.html");
loadComponent("footer", "cfooter.html");

  // Utilitários
  const select = (el, all = false) => {
    el = el.trim();
    if (all) return [...document.querySelectorAll(el)];
    else return document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) selectEl.forEach(e => e.addEventListener(type, listener));
      else selectEl.addEventListener(type, listener);
    }
  };

  // Alternar menu mobile
  on('click', '.mobile-nav-toggle', function () {
    select('#sidebar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });