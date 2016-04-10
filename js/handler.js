function loadPokedex(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
          // обработать ошибку
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          // вывести результат
          var json_result = xhr.responseText;
          var object_result = JSON.parse(json_result);
          var objects = object_result.objects;
          
          var types = {
            flying : "info",
            fire : "danger",
            water : "primary",
            grass : "success",
            electric : "warning",
          };

          var html_pokemon = '';
          var num = 3;
          var i = 1;
          for (var key in objects) {
            var pokemon = objects[key];
            var type_pokedex = '';
            var types_object = pokemon.types;
            for (var key_type in types_object) {
                if(types_object[key_type].name in types)
                    type_pokedex = type_pokedex + '<button type="button" class="btn button_pokedex btn-' + types[types_object[key_type].name] + '">' + types_object[key_type].name + '</button>';
                else
                    type_pokedex = type_pokedex + '<button type="button" class="btn button_pokedex btn-default">' + types_object[key_type].name + '</button>';
            }
            
            
            if(i == 1)
                html_pokemon = '<div class="row">';
                
            html_pokemon = html_pokemon + '<div class="col-md-4"><div class="item" onclick="loadSinglePokemon(' + pokemon.pkdx_id + ');">\
                <div class="image_pokedex"><img src="http://pokeapi.co/media/img/' + pokemon.pkdx_id + '.png" class="img-responsive" alt="' + pokemon.name + '"></div>\
                <p class="name_pokedex"><strong>' + pokemon.name + '</strong></p>\
                <p class="type_pokedex">' + type_pokedex + '</p>\
                </div></div>';
            
            if(i % num == 0 && i != 12)
                html_pokemon = html_pokemon + '</div><div class="row">';

            if(i == 12)
                html_pokemon = html_pokemon + '</div>';
            i++;
          }

          var body_pokedex = document.getElementById('body_pokedex');
          loader.style.display = "none";
          body_pokedex.innerHTML = html_pokemon;
        }
      }
}

//setup loader in the center of the window
var loader = document.getElementById('loader');
var top_loader = document.documentElement.clientHeight / 2 - 150;
var left_loader = document.documentElement.clientWidth / 2 - 150;

loader.style.top = top_loader + 'px';
loader.style.left = left_loader + 'px';
loader.style.display = "block";
    
function loadSinglePokemon(id) {
    alert(id);
}

















