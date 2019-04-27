//Guardar objetos en el localStorage
$myLocalStorage = (function(){
    var name = null;
    return {
        set: function(k, value){
            localStorage.setItem(k, JSON.stringify(value));
        },
        get: function(k){
            var data = localStorage[k];

            if(data === undefined) throw 'Key no inicializada';

            return JSON.parse(data);
        },
        remove: function(k){
            localStorage.removeItem(k);
        }
    };
})();