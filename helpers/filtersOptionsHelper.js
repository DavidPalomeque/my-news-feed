const filterOptions = require("./filterOptions.json")

exports.keepFiltersOptionsConstant = function (data) {
    let options = filterOptions.options;
    
    // cada array dentro de options es iterado
    // si el valor de la opción es igual al valor enviado por el usuario, se le agrega la propiedad "selected"
    // sino es igual, se le quita la propiedad "selected"
    // aquellos con la propiedad (solo uno por array), serán la opción elegida en el selector

    // endpoint
    options.endpoint.forEach(o => {
        if (o.value === data.endpoint) {
          o.selected = true
        } else {
          delete o.selected
        }
    });
    
    // language
    options.language.forEach( o => {
        if (o.value === data.language) {
          o.selected = true
        } else {
          delete o.selected
        }
    })
    
    // date
    options.date.forEach( o => {
        if (o.value === data.date) {
          o.selected = true
        } else {
          delete o.selected
        }
    })
    
    // sortBy
    options.sortBy.forEach( o => {
        if (o.value === data.sortBy) {
          o.selected = true
        } else {
          delete o.selected
        }
    })

    return options;
}