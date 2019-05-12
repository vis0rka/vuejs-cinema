
let mouseOverHandler = function() {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  span.classList.add('tooltip-show');
  
};

let mouseOutHandler = function() {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  span.classList.remove('tooltip-show');
};

export default {
  install(Vue) {
    Vue.directive('tooltip', {
      bind(el, bindings) {
        let span = document.createElement('span');
        let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
        span.appendChild(text);
        span.classList.add("tooltip");
        el.appendChild(span);
    
        let div = el.getElementsByTagName('DIV')[0];    
        div.addEventListener('mouseover', mouseOverHandler);
        div.addEventListener('mouseout', mouseOutHandler);
      },
      unbind(el) {
        let div = el.getElementsByTagName('DIV')[0];    
        div.removeEventListener('mouseover', mouseOverHandler);
        div.removeEventListener('mouseout', mouseOutHandler);
      }
    });
  }
}