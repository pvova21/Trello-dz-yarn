"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragDrop;
function DragDrop(cards, lists) {
  function getNextElement(cursorPosition, currentElement) {
    const currentElCoordinates = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElCoordinates.y + currentElCoordinates.height / 2;
    const nextEl = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;
    return nextEl;
  }
  function getNextElementInUl(cursorPosition, list) {
    const arrLi = Array.from(list.children);
    const margin = 10;
    let nextEl = '';
    arrLi.forEach(item => {
      const topLi = item.getBoundingClientRect().top;
      if (cursorPosition < topLi && cursorPosition > topLi - margin) {
        nextEl = item;
      }
    });
    return nextEl;
  }
  let copy = '';
  function createElementTemp(width, height) {
    const elemTemp = document.createElement('DIV');
    elemTemp.classList.add('copy');
    elemTemp.setAttribute('style', `width: ${width}px; height: ${height}px;`);
    copy = elemTemp;
  }
  [...cards].forEach(card => {
    card.addEventListener('dragstart', evt => {
      const {
        width,
        height
      } = evt.target.getBoundingClientRect();
      createElementTemp(width, height);
      evt.target.classList.add('selected');
      setTimeout(() => evt.target.classList.add('hidden'), 0);
    });
    card.addEventListener('dragend', evt => {
      console.log('произошло событие dragend');
      evt.target.classList.remove('selected');
      evt.target.classList.remove('hidden');
      const elemTemp = document.querySelector('.copy');
      if (elemTemp) {
        copy.remove();
      }
    });
    [...lists].forEach(list => {
      list.addEventListener('dragover', evt => {
        evt.preventDefault();
      });
      list.addEventListener('dragenter', evt => {
        const currentElement = evt.target;
        let nextElement = '';
        if (currentElement.tagName === 'DIV') {
          return;
        }
        if (currentElement.tagName === 'UL') {
          console.log('встали на пустое пространство UL');
          nextElement = getNextElementInUl(evt.clientY, list);
        } else {
          console.log('находимся на LI');
          nextElement = getNextElement(evt.clientY, currentElement.closest('LI'));
        }
        // eslint-disable-next-line no-unused-expressions
        nextElement ? nextElement.before(copy) : list.append(copy);
      });
      list.addEventListener('drop', e => {
        e.preventDefault();
        console.log('произошло событие drop');
        const activeElement = document.querySelector('.selected');
        copy.after(activeElement);
        copy.remove();
      });
    });
  });
}