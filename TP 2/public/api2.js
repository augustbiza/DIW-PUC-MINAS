const repositories = document.querySelector('.repositorios');

function getApigithub() {
    fetch('https://api.github.com/users/LucasReis26/repos')
    .then(async res => {
        if( !res.ok ) {
            throw new Error(res.status)
        }

        let data = await res.json();

        data.map( item => {
            let project = document.createElement('div');

            project.innerHTML = `
            <div class="repo">
                <div>
                    <h4 class="titulo-repo">${item.name}</h4>
                    <span class="data">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at)) }</span>
                </div>
                <div>
                    <a href="${ item.html_url}" target="_blank">${item.html_url}</a>
                    <span class="lang"><span class="bola"></span>${item.language}</span>
                </div>
            </div>
            `

            repositories.appendChild(project);
        })
    })
}

getApigithub()