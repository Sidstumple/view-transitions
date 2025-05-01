const cooler = document.getElementById('switch');
const coolerChecked = localStorage.getItem('cooler');
console.log(coolerChecked);

if (coolerChecked == 'true') {
  console.log('coolerChecked');
  cooler.checked = true;
  document.body.classList.add('cooler');
}

cooler.addEventListener('change', () => {
  localStorage.setItem('cooler', cooler.checked);
  console.log(localStorage.getItem('cooler'));

  document.body.classList.toggle('cooler', cooler.checked);
});
