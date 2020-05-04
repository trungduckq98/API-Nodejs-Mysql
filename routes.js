var todo = require('./Models/model');

module.exports = {
  configure: function (app) {

    app.post('/products/create', function (req, res) {
      todo.create(req.body, res);
    });

    app.post('/products/mutablecreate', function (req, res) {
      todo.mutablecreate(req.body, res);
    });



    app.put('/products/update', function (req, res) {
      todo.update(req.body, res);
    });




    app.delete('/products/delete/:id/', function (req, res) {
      todo.delete(req.params.id, res);
    });




    app.get('/types/', function (req, res) {
      todo.get_types(res);
    });




    app.get('/types/:id_type', function (req, res) {
      todo.get_type_by_id(req.params.id_type, res);
    });




    app.get('/types/:id_type/products/', function (req, res) {
      todo.get_products_by_id_type(req.params.id_type, res);
    });



    app.get('/products/:id', function (req, res) {
      todo.get_product(req.params.id, res);
    });



    app.get('/products', function (req, res) {
      todo.get_products(req.query, res);
    });

    app.get('/search', function (req, res) {
      todo.search(req.query, res);
    });

    app.post('/login/', function (req, res) {
      todo.login(req, res);
    });


    



















  }
};