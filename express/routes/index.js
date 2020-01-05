"use strict";

module.exports = function(router){
  const userList = [{"name": "özer", "email":"asdasd"},{"name": "özer", "email":"asdasd"}]
  return router.get('/', (req, res) => {
  res.render("index", {
    userList: userList,
    title: "Kullanıcı Bilgileri"
  });
  res.end();
});
}
