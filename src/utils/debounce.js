export default function (func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args)
    };
    if (immediate && !timeout) func.apply(context, args)
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

