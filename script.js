'use strict';

const btnNav = document.querySelector('.navigation__buttton');
const navBackground = document.querySelector('.navigation__background');
const main = document.querySelector('.main');
const navLink = [...document.querySelectorAll('.navigation__link')];
const navList = document.querySelector('.navigation__list');
const content = [...document.querySelectorAll('.content')];

const repoInfo = document.querySelector('.repository__info');
const repoTabContainer = document.querySelector('.repository__tab-container');
const repoTabBtn = [...document.querySelectorAll('.repository__tab-btn')];
const repoContent = [...document.querySelectorAll('.repository__content')];
const contentProjects = document.querySelector('.repository__content-projects');
const contentGame = document.querySelector('.repository__content-game');
const contentWebsite = document.querySelector('.repository__content-website');
const input = document.querySelector('.search__input');

const findMeLinksContainer = document.querySelector('.findMe__links-container');

///////////////////////////////////

btnNav.addEventListener('click', function (e) {
  const clicked = e.target.closest('.navigation__buttton');

  if (!clicked) return;

  if (clicked) navBackground.classList.toggle('activeNav');
});

///////////////////////////////////

navList.addEventListener('click', function (e) {
  const clicked = e.target.closest('.navigation__link');

  if (!clicked) return;

  if (clicked) navBackground.classList.remove('activeNav');

  content.forEach(e => e.classList.add('hidden'));

  document
    .querySelector(`.content--${clicked.dataset.tab}`)
    .classList.remove('hidden');
});

///////////////////////////////////
// A P I

const username = 'LissbethE';
const maxPages = 3;
const hideForks = true;

// for programming language icons
const devicons = {
  Git: '<i class="devicon-git-plain colored" ></i>',
  Github: '<i class="devicon-github-plain colored"></i>',
  Chrome: '<i class="devicon-chrome-plain colored"></i>',
  Assembly: '<i class="devicon-labview-plain colored"></i> Assembly',
  'C#': '<i class="devicon-csharp-plain colored"></i> C#',
  'C++': '<i class="devicon-cplusplus-plain colored"></i> C++',
  C: '<i class="devicon-c-plain colored"></i> C',
  Clojure: '<i class="devicon-clojure-plain colored"></i> C',
  CoffeeScript:
    '<i class="devicon-coffeescript-plain colored"></i> CoffeeScript',
  Crystal: '<i class="devicon-crystal-plain colored"></i> Crystal',
  CSS: '<i class="devicon-css3-plain colored"></i> CSS',
  Dart: '<i class="devicon-dart-plain colored"></i> Dart',
  Dockerfile: '<i class="devicon-docker-plain colored"></i> Docker',
  Elixir: '<i class="devicon-elixir-plain colored"></i> Elixir',
  Elm: '<i class="devicon-elm-plain colored"></i> Elm',
  Erlang: '<i class="devicon-erlang-plain colored"></i> Erlang',
  'F#': '<i class="devicon-fsharp-plain colored"></i> F#',
  Go: '<i class="devicon-go-plain colored"></i> Go',
  Groovy: '<i class="devicon-groovy-plain colored"></i> Groovy',
  HTML: '<i class="devicon-html5-plain colored"></i> HTML',
  Haskell: '<i class="devicon-haskell-plain colored"></i> Haskell',
  Java: '<i class="devicon-java-plain colored" colored></i> Java',
  JavaScript: '<i class="devicon-javascript-plain colored"></i> JavaScript',
  Julia: '<i class="devicon-julia-plain colored"></i> Julia',
  'Jupyter Notebook': '<i class="devicon-jupyter-plain colored"></i> Jupyter',
  Kotlin: '<i class="devicon-kotlin-plain colored" colored></i> Kotlin',
  Latex: '<i class="devicon-latex-plain colored"></i> Latex',
  Lua: '<i class="devicon-lua-plain-wordmark colored" colored></i> Lua',
  Matlab: '<i class="devicon-matlab-plain colored"></i> Matlab',
  Nim: '<i class="devicon-nixos-plain colored" colored></i> Nim',
  Nix: '<i class="devicon-nixos-plain colored"></i> Nix',
  ObjectiveC: '<i class="devicon-objectivec-plain colored"></i> ObjectiveC',
  OCaml: '<i class="devicon-ocaml-plain colored"></i> OCaml',
  Perl: '<i class="devicon-perl-plain colored"></i> Perl',
  PHP: '<i class="devicon-php-plain colored"></i> PHP',
  PLSQL: '<i class="devicon-sqlite-plain colored"></i> PLSQL',
  Processing:
    '<i class="devicon-processing-plain colored" colored></i> Processing',
  Python: '<i class="devicon-python-plain colored" colored></i> Python',
  R: '<i class="devicon-r-plain colored"></i> R',
  Ruby: '<i class="devicon-ruby-plain colored"></i> Ruby',
  Rust: '<i class="devicon-rust-plain colored" colored></i> Rust',
  Sass: '<i class="devicon-sass-original colored"></i> Sass',
  SCSS: '<i class="devicon-sass-original colored"></i> Sass',
  Scala: '<i class="devicon-scala-plain colored"></i> Scala',
  Shell: '<i class="devicon-bash-plain colored" colored></i> Shell',
  Solidity: '<i class="devicon-solidity-plain colored"></i> Solidity',
  Stylus: '<i class="devicon-stylus-plain colored"></i> Stylus',
  Svelte: '<i class="devicon-svelte-plain colored"></i> Svelte',
  Swift: '<i class="devicon-swift-plain colored"></i> Swift',
  Terraform: '<i class="devicon-terraform-plain colored"></i> Terraform',
  TypeScript: '<i class="devicon-typescript-plain colored"></i> TypeScript',
  'Vim Script': '<i class="devicon-vim-plain colored"></i> Vim Script',
  Vue: '<i class="devicon-vuejs-plain colored"></i> Vue',
};

const getJSON = function (url, errorMsg = 'Something went wrong😕💥') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg}, Code: ${response.status}`);

    return response.json();
  });
};

const renderProfile = function (data) {
  const html = `
      <h1 class="heading-1">${data.name}</h1>
      <p class="paragraph header__p u-center-text u-margin-bottom-small">${data.bio}</p>
  `;

  const paragraphs = `
        <p class="repository__p paragraph ${
          data.location ? 'visible' : 'hidden'
        }">
          <strong>Location: </strong> ${data.location}
        </p>

        <p class="repository__p paragraph">
          <strong>Username:</strong>
          <a href=${data.html_url} class="repository__link">@LissbethE</a>
        </p>

        <p class="repository__p paragraph">
          <strong>Repos:</strong>${data.public_repos}
        </p>

        <p class="paragraph">
          <strong>Gists: </strong> ${data.public_gists}
        </p>
  `;

  repoInfo.insertAdjacentHTML('afterbegin', html);
  document
    .querySelector('.repository__txt')
    .insertAdjacentHTML('afterbegin', paragraphs);
};

const renderRepositories = function (data) {
  let html = ``;
  let games = ``;
  let website = ``;
  const userHome = `https://github.com/${username}`;
  input.classList.remove('hidden');

  for (const e of data) {
    if (e.fork && hideForks) {
      continue;
    }

    const langUrl = `${userHome}?tab=repositories&q=&language=${e.language}`;
    const starsUrl = `${userHome}/${e.name}/stargazers`;
    const page = `https://lissbethe.github.io/${e.name}/`;

    // Para los juegos
    if (e.name.toLowerCase().indexOf('game') !== -1) {
      games += `
      <div class="card">
        <h3 class="card__title">${e.name}</h3>
        <p class="card__paragraph">${e.description ? e.description : ''}</p>

        <div class="card__container-links">
          <a href="${starsUrl}"
          class="${e.stargazers_count > 0 ? 'visible' : 'hidden'}">
            ⭐ ${e.stargazers_count}
          </a>

          <a href="${langUrl}" class="${e.language ? 'visible' : 'hidden'}">
            ${devicons[e.language]}
          </a>

          <a href="${starsUrl}" 
          class="${e.forks_count > 0 ? 'visible' : 'hidden'}">
            ${devicons.Git} ${e.forks_count}
          </a>
        </div>

        <div class="card__btn">
          <a href="${e.html_url}" target="_blank">
            ${e.homepage && e.homepage !== '' ? 'Code' : 'View Project'}
            ${devicons.Github}
          </a>

          <a href="${page}" target="_blank"
          class="${e.has_pages && e.has_pages !== '' ? 'visible' : 'hidden'}">
            Live ${devicons.Chrome}
          </a>
        </div>
      </div>
    `;
    }

    // Para las paginas
    else if (e.name.toLowerCase().indexOf('website') !== -1) {
      website += `
      <div class="card">
        <h3 class="card__title">${e.name}</h3>
        <p class="card__paragraph">${e.description ? e.description : ''}</p>

        <div class="card__container-links">
          <a href="${starsUrl}"
          class="${e.stargazers_count > 0 ? 'visible' : 'hidden'}">
            ⭐ ${e.stargazers_count}
          </a>

          <a href="${langUrl}" class="${e.language ? 'visible' : 'hidden'}">
            ${devicons[e.language]}
          </a>

          <a href="${starsUrl}" 
          class="${e.forks_count > 0 ? 'visible' : 'hidden'}">
            ${devicons.Git} ${e.forks_count}
          </a>
        </div>

        <div class="card__btn">
          <a href="${e.html_url}" target="_blank">
            ${e.homepage && e.homepage !== '' ? 'Code' : 'View Project'}
            ${devicons.Github}
          </a>

          <a href="${page}" target="_blank"
          class="${e.has_pages && e.has_pages !== '' ? 'visible' : 'hidden'}">
            Live ${devicons.Chrome}
          </a>
        </div>
      </div>
    `;
    }

    // Para los otros proyectos
    else {
      html += `
      <div class="card">
          <h3 class="card__title">${e.name}</h3>
          <p class="card__paragraph">${e.description ? e.description : ''}</p>

        <div class="card__container-links">
          <a href="${starsUrl}"
          class="${e.stargazers_count > 0 ? 'visible' : 'hidden'}">
            ⭐ ${e.stargazers_count}
          </a>

          <a href="${langUrl}" class="${e.language ? 'visible' : 'hidden'}">
            ${devicons[e.language]}
          </a>

          <a href="${starsUrl}" 
          class="${e.forks_count > 0 ? 'visible' : 'hidden'}">
            ${devicons.Git} ${e.forks_count}
          </a>
        </div>

        <div class="card__btn">
          <a href="${e.html_url}" target="_blank">
            ${e.homepage && e.homepage !== '' ? 'Code' : 'View Project'}
            ${devicons.Github}
          </a>

          <a href="${page}" target="_blank"
          class="${e.has_pages && e.has_pages !== '' ? 'visible' : 'hidden'}">
            Live ${devicons.Chrome}
          </a>
        </div>
      </div>
    `;
    }
  }

  contentProjects.insertAdjacentHTML('afterbegin', html);
  contentWebsite.insertAdjacentHTML('afterbegin', website);
  contentGame.insertAdjacentHTML('afterbegin', games);
};

// Get github profile
const getProfile = function () {
  getJSON(`https://api.github.com/users/${username}`).then(data =>
    renderProfile(data)
  );
};

// Get repository
const getRepos = function () {
  for (let i = 1; i <= maxPages; i++) {
    getJSON(
      `https://api.github.com/users/${username}/repos?&sort=pushed&per_page=100&page=${i}`
    ).then(data => renderRepositories(data));
  }
};

// dynamic search
input.addEventListener('input', e => {
  const search = e.target.value;
  const repos = [...document.querySelectorAll('.card')];
  const searchLowerText = search.toLowerCase();

  for (const repo of repos) {
    const lowerText = repo.innerText.toLowerCase();
    if (lowerText.includes(searchLowerText)) {
      repo.classList.remove('hidden');
    } else {
      repo.classList.add('hidden');
    }
  }
});

repoTabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.repository__tab-btn');

  if (!clicked) return;

  repoTabBtn.forEach(e => e.classList.remove('repository__tab-btn--active'));
  repoContent.forEach(e => e.classList.add('hidden'));

  clicked.classList.add('repository__tab-btn--active');

  document
    .querySelector(`.repository__content--${clicked.dataset.tab}`)
    .classList.remove('hidden');
});

getProfile();
getRepos();
