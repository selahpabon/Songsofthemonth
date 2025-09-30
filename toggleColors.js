document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleImages');
  if (!btn) {
    console.warn('toggleImages button not found');
    return;
  }

  let colorMode = false;

  // Convert "rgb(a)()" to HEX safely. Returns null on failure.
  function rgbStringToHex(rgb) {
    if (!rgb) return null;
    const nums = rgb.match(/\d+/g);
    if (!nums || nums.length < 3) return null;
    const r = Number(nums[0]), g = Number(nums[1]), b = Number(nums[2]);
    return (
      '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')
    ).toUpperCase();
  }

  // Find the first non-transparent background color up the DOM tree
  function getEffectiveBackgroundColor(el) {
    let node = el;
    while (node && node !== document.documentElement) {
      const bg = window.getComputedStyle(node).backgroundColor;
      if (bg && bg !== 'transparent') {
        // treat fully transparent rgba(0,0,0,0) as transparent
        if (!/^rgba?\(0,\s*0,\s*0,\s*0\)$/i.test(bg.trim())) {
          return bg;
        }
      }
      node = node.parentElement;
    }
    // fallback to document background
    return window.getComputedStyle(document.documentElement).backgroundColor || 'rgb(255,255,255)';
  }

  // Create hex links for each card (if not present)
  const songCards = document.querySelectorAll('.songs li');
  songCards.forEach(card => {
    if (!card.querySelector('.hexcode')) {
      const bg = getEffectiveBackgroundColor(card);
      const hex = rgbStringToHex(bg) || '#FFFFFF';

      // find existing song link on the card
      const songLink = card.querySelector('.songlink');

      const a = document.createElement('a');
      a.className = 'hexcode';
      a.textContent = hex;
      if (songLink && songLink.href) {
        a.href = songLink.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else {
        a.href = '#';
      }

      card.appendChild(a);
    }
  });

  // Toggle behavior
  btn.addEventListener('click', () => {
    const images = document.querySelectorAll('.songs li img');
    const captions = document.querySelectorAll('.songs li .caption');
    const links = document.querySelectorAll('.songs li .songlink');
    const hexes = document.querySelectorAll('.songs li .hexcode');

    if (!colorMode) {
      // hide the song content
      [...images, ...captions, ...links].forEach(el => el.classList.add('hidden'));

      // show hex links
      hexes.forEach(h => h.classList.add('show'));

      btn.textContent = 'Song Mode';
      colorMode = true;
    } else {
      // hide hex links
      hexes.forEach(h => h.classList.remove('show'));

      // reveal song content
      [...images, ...captions, ...links].forEach(el => el.classList.remove('hidden'));

      btn.textContent = 'Color Mode';
      colorMode = false;
    }
  });
});