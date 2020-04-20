var todo = require('./Models/model');
  
module.exports = {
  configure: function(app) {
    app.get('/types/', function(req, res) {
      todo.get_types(res);
    });


    app.get('/types/:id_type', function(req, res) {
        todo.get_type_by_id(req.params.id_type ,res);
      });


      app.get('/types/:id_type/products/', function(req, res) {
        todo.get_products_by_id_type(req.params.id_type ,res);
      });


      app.get('/products/:id', function(req, res) {
        todo.get_product(req.params.id ,res);
      });


      app.get('/products', function(req,res) {
        todo.get_products(req.query, res);
      });


      app.post('/login/', function(req,res) {
        todo.login(req, res);
      });
      

      app.get('/demotest', function(req, res){
        todo.demotest(req.query, res)
      }
      );




      

      


    

    

    

   

  


  }
};