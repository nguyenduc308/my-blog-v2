const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logQueryParameters: true,
  benchmark: true,
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const modelDefiners = [
  require('./models/blog.model'),
  require('./models/category.model'),
  require('./models/block.model'),
  require('./models/attachment.model'),
  require('./models/user.model'),
  require('./models/view.model'),
  require('./models/like.model'),
  require('./models/comment.model'),
  require('./models/serial.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

sequelize.define('category_blog', {}, { timestamps: false });
sequelize.define('serial_blog', {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  index: {
    allowNull: false,
    type: DataTypes.INTEGER,
  }
}, { timestamps: false });

function setupRelations({ models }) {
  const { blog, block, category, user, category_blog, view, like, comment, serial, serial_blog } =
    models;

  blog.belongsToMany(category, {
    through: 'category_blog',
    as: 'categories',
    foreignKey: 'blog_id',
    otherKey: 'category_id',
  });
  category.belongsToMany(blog, {
    through: 'category_blog',
    as: 'blogs',
    foreignKey: 'category_id',
    otherKey: 'blog_id',
  });
  category_blog.belongsTo(blog, { foreignKey: 'blog_id' });
  category_blog.belongsTo(category, { foreignKey: 'category_id' });

  blog.hasMany(block, {
    as: 'blocks',
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  block.belongsTo(blog, {
    constraints: true,
    foreignKey: 'blog_id',
    targetKey: 'id',
  });

  blog.belongsTo(user, {
    constraints: true,
    foreignKey: 'user_id',
    targetKey: 'id',
  });
  user.hasMany(blog, {
    foreignKey: 'user_id',
  });

  blog.hasOne(view, {
    as: 'view',
    constraints: true,
    foreignKey: 'blog_id',
  });
  view.belongsTo(blog, {
    foreignKey: 'blog_id',
    targetKey: 'id',
  });

  blog.hasMany(like, {
    as: 'likes',
    foreignKey: 'blog_id',
  });
  like.belongsTo(blog, {
    foreignKey: 'blog_id',
  });
  like.belongsTo(user, {
    foreignKey: 'user_id',
  });

  blog.hasMany(comment, {
    as: 'comments',
    foreignKey: 'blog_id',
  });

  comment.belongsTo(blog, {
    foreignKey: 'blog_id',
  });

  comment.hasMany(comment, {
    as: 'children',
    foreignKey: 'comment_id',
  });

  comment.belongsTo(user, {
    foreignKey: 'user_id',
  });

  serial.belongsToMany(blog, {
    through: 'serial_blog',
    as: 'blogs',
    foreignKey: 'serial_id',
    otherKey: 'blog_id',
  });
  blog.belongsToMany(serial, {
    through: 'serial_blog',
    as: 'serials',
    foreignKey: 'blog_id',
    otherKey: 'serial_id',
  });
  serial_blog.belongsTo(serial, { foreignKey: 'serial_id' });
  serial_blog.belongsTo(blog, { foreignKey: 'blog_id' });
}

(async () => {
  try {
    setupRelations(sequelize);
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log(e);
  }
})();

module.exports = sequelize;
