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
  Dockerfile: '<i class="devicon-docker-plain colored"></i> Docker',

  HTML: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',

  CSS: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',

  Sass: 'https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white',

  SCSS: 'https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white',

  Tailwind:
    'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white',

  Bootstrap:
    'https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white',

  Go: 'https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white',

  JavaScript:
    'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',

  TypeScript:
    'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white',

  Python:
    'https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white',

  Java: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white',

  React_Native:
    'https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',

  React:
    'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',

  Angular:
    'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white',

  Vue: 'https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D',

  Node: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white',

  Express: 'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge',

  MongoDB:
    'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white',

  PostgreSQL:
    'https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white',

  MySQL:
    'https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white',

  SQLite:
    '	https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white',

  PHP: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',

  Shell:
    'https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white',
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
      <p class="paragraph header__p u-center-text">${data.bio}</p>
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

const renderRepositories = function (datos) {
  let html = ``;
  let games = ``;
  let project = ``;
  let website = ``;
  const userHome = `https://github.com/${username}`;
  input.classList.remove('hidden');

  for (const data of datos) {
    if (data.fork && hideForks) {
      continue;
    }
    const langUrl = `${userHome}?tab=repositories&q=&language=${data.language}`;
    const starsUrl = `${userHome}/${data.name}/stargazers`;
    const page = `https://lissbethe.github.io/${data.name}/`;

    html = `
    <div class="card">
      <h3 class="card__title">${data.name}</h3>
      <p class="card__paragraph ${data.description || 'hidden'}">
        ${data.description}
      </p>
      
      <div class="card__container-icons">
        <a href="${starsUrl}"
        class="card__start ${data.stargazers_count || 'hidden'}
                           ${data.language && 'border'}
                           ${data.forks_count && 'border'}">
          <span>⭐</span>
          <span>${data.stargazers_count}</span>
        </a>

        <a href="${starsUrl}" class="card__git ${data.forks_count || 'hidden'}
                                    ${data.language && 'border'}">
         <span>${devicons.Git}</span> 
         <span>${data.forks_count}</span>
        </a>

        <img class="card__img ${data.language || 'hidden'}"
        src="${devicons[data.language]}" />
      </div>
      
      <div class="card__btn">
        <a href="${data.html_url}" target="_blank">
           ${data.homepage !== '' ? 'Code' : 'View Project'}
           ${devicons.Github}
        </a>
        
        <a href="${page}" target="_blank" class="${data.has_pages || 'hidden'}">
          Live ${devicons.Chrome}
        </a>
      </div>
    </div>`;

    if (data.name.toLowerCase().indexOf('game') !== -1) games += html;
    else if (data.name.toLowerCase().indexOf('website') !== -1) website += html;
    else project += html;
  }

  contentProjects.insertAdjacentHTML('afterbegin', project);
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
