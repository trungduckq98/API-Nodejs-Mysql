var connection = require('../connection');


/*
  Product
   id: int,
   name:text,
   price: int,
   description:text,
   id_type:int

*/




function Todo() {

  
  this.get_types = function (res) {
    connection.acquire(function (err, con) {
      con.query('select * from type', function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.create = function (field_data, res) {
    console.log(field_data);
    connection.acquire(function (err, con) {
      con.query('insert into product set ?', [field_data], function (err, result) {
        con.release();
        if (err) {

          res.send({ status: 1, message: 'TODO creation failed' });
        } else {
          res.send({ status: 0, message: 'TODO created successfully' });
        }
      });
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.mutablecreate = function (field_data, res) {
    
    var value = field_data.reduce((o,a) =>{
        let ini =[];
        ini.push(a.name);
        ini.push(a.image);
        ini.push(a.price);
        ini.push(a.description);
        ini.push(a.id_type);
        o.push(ini);
        return o;
    },[]);

console.log(value);
var sql = 'INSERT INTO product (name, image, price, description, id_type) VALUES ?';
  connection.acquire(function (err, con) {
 con.query(sql , [value] , function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'TODO creation failed' });
        } else {
          res.send({ status: 0, message: 'TODO created successfully' });

        }
      });
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.update = function (field_data, res) {
    connection.acquire(function (err, con) {
      con.query('update product set ? where id = ?', [field_data, field_data.id], function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'TODO update failed' });
        } else {
          res.send({ status: 0, message: 'TODO updated successfully' });
        }
      });
    });
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////


  this.delete = function (id, res) {
    connection.acquire(function (err, con) {
      con.query('delete from product where id = ?', [id], function (err, result) {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'Failed to delete' });
        } else {
          res.send({ status: 0, message: 'Deleted successfully' });
        }
      });
    });
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////


  this.get_type_by_id = function (id_type, res) {
    connection.acquire(function (err, con) {
      con.query('select * from type where id_type = ?', [id_type], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.get_products_by_id_type = function (id_type, res) {
    connection.acquire(function (err, con) {
      con.query('select * from product where id_type = ? ', [id_type], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.get_products = function (req, res) {
    var sql = 'select * from product ';

    var limit = 5;
    if (req.page != null) {
      sql += ' limit ' + limit + ' offset ' + limit * (req.page - 1);
    } else {
      sql += ' limit 5 offset  0';
    }

    if (req.id_type != null) {
      sql += 'where id_type IN (' + req.id_type + ') ';
    }
    if (req.sortby != null) {
      sql += 'order by ' + req.sortby + ' ';
    }
    if (req.orderby != null) {
      sql += ' ' + req.orderby + ' ';
    }
    if (req.limit != null) {
      sql += ' limit ' + req.limit + ' ';
    }


    connection.acquire(function (err, con) {
      con.query(sql, function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.search = function (req, res) {
    var sql = "select * from product where name like ?  ";
    console.log(sql);
    connection.acquire(function (err, con) {
      con.query(sql, '%' + req.name + '%', function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.get_product = function (id, res) {
    connection.acquire(function (err, con) {
      con.query('select * from product where id = ?', [id], function (err, result) {
        con.release();
        res.send(result[0]);
      });
    });
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.login = function (req, res) {
    connection.acquire(function (err, con) {
      con.query('select id_user, displayname from user where username = ?  && password = ? ', [req.body.username, req.body.password], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.demotest = function (req, res) {
    var sql = 'select * from product ';
    var limit = 5;
    console.log(req);

    if (req.page != null) {
      sql += ' limit ' + limit * req.page + ' offset ' + limit * (req.page - 1);
    } else {
      sql += ' limit 10 offset  0';
    }

    if (req.id_type != null) {

      console.log(req.id_type);
      sql += 'where id_type IN (' + req.id_type + ') ';


    }
    if (req.sortby != null) {

      sql += 'order by ' + req.sortby + ' ';
      console.log(sql);
    }
    if (req.orderby != null) {
      sql += ' ' + req.orderby + ' ';
      console.log(sql);
    }
    if (req.limit != null) {
      sql += ' limit ' + req.limit + ' ';
      console.log(sql);
    }
    console.log(sql);

    connection.acquire(function (err, con) {
      con.query(sql, function (err, result) {
        con.release();
        res.send(result);
      });
    });



  }


















}
module.exports = new Todo();


