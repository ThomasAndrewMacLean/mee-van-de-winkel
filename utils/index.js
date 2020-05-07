export const add = (a, b) => {
  return a + b;
};

const isProduction = process.env.NODE_ENV === 'production';
export const prefix = isProduction ? '' : '';

export const getImageUrl = (context, id, full) => {
  return full
    ? context.find((p) => p.id === id).pic[0].url
    : context.find((p) => p.id === id).pic[0].thumbnails.large.url;
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getEmoji = (word) => {
  if (word.includes('noot')) {
    return '🥜';
  }
  if (word.includes('noten')) {
    return '🥜';
  }
  if (word.includes('fruit')) {
    return '🍏🍊🥝';
  }
  if (word.includes('groenten')) {
    return '🥕🥦';
  }
  if (word.includes('melk')) {
    return '🥛';
  }
  if (word.includes('bier')) {
    return '🍺';
  }
  if (word.includes('worst')) {
    return '🌭';
  }
  if (word.includes('toilet')) {
    return '🧻';
  }
    if (word.includes('noedels')) {
    return '🍜';
  }
  if (word.includes('wc')) {
    return '🧻';
  }
  if (word.includes('pint')) {
    return '🍻';
  }
  if (word.includes('trappi')) {
    return '🍺';
  }
  if (word.includes('gagel')) {
    return '🍺';
  }
  if (word.includes('water')) {
    return '💧';
  }
  if (word.includes('wijn')) {
    return '🍷';
  }
  if (word.includes('appel')) {
    return '🍎';
  }
  if (word.includes('bloem')) {
    return '💐';
  }
  if (word.includes('eier')) {
    return '🍳';
  }
  if (word.includes('tomaat')) {
    return '🍅';
  }
  if (word.includes('tomate')) {
    return '🍅';
  }
  if (word.includes('bana')) {
    return '🍌';
  }
  if (word.includes('peren')) {
    return '🍐';
  }
  if (word.includes('peer')) {
    return '🍐';
  }
  if (word.includes('meloen')) {
    return '🍉';
  }
  if (word.includes('aardap')) {
    return '🥔';
  }
  if (word.includes('brood')) {
    return '🍞';
  }
  if (word.includes('croiss')) {
    return '🥐';
  }
  if (word.includes('kaas')) {
    return '🧀';
  }
  if (word.includes('pizza')) {
    return '🍕';
  }
  if (word.includes('koek')) {
    return '🍪';
  }
  if (word.includes('choco')) {
    return '🍫';
  }
  if (word.includes('koffie')) {
    return '☕️';
  }
  if (word.includes('thee')) {
    return '🍵';
  }
  if (word.includes('snoep')) {
    return '🍭';
  }
  if (word.includes('blik')) {
    return '🥫';
  }
  if (word.includes('komkom')) {
    return '🥒';
  }
  if (word.includes('aardbei')) {
    return '🍓';
  }
  if (word.includes('appelsie')) {
    return '🍊';
  }
  if (word.includes('citroen')) {
    return '🍋';
  }
  if (word.includes('limoen')) {
    return '🍋';
  }
  if (word.includes('druive')) {
    return '🍇';
  }
  if (word.includes('kers')) {
    return '🍒';
  }
  if (word.includes('anan')) {
    return '🍍';
  }
  if (word.includes('perzi')) {
    return '🍑';
  }
  if (word.includes('koko')) {
    return '🥥';
  }
  if (word.includes('kiwi')) {
    return '🥝';
  }
  if (word.includes('auber')) {
    return '🍆';
  }
  if (word.includes('advo')) {
    return '🥑';
  }
  if (word.includes('broco')) {
    return '🥦';
  }
  if (word.includes('komkom')) {
    return '🥒';
  }
  if (word.includes('papr')) {
    return '🌶';
  }
  if (word.includes('mais')) {
    return '🌽';
  }
  if (word.includes('wortel')) {
    return '🥕';
  }
  if (word.includes('stokbr')) {
    return '🥖';
  }
  if (word.includes('taco')) {
    return '🌮';
  }
  if (word.includes('sla')) {
    return '🥗';
  }
  if (word.includes('rijst')) {
    return '🍚';
  }
  if (word.includes('ijs')) {
    return '🍦';
  }
  if (word.includes('honing')) {
    return '🍯';
  }
  if (word.includes('cava')) {
    return '🍾';
  }
  if (word.includes('whis')) {
    return '🥃';
  }
  if (word.includes('rum')) {
    return '🥃';
  }
  if (word.includes('donu')) {
    return '🍩';
  }
  if (word.includes('taart')) {
    return '🎂';
  }
  if (word.includes('burger')) {
    return '🍔';
  }
  if (word.includes('tofu')) {
    return '🍖';
  }
  if (word.includes('veg')) {
    return '🍗';
  }
  if (word.includes('spa')) {
    return '🍝';
  }
  if (word.includes('pita')) {
    return '🥙';
  }
  if (word.includes('croq')) {
    return '🥪';
  }
  if (word.includes('brood')) {
    return '';
  }
  return '';
};
