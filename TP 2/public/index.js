const username = 'augustbiza'; // Substitua pelo nome de usuário desejado
const apiUrl = `https://api.github.com/users/${username}`;

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
    })
    .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
