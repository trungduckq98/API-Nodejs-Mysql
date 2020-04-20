var connection = require('../connection');

function Todo() {
  this.get_types = function (res) {
    connection.acquire(function (err, con) {
      con.query('select * from type', function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get_type_by_id = function (id_type, res) {
    connection.acquire(function (err, con) {
      con.query('select * from type where id_type = ?', [id_type], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get_products_by_id_type = function (id_type, res) {
    connection.acquire(function (err, con) {
      con.query('select * from product where id_type = ? ', [id_type], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get_products = function (req, res) {
    var sql = 'select * from product ';
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

  this.get_product = function (id, res) {
    connection.acquire(function (err, con) {
      con.query('select * from product where id = ?', [id], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.login = function (req, res) {
    connection.acquire(function (err, con) {
      con.query('select id_user, displayname from user where username = ?  && password = ? ', [req.body.username, req.body.password], function (err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.demotest = function (req, res) {
    var sql = 'select * from product ';
    var limit = 10;
    console.log(req);

    if(req.page!=null){
      sql += ' limit '+limit*req.page+' offset '+limit*(req.page-1);
    }else{
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


