/* 路由配置 */
module.exports = function (app) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
  })
  app.use('/api/login', require('./login'))
  app.use('/api/logout', require('./logout'))
  app.use('/api/users', require('./users'))
  app.use('/api/groups', require('./groups'))
  app.use('/api/tasks', require('./tasks'))
  app.use('/api/events', require('./events'))
}
