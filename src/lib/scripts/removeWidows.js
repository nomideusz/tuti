export default function removeWidows() {
  const elements = document.querySelectorAll('p');

  elements.forEach(element => {
    const text = element.innerHTML;
    element.innerHTML = text.replace(/(\s)([\S]{1,2})[\s]+/g, "$1$2&nbsp;");  
  });

  return {
    update() {
      removeWidows();
    },
    destroy() {
      removeWidows();
    },
  };
}