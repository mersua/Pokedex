/*function ajax(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            if (this.status == 200)
                callback(JSON.parse(this.responseText));
            // иначе сетевая ошибка
        }
    };
    xhr.send(null);
}

ajax('http://pokeapi.co/api/v1/pokemon/?limit=12', function(data){
    alert(JSON.stringify(data));
});*/

function loadPhones() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://pokeapi.co/api/v1/pokemon/?limit=12', true);
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        button.innerHTML = 'Готово!';

        if (xhr.status != 200) {
          // обработать ошибку
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          // вывести результат
          var result = xhr.responseText;
          alert(result);
        }
      }

      button.innerHTML = 'Загружаю...';
      button.disabled = true;
}
