const blogController = require('./controllers/BlogController');
const categoryController = require('./controllers/CategoryController');
const fileControler = require('./controllers/FileController');
const authController = require('./controllers/AuthController');
const userController = require('./controllers/UserController');
const cmtController = require('./controllers/CommentController');
const serialController = require('./controllers/SerialController');

const { validate } = require('./middlewares/yupValidate');
const { authenticate } = require('./middlewares/auth');

const routes = {
  blogs: blogController,
  categories: categoryController,
  serials: serialController
};

function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

function routesMaker(app) {
  app.post(
    '/api/upload/images',
    authenticate,
    fileControler.upload.single('file'),
    makeHandlerAwareOfAsyncErrors(
      fileControler.uploadImage.bind(fileControler),
    ),
  );

  app.post(
    '/api/auth/register',
    validate(authController.registerSchema),
    makeHandlerAwareOfAsyncErrors(authController.register.bind(authController)),
  );

  app.get(
    '/api/users/me',
    authenticate,
    makeHandlerAwareOfAsyncErrors(userController.getMe.bind(userController)),
  );

  app.post(
    '/api/blogs/:id/like',
    authenticate,
    makeHandlerAwareOfAsyncErrors(blogController.like.bind(blogController)),
  );

  app.post(
    '/api/comments',
    authenticate,
    makeHandlerAwareOfAsyncErrors(cmtController.create.bind(cmtController)),
  );

  app.post(
    '/api/auth/login',
    validate(authController.loginSchema),
    makeHandlerAwareOfAsyncErrors(authController.login.bind(authController)),
  );

  app.get(
    '/api/auth/logout',
    makeHandlerAwareOfAsyncErrors(authController.logout.bind(authController)),
  );

  app.post(
    '/api/serials/:id/assign',
    makeHandlerAwareOfAsyncErrors(serialController.assignBlogToSerial.bind(serialController)),
  );

  for (const controlAsKeyValuePair of Object.entries(routes)) {
    const [routeName, routeController] = controlAsKeyValuePair;

    if (routeController.find) {
      app.get(
        `/api/${routeName}`,
        makeHandlerAwareOfAsyncErrors(
          routeController.find.bind(routeController),
        ),
      );
    }
    if (routeController.findBySlug) {
      app.get(
        `/api/${routeName}/:slug`,
        makeHandlerAwareOfAsyncErrors(
          routeController.findBySlug.bind(routeController),
        ),
      );
    }
    if (routeController.create) {
      app.post(
        `/api/${routeName}`,
        authenticate,
        validate(routeController.createSchema),
        makeHandlerAwareOfAsyncErrors(
          routeController.create.bind(routeController),
        ),
      );
    }
    if (routeController.update) {
      app.put(
        `/api/${routeName}/:id`,
        authenticate,
        validate(routeController.updateSchema),
        makeHandlerAwareOfAsyncErrors(
          routeController.update.bind(routeController),
        ),
      );
    }
    if (routeController.destroy) {
      app.delete(
        `/api/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(
          routeController.destroy.bind(routeController),
        ),
      );
    }
  }
}

module.exports = routesMaker;
