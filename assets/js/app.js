(() => {
  const titles = {overview:"Visão geral",matches:"Jogos",analysis:"Análises",history:"Histórico"};
  const navItems = [...document.querySelectorAll(".nav-item")];
  const breadcrumb = document.getElementById("breadcrumbPage");
  const pageTitle = document.getElementById("pageTitle");
  const toast = document.getElementById("toast");
  let activeSport = "football";
  let toastTimer;

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function setView(view) {
    if (!titles[view]) return;
    navItems.forEach(item => item.classList.toggle("active", item.dataset.view === view));
    pageTitle.textContent = titles[view];
    breadcrumb.textContent = titles[view];
    if (view !== "overview") notify("Esta área será ativada na próxima etapa de desenvolvimento.");
    document.getElementById("sidebar").classList.remove("open");
  }

  navItems.forEach(item => item.addEventListener("click", () => setView(item.dataset.view)));
  document.querySelectorAll("[data-view-link]").forEach(button => button.addEventListener("click", () => setView(button.dataset.viewLink)));

  document.querySelectorAll(".sport-tab").forEach(button => {
    button.addEventListener("click", () => {
      activeSport = button.dataset.sport;
      document.querySelectorAll(".sport-tab").forEach(tab => tab.classList.toggle("selected", tab === button));
      document.querySelector(".empty-ball").textContent = activeSport === "football" ? "⚽" : "🏀";
      document.getElementById("gameSearch").placeholder = activeSport === "football" ? "Buscar time ou campeonato..." : "Buscar equipe ou liga...";
    });
  });

  document.getElementById("gameSearch").addEventListener("input", event => {
    if (event.target.value.trim()) notify("A busca será aplicada quando a fonte de jogos estiver conectada.");
  });
  document.getElementById("filterButton").addEventListener("click", () => notify("Os filtros serão liberados com a integração dos jogos."));
  document.getElementById("dateButton").addEventListener("click", () => notify("A seleção de datas será ativada com a agenda esportiva."));
  document.getElementById("mobileMenu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));

  const now = new Date();
  const formatted = new Intl.DateTimeFormat("pt-BR", {weekday:"long",day:"2-digit",month:"long"}).format(now);
  document.querySelector(".welcome-row .eyebrow").textContent = formatted.toLocaleUpperCase("pt-BR");
  document.getElementById("todayLabel").textContent = new Intl.DateTimeFormat("pt-BR", {day:"2-digit",month:"short"}).format(now);
})();