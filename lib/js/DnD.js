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
  [...cards].forEach(card => {
    card.addEventListener('dragstart', evt => {
      evt.target.classList.add('selected');
    });
    card.addEventListener('dragend', evt => {
      evt.target.classList.remove('selected');
    });
    [...lists].forEach(list => {
      list.addEventListener('dragover', evt => {
        evt.preventDefault();
        const activeElement = document.querySelector('.selected');
        const currentElement = evt.target;
        const isMoveAble = activeElement !== currentElement && currentElement.classList.contains('list-item');
        if (!isMoveAble) {
          return;
        }
        const nextElement = getNextElement(evt.clientY, currentElement);
        if (nextElement && (activeElement === nextElement.previousElementSibling || activeElement === nextElement)) {
          return;
        }
        list.insertBefore(activeElement, nextElement);
      });
    });
  });
}