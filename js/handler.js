//format number in 000 for pokemon id
function setupPrefInt(number, len) {
   return (Array(len).join('0') + number).slice(-len);
}

//setup loader in the center of the window
function position_loader() {
    var loader = document.getElementById('loader');
    var top_loader = document.documentElement.clientHeight / 2 - 150 + window.pageYOffset;
    var left_loader = document.documentElement.clientWidth / 2 - 150;
    loader.style.top = top_loader + 'px';
    loader.style.left = left_loader + 'px';
    loader.style.display = "block";
}

function loadPokedex(url) {
    position_loader();
    
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
                    type_pokedex = type_pokedex + '<button type="button" class="btn button_pokedex btn-' + types[types_object[key_type].name] + '">' + types_object[key_type].name.charAt(0).toUpperCase() + types_object[key_type].name.substr(1).toLowerCase() + '</button>';
                else
                    type_pokedex = type_pokedex + '<button type="button" class="btn button_pokedex btn-default">' + types_object[key_type].name.charAt(0).toUpperCase() + types_object[key_type].name.substr(1).toLowerCase() + '</button>';
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
                html_pokemon = html_pokemon + '</div><div class="row">\
                <div class="col-md-12 load_more">\
                    <button type="button" class="btn btn-load_more btn-primary" onclick="loadPokedex(\'http://pokeapi.co' + object_result.meta.next + '\');">Load More</button>\
                </div></div>';
            i++;
          }

          var body_pokedex = document.getElementById('body_pokedex');
          loader.style.display = "none";
          body_pokedex.innerHTML = body_pokedex.innerHTML + html_pokemon;
        }
      }
}

loadPokedex('http://pokeapi.co/api/v1/pokemon/?limit=12');

function loadSinglePokemon(id) {
    position_loader();
    var url_for_single_pokemon = 'http://pokeapi.co/api/v1/pokemon/' + id
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url_for_single_pokemon, true);
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
            
            var type_pokedex = '';
            var types_object = object_result.types;
            var x = 0;
            for (var key_type in types_object) {
                if(x == 0)
                    type_pokedex = type_pokedex + types_object[key_type].name.charAt(0).toUpperCase() + types_object[key_type].name.substr(1).toLowerCase();
                else
                    type_pokedex = type_pokedex + ', ' + types_object[key_type].name.charAt(0).toUpperCase() + types_object[key_type].name.substr(1).toLowerCase();
                x++;
            }
            
            var single_pokemon = '<div class="single_pokemon">\
            <div class="image_pokedex"><img src="http://pokeapi.co/media/img/' + object_result.pkdx_id + '.png" class="img-responsive" alt="' + object_result.name + '"></div>\
            <p class="name_pokemon"><strong>' + object_result.name + ' #' + setupPrefInt(object_result.pkdx_id, 3) + '</strong></p>\
            <table class="table table-bordered">\
            <tr><td>Type</td><td>' + type_pokedex + '</td></tr>\
            <tr><td>Attack</td><td>' + object_result.attack + '</td></tr>\
            <tr><td>Defense</td><td>' + object_result.defense + '</td></tr>\
            <tr><td>HP</td><td>' + object_result.hp + '</td></tr>\
            <tr><td>SP Attack</td><td>' + object_result.sp_atk + '</td></tr>\
            <tr><td>SP Defense</td><td>' + object_result.sp_def + '</td></tr>\
            <tr><td>Speed</td><td>' + object_result.speed + '</td></tr>\
            <tr><td>Weight</td><td>' + object_result.weight + '</td></tr>\
            <tr><td>Total moves</td><td>' + object_result.moves.length + '</td></tr>\
            </table>\
            </div>';
            
            var body_single_pokemon = document.getElementById('body_single_pokemon');
            loader.style.display = "none";
            body_single_pokemon.innerHTML = single_pokemon;
        }
    }
}
















