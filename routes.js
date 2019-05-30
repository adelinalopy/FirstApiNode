const app=express();
module.exports = function(app, db) {
    app.post('/personnes', (req, res) => {
      // You'll create your note here.
      res.send('Hello')
    });
  };