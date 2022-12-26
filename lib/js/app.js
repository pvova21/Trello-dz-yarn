"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeNewCard;
var _addForm = _interopRequireDefault(require("./addForm"));
var _Card = _interopRequireDefault(require("./Card"));
var _DnD = _interopRequireDefault(require("./DnD"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const addNewForm = new _addForm.default();
const addCard = document.querySelectorAll('.add-card-container');
const allLists = document.querySelectorAll('.list');
const allCardsArr = [];
function makeNewCard(title, list) {
  const newCard = new _Card.default(title);
  allCardsArr.push(newCard);
  allCardsArr.forEach((item, index) => {
    item.id = index;
  });
  newCard.createNewCard(newCard, list, allCardsArr);
}
[...addCard].forEach(item => {
  item.addEventListener('click', () => {
    const parent = item.closest('.list-container');
    const list = parent.querySelector('.list');
    item.classList.remove('list-item');
    item.classList.add('hidden');
    const form = addNewForm.createForm();
    parent.appendChild(form);
    addNewForm.closeForm(form, item, parent);
    form.addEventListener('submit', e => {
      e.preventDefault();
      makeNewCard(addNewForm.addCardTitle(form), list);
      addNewForm.afterSubmit(form, item, parent);
      const allCards = document.querySelectorAll('.list-item');
      (0, _DnD.default)(allCards, allLists);
    });
  });
});