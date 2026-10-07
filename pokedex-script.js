const tela = document.getElementById("tela");
const form = document.getElementById("form");
const busca = document.getElementById("busca");

const coresTipo = {
  fire: "#f08030", water: "#6890f0", grass: "#78c850", electric: "#f8d030",
  normal: "#a8a878", ice: "#98d8d8", fighting: "#c03028", poison: "#a040a0",
  ground: "#e0c068", flying: "#a890f0", psychic: "#f85888", bug: "#a8b820",
  rock: "#b8a038", ghost: "#705898", dragon: "#7038f8", dark: "#705848",
  steel: "#b8b8d0", fairy: "#ee99ac",
};

async function buscarPokemon(termo) {
  tela.innerHTML = '<p class="placeholder">carregando...</p>';
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);
    if (!resposta.ok) throw new Error("não encontrado");
    const dados = await resposta.json();
    renderizarPokemon(dados);
  } catch (e) {
    tela.innerHTML = '<p class="erro">pokémon não encontrado</p>';
  }
}

function renderizarPokemon(p) {
  const sprite = p.sprites.front_default || "";
  const numero = String(p.id).padStart(3, "0");

  const tipos = p.types.map(t => {
    const cor = coresTipo[t.type.name] || "#0f380f";
    return `<span class="tipo" style="background:${cor}33;border-color:${cor}">${t.type.name}</span>`;
  }).join("");

  const statsPrincipais = ["hp", "attack", "defense", "speed"];
  const stats = statsPrincipais.map(nome => {
    const s = p.stats.find(s => s.stat.name === nome);
    const valor = s ? s.base_stat : 0;
    const largura = Math.min(100, (valor / 150) * 100);
    return `
      <div class="stat-linha">
        <span class="stat-nome">${nome}</span>
        <span class="stat-barra"><span class="stat-fill" style="width:${largura}%"></span></span>
        <span class="stat-valor">${valor}</span>
      </div>
    `;
  }).join("");

  tela.innerHTML = `
    <div class="cartao-topo">
      <span class="cartao-nome">${p.name}</span>
      <span class="cartao-num">#${numero}</span>
    </div>
    <div class="sprite-wrap"><img src="${sprite}" alt="${p.name}"></div>
    <div class="tipos">${tipos}</div>
    <div class="stats">${stats}</div>
  `;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const termo = busca.value.trim().toLowerCase();
  if (!termo) return;
  buscarPokemon(termo);
});

buscarPokemon("pikachu");
