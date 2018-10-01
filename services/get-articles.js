const articles = [{
  articleId: 1,
  orderId: 1,
  name: 'Really awesome cool new shoes'
}, {
  articleId: 2,
  orderId: 1,
  name: 'Some super fancy jacket'
}, {
  articleId: 3,
  orderId: 2,
  name: 'A dress to impress'
}];

const getArticles = () => articles;

module.exports.getArticles = getArticles;
