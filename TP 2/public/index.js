const username = 'augustbiza';
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
                        html_url: repo.html_url
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
            const listItem = document.createElement('li');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.name;
            listItem.appendChild(repoLink);
            reposList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Falha ao carregar o perfil!', error));
