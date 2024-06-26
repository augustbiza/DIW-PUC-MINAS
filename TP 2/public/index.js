const username = 'augustbiza';
const apiUrl = `https://api.github.com/users/${username}`;
const carouselContent = [
    {
        image: "https://wallpapercave.com/wp/wp2721787.jpg",
        caption: "Programação",
        description: "Aprenda a programar com conteúdos incríveis."
    },
    {
        image: "https://wallpapercave.com/wp/wp5638874.jpg",
        caption: "Matemática",
        description: "Explore conceitos matemáticos avançados."
    },
    {
        image: "https://wallpapercave.com/wp/wp4700843.jpg",
        caption: "Física",
        description: "Entenda os princípios da física moderna."
    }
];

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const profileData = {
            login: data.login,
            avatar_url: data.avatar_url,
            bio: data.bio,
            repos: []
        };

        return fetch(data.repos_url)
            .then(response => response.json())
            .then(repos => {
                repos.forEach(repo => {
                    profileData.repos.push({
                        name: repo.name,
                        html_url: repo.html_url,
                        description: repo.description
                    });
                });

                return profileData;
            });
    })
    .then(profileData => {
        document.getElementById('avatar').src = profileData.avatar_url;
        document.getElementById('username').textContent = profileData.login;
        document.getElementById('bio').textContent = profileData.bio;

        const reposList = document.getElementById('repos');
        profileData.repos.forEach(repo => {
            const cardCol = document.createElement('div');
            cardCol.classList.add('col');

            const card = document.createElement('div');
            card.classList.add('card', 'h-100');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = repo.name;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = repo.description || 'Sem descrição';

            const cardLink = document.createElement('a');
            cardLink.classList.add('btn', 'btn-primary');
            cardLink.href = repo.html_url;
            cardLink.textContent = 'Ver Repositório';
            cardLink.target = '_blank';

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardLink);
            card.appendChild(cardBody);
            cardCol.appendChild(card);
            reposList.appendChild(cardCol);
        });

        const carouselIndicators = document.getElementById('carousel-indicators');
        const carouselInner = document.getElementById('carousel-inner');

        carouselContent.forEach((item, index) => {
            const indicator = document.createElement('button');
            indicator.type = "button";
            indicator.dataset.bsTarget = "#carouselExampleIndicators";
            indicator.dataset.bsSlideTo = index;
            if (index === 0) {
                indicator.classList.add('active');
                indicator.ariaCurrent = "true";
            }
            indicator.ariaLabel = `Slide ${index + 1}`;
            carouselIndicators.appendChild(indicator);

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const img = document.createElement('img');
            img.src = item.image;
            img.classList.add('d-block', 'w-100');
            img.alt = `Slide ${index + 1}`;

            const carouselCaption = document.createElement('div');
            carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');

            const captionTitle = document.createElement('h5');
            captionTitle.textContent = item.caption;

            const captionText = document.createElement('p');
            captionText.textContent = item.description;

            carouselCaption.appendChild(captionTitle);
            carouselCaption.appendChild(captionText);
            carouselItem.appendChild(img);
            carouselItem.appendChild(carouselCaption);
            carouselInner.appendChild(carouselItem);
        });
    })
    .catch(error => console.error('Erro ao buscar dados do GitHub:', error));


fetch('colleagues.json')
    .then(response => response.json())
    .then(colleagues => {
        const colleaguesList = document.getElementById('colleagues');
        colleagues.forEach(colleague => {
            const cardCol = document.createElement('div');
            cardCol.classList.add('col');

            const card = document.createElement('div');
            card.classList.add('card', 'h-100', 'text-center');

            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = colleague.photo;
            cardImg.alt = colleague.name;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = colleague.name;

            const cardSubtitle = document.createElement('h6');
            cardSubtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
            cardSubtitle.textContent = colleague.position;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = colleague.bio;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardSubtitle);
            cardBody.appendChild(cardText);
            card.appendChild(cardImg);
            card.appendChild(cardBody);
            cardCol.appendChild(card);
            colleaguesList.appendChild(cardCol);
        });
    })
    .catch(error => console.error('Erro ao buscar dados dos colegas:', error));
