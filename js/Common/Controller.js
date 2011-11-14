var Controller = Backbone.Router.extend({
    routes: {
        "": "start", // Пустой hash-тэг
        "!/": "start", // Начальная страница
        "!/about": "about"
    },

    start: function () {
    },

    about: function () {
        

    }

});
