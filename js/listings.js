// ===== SEUN PROPERTY — listings.js =====

const searchInput     = document.getElementById('searchInput');
const filterLocation  = document.getElementById('filterLocation');
const filterType      = document.getElementById('filterType');
const filterCategory  = document.getElementById('filterCategory');
const filterBeds      = document.getElementById('filterBeds');
const filterPrice     = document.getElementById('filterPrice');
const clearBtn        = document.getElementById('clearFilters');
const grid            = document.getElementById('propertiesGrid');
const noResults       = document.getElementById('noResults');
const resultsCount    = document.getElementById('resultsCount');
const gridViewBtn     = document.getElementById('gridView');
const listViewBtn     = document.getElementById('listView');

const cards = Array.from(document.querySelectorAll('.prop-card'));

// ---- FILTER LOGIC ----
function filterProperties() {
  const search   = searchInput.value.toLowerCase().trim();
  const location = filterLocation.value;
  const type     = filterType.value;
  const category = filterCategory.value;
  const beds     = filterBeds.value;
  const price    = filterPrice.value;

  let visible = 0;

  cards.forEach(card => {
    const cardTitle    = card.dataset.title.toLowerCase();
    const cardLocation = card.dataset.location;
    const cardType     = card.dataset.type;
    const cardCategory = card.dataset.category;
    const cardBeds     = parseInt(card.dataset.beds);
    const cardPrice    = parseInt(card.dataset.price);

    let show = true;

    // Search
    if (search && !cardTitle.includes(search) && !cardLocation.toLowerCase().includes(search)) {
      show = false;
    }

    // Location
    if (location && cardLocation !== location) show = false;

    // Type (sale/rent)
    if (type && cardType !== type) show = false;

    // Category
    if (category && cardCategory !== category) show = false;

    // Bedrooms
    if (beds) {
      const bedsNum = parseInt(beds);
      if (bedsNum === 5) {
        if (cardBeds < 5) show = false;
      } else {
        if (cardBeds !== bedsNum) show = false;
      }
    }

    // Price range
    if (price) {
      const [min, max] = price.split('-').map(Number);
      if (cardPrice < min || cardPrice > max) show = false;
    }

    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  // Update results count
  resultsCount.textContent = visible === cards.length
    ? `Showing all ${cards.length} properties`
    : `Showing ${visible} of ${cards.length} properties`;

  // Show/hide no results
  noResults.style.display = visible === 0 ? 'block' : 'none';
  grid.style.display = visible === 0 ? 'none' : '';
}

// ---- CLEAR FILTERS ----
function clearAllFilters() {
  searchInput.value = '';
  filterLocation.value = '';
  filterType.value = '';
  filterCategory.value = '';
  filterBeds.value = '';
  filterPrice.value = '';
  filterProperties();
}

clearBtn.addEventListener('click', clearAllFilters);

// ---- EVENT LISTENERS ----
searchInput.addEventListener('input', filterProperties);
filterLocation.addEventListener('change', filterProperties);
filterType.addEventListener('change', filterProperties);
filterCategory.addEventListener('change', filterProperties);
filterBeds.addEventListener('change', filterProperties);
filterPrice.addEventListener('change', filterProperties);

// ---- VIEW TOGGLE (grid / list) ----
gridViewBtn.addEventListener('click', () => {
  grid.classList.remove('list-view');
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
  grid.classList.add('list-view');
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
});

// Init count on load
filterProperties();