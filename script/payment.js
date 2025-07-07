  const cardNumberInput = document.getElementById('card-number');
  const cvvInput = document.getElementById('cvv');
  const expInput = document.getElementById('exp-date');
  const cardTypeSpan = document.getElementById('card-type');

  // Solo números
  function soloNumeros(e) {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  }
  cardNumberInput.addEventListener('keypress', soloNumeros);
  cvvInput.addEventListener('keypress', soloNumeros);

  // Formato tarjeta y detección
  cardNumberInput.addEventListener('input', function () {
    let value = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
    let parts = value.match(/.{1,4}/g);
    cardNumberInput.value = parts ? parts.join(' ') : value;

    // Detectar tipo de tarjeta
    const first2 = value.slice(0, 2);
    const first4 = value.slice(0, 4);
    const first1 = value.slice(0, 1);
    const first6 = parseInt(value.slice(0, 6));

    let type = '';
    if (first1 === '4') {
      type = 'Visa';
    } else if (/^5[1-5]/.test(first2) || (first6 >= 222100 && first6 <= 272099)) {
      type = 'MasterCard';
    } else if (first2 === '34' || first2 === '37') {
      type = 'American Express';
    } else if (/^6/.test(first1)) {
      type = 'Discover';
    } else {
      type = '';
    }

    cardTypeSpan.textContent = type;
  });

  // Formato fecha MM/YY
  expInput.addEventListener('input', function () {
    let val = expInput.value.replace(/\D/g, '').slice(0, 4);
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    expInput.value = val;
  });