//Creacion de un evento para la captura de los datos
$("#searchUser").on("keyup", function(e) {
  let username = e.target.value;

  //Peticion mediante el api
  $.ajax({
    url: "https://api.github.com/users/" + username,
    data: {
      client_id: "76fd1f8a6fef520eb617",
      client_secret: "611025889dc5a9fefcbdfbc699fb7eed5f77a2cd"
    }
  }).done(function(user) {
    
    $.ajax({
      url: "https://api.github.com/users/" + username + "/repos",
      data: {
        client_id: "76fd1f8a6fef520eb617",
        client_secret: "611025889dc5a9fefcbdfbc699fb7eed5f77a2cd",
        sort: "created: asc", //ordenamiento de los repositorios
        per_page: 5 //Numero de repositorios a mostrar
      }
    }).done(function(repos) {
      //traemos los datos de los repositorios
      $.each(repos, function(index, repo) {
        $("#repos").append(`
    <strong>${repo.name}</strong>: ${repo.description}
   

    
    <span class="label label-default">Forks: ${repo.forks_count}</span>
    <span class="label label-primary">Visualizaciones: ${repo.watchers_count}</span>
    <span class="label label-success">Estrellas: ${repo.stargazers_count}</span>
    

   
    <a target="_blank" class="btn btn-danger btn-block" href="${repo.html_url}">Ver Repo</a>



  `);
      });
    });

    //Traemos los datos del usuario
    $("#profile").html(`
                          <h1>Perfil:</h1>
                          <h3 class="panel-title">${user.name}</h3>
                        
                
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">Ver perfil</a>
                
                
                <span class="label label-default"><b>Repos:</b> ${user.public_repos}</span>
                <span class="label label-primary"><b>Gits:</b> ${user.public_gists}</span>
                <span class="label label-success"><b>Seguidores:</b> ${user.followers}</span>
                <span class="label label-info"><b>Seguidos:</b> ${user.following}</span>
                <br><br>
                <ul class="list-group">
                <li class="listgroup-item"><b>Compañia:</b> ${user.company}</li>
                <li class="listgroup-item"><b>Website/blog:</b> ${user.blog}</li>
                <li class="listgroup-item"><b>Ubicacion:</b> ${user.location}</li>
                <li class="listgroup-item"><b>Miembro desde:</b> ${user.created_at}</li>
                </ul>
                <h1>Repositorios:</h1>
                <br>
                <div id="repos"></div>



`);
  });
});


