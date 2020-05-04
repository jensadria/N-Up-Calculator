document.getElementById('qty-size').addEventListener('submit', function (e) {
  calculateResults();

  e.preventDefault();
});

function calculateResults(e) {
  // UI Vars
  const qty = document.getElementById('qty');
  const width = document.getElementById('width');
  const height = document.getElementById('height');
  const gutters = document.getElementById('gutters');
  const margins = document.getElementById('margins');

  const sheets = document.getElementById('sheets');
  const nUp = document.getElementById('n-up');

  // Convert gutter to number
  const gutter = parseInt(gutters.value);

  // Calculate Margins
  totalMargins = parseInt(margins.value) * 2;

  // Sheet sizes minus margins
  const sra3Width = 450 - totalMargins;
  const sra3Height = 320 - totalMargins;

  // ----------------------------------------------------MAIN CALCULATIONS
  // Calculate WIDTH divided by sra3width & sra3height
  const nUpWidthWidth = Math.floor(
    (sra3Width - gutter) / (parseInt(width.value) + gutter)
  );
  const nUpHeightHeight = Math.floor(
    (sra3Height - gutter) / (parseInt(height.value) + gutter)
  );

  // Calculate HEIGHT divided by sra3width & sra3height
  const nUpWidthHeight = Math.floor(
    (sra3Width - gutter) / (parseInt(height.value) + gutter)
  );
  const nUpHeightWidth = Math.floor(
    (sra3Height - gutter) / (parseInt(width.value) + gutter)
  );

  // Calculate nUps of both
  nUpFirstOption = nUpHeightHeight * nUpWidthWidth;
  nUpSecondOption = nUpWidthHeight * nUpHeightWidth;

  // Figure out which one fits more on a page
  const nUpOnPage = Math.max(nUpFirstOption, nUpSecondOption);

  // ----------------------------------------------------DISPLAY RESULTS

  const calculatedSheets = Math.ceil(parseInt(qty.value) / nUpOnPage).toFixed();

  if (isFinite(calculatedSheets)) {
    // Show results
    document.getElementById('results').style.display = 'block';

    sheets.innerText = `${calculatedSheets} sheets`;
    nUp.innerText = `${nUpOnPage} on a Page`;
  } else {
    showError('Please check your numbers');
  }
}

// Show error

function showError(error) {
  // Get alert-div
  const alertDiv = document.querySelector('.alert');

  alertDiv.style.display = 'block';

  // clear Error function
  function clearError() {
    alertDiv.style.display = 'none';
  }

  // Clear after 2 seconds
  setTimeout(clearError, 2000);
}
