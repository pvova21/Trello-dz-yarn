"use strict";

var _app = _interopRequireDefault(require("./app"));
var _DnD = _interopRequireDefault(require("./DnD"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
document.addEventListener('DOMContentLoaded', () => {
  const todo = document.querySelector('.todo-list');
  const progress = document.querySelector('.progress-list');
  const done = document.querySelector('.done-list');
  (0, _app.default)('Welcome to Trello!', todo);
  (0, _app.default)('This is a card.', todo);
  (0, _app.default)('Click on a card to see what\'s behind it.', progress);
  (0, _app.default)('Finished with a card? Delete it.', progress);
  (0, _app.default)('To learn more tricks, check out the guide.', done);
  (0, _app.default)('Want to use keyboard shortcuts? We have them!', done);
  const allCards = document.querySelectorAll('.list-item');
  const allLists = document.querySelectorAll('.list');
  (0, _DnD.default)(allCards, allLists);
});