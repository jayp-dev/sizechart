
class SizeChartModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.sizepro = window.sizePro;  // Global variable
    this.chartData = [];
    this.switchUnitEnable = true;
    this.rounding_mode = 'auto';
    this.currentUnit = 'cm'; // Default to Centimeters
    this.decimalPrecision = 1; // Default to 1 decimal
    this.roundingStep = 0.1; // Default rounding step
    this.render();
  }

  setChartData(chartData) {
    this.chartData = chartData;
    const { SizechartPro } = this.chartData;
    this.switchUnitEnable = SizechartPro.allow_converter;
    this.rounding_mode = SizechartPro.rounding_mode;
    this.decimalPrecision = SizechartPro.rounding_numOfDecimals;
    this.roundingStep = parseFloat(SizechartPro.rounding_roundTo);
    this.currentUnit = SizechartPro.allow_converter_in === 1 ? 'cm' : 'inch';

    this.updateChart();
  }

  updateChart() {
    this.GenerateTableHtml();
    this.GenerateChartHtml();
    this.ChartConvertButton();
    this.render(); // Re-render the modal with the updated data
  }

  // Switch unit between cm and inch
  switchUnit(unit) {
    this.currentUnit = unit;
    this.updateTableData();
  }

  handleUnitClick(unit) {
    const unitButtons = ['cmButton', 'inchButton'];
    unitButtons.forEach(btn => this.shadowRoot.getElementById(btn).classList.toggle('active', btn === `${unit}Button`));
  }

  updateTableData() {
    const formattedData = JSON.parse(this.chartData.SizechartPro.user_chart_data);
    const convertedData = formattedData.map(this.convertRowData.bind(this));
    this.chartData.SizechartPro.user_chart_data = JSON.stringify(convertedData);
    this.GenerateTableHtml(); // Re-generate the table with the new data
    this.render(); // Re-render the modal
  }

  convertRowData(row) {
    const newRow = {};
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        newRow[key] = this.convertValue(row[key]);
      }
    }
    return newRow;
  }

  convertValue(value) {
    if (typeof value === 'string' && value.includes('-')) {
      const [minValue, maxValue] = value.split('-').map(num => this.convertNumericValue(num.trim()));
      return `${minValue}-${maxValue}`;
    }
    return this.convertNumericValue(value);
  }

  convertNumericValue(value) {
    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value; // Keep original if not a number
    return this.currentUnit === 'inch'
      ? (numericValue / 2.54).toFixed(this.decimalPrecision)
      : (numericValue * 2.54).toFixed(this.decimalPrecision);
  }
  // Method to open the modal and load chart data
  openModal() {
    this.shadowRoot.getElementById('sizechartProModal').style.display = 'flex'; // Show the modal
  }
  // Method to close the modal and remove from DOM
  closeModal() {
    const modal = this.shadowRoot.getElementById('sizechartProModal');
    modal.style.display = 'none';  // Hide the modal
    this.remove();  // Remove the element from the DOM
  }

  injectCustomCss(customCss, headerColor, zebraLinesColor, headerFontColor) {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'sizechartProCustomcss');

    styleElement.textContent = `
          .sizechartProModal-root {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9;
          }

          .sizechartProDialog-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 20px;
            position: absolute;
            max-width: 800px;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
          }

          .sizechartProCloseButton {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            cursor: pointer;
          }

        .sizechartProSvgIcon-root {
          width: 24px;
          display: block;
          height: 24px;
          margin-left: auto;
          cursor:pointer;
        }

        .sizechartPro_title {
          text-align: center;
          font-weight: 600;
        }

        .sizechartPro-product-title {
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          margin-top: 10px;
          ${this.switchUnitEnable ? '' : 'margin-bottom: 15px;'}
        }

        .sizechartProTabs-flexContainer {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          margin-bottom: 20px;
          position: relative;
        }

        .sizechartProTabs-flexContainer button {
          margin: 0 10px;
          border: 0;
          background: none;
          cursor: pointer;
        }
        .sizechartProButtonBase-root.active {
          color: black;
          font-weight: bold;
          border-radius: 0px;
          text-decoration-line: underline;
        }

          .sizechartProTabs-flexContainer:before {
            content: '';
            position: absolute;
            top: 0;
            left: 48%;
            transform: translateX(-50%);
            width: 1px;
            height: 100%;
            background: #ccc;
          }

          .sizechartProButton-root {
            border: 0;
            padding: 8px 20px;
            background: #000;
            color: #fff;
            font-size: 14px;
            display: block;
            margin: auto;
            width: max-content;
            margin-top: 20px;
            cursor: pointer;
          }
          .sizechartPro-sizetable-container{width: 60%}
          .image-container{width: 36%}
          .image-container img{width: 100%}
          .maintable-root.srcoll-root{
            overflow-y: scroll;
          }
          .sizechartPro-content{ height: 500px}
          .sizechartProTableContainer-root {
            max-width: 490px;
            max-height: 300px;
            overflow-x: auto;
            overflow-y: auto;
            scrollbar-width: thin;
        }
            .sizechartPro-layout {
                    flex-wrap: wrap;
        }
            .no-root-image .sizechartProTableContainer-root {
            max-width: 100%;
        }
              .no-root-image .sizechartPro-sizetable-container{
            width: 100%;
            }

                table {
                  width: 100%;
                  border-collapse: collapse;
                
                }

        th {
          background-color: ${headerColor};
          color: ${headerFontColor};
          border: 0;
          font-weight: 400;
          padding: 8px;
          min-width: 105px;
          
        }

        td {
          padding: 8px;
          text-align: left;
          min-width: 105px;
        }


        tr:nth-child(even) td {
          background: ${zebraLinesColor}
        }
        .border-lines table {
          border: 0
        }

        .border-lines table tr {
          border-top: 1px solid #bdbaba;
        }

        .border-lines table tr:last-child {
          border-bottom: 1px solid #bdbaba;
        }

        .border-tunnel table tr:first-child {
          border-top: 1px solid #bdbaba;
        }

        .border-tunnel table tr:last-child {
          border-bottom: 1px solid #bdbaba;
        }

        .border-grid td,
        th {
          border: 1px solid #bdbaba;
        }
        ::-webkit-scrollbar {
            display: none;
        }

        @media(max-width: 767px) {
          .sizechartProPaper-root.sizechartProTableContainer-root {
              overflow-x: scroll;
          }

          table {
              width: 600px;
          }

          .sizechartProDialog-container {
              padding: 10px;
              width: 90%;
          }
              .sizechartPro-sizetable-container{width: 100%}
              .sizechartPro-layout{flex-wrap:wrap}
              .sizechartProDialog-container{top:42%}
          .image-container{width: 100%}
        }
          /* Inject custom CSS from backend */
            ${customCss}
    `;
    this.shadowRoot.appendChild(styleElement);
  }

  render() {
    if (!this.chartData || !this.chartData.SizechartPro) return;

    const headerColor = this.convertColor(this.chartData.headerColor);
    const headerFontColor = this.convertColor(this.chartData.headerFontColor);
    const zebraLinesColor = this.convertColor(this.chartData.zebraLinesColor); // Uses default alpha
    const focusColor = this.convertColor(this.chartData.focusColor);
    const borderStyle = this.chartData.borderStyle;
    const modalHTML = this.getModalHTML(headerColor, headerFontColor, zebraLinesColor, focusColor, borderStyle);
    const customCss = this.chartData.customCss;
    this.shadowRoot.innerHTML = modalHTML;
    this.injectCustomCss(customCss, headerColor, zebraLinesColor, headerFontColor);
    this.setupEventListeners();
    this.populateModalContent();
  }

  convertColor(color) {
    const { hue, saturation, brightness, alpha } = color;
    return hslToCss(hue, saturation, brightness, alpha !== undefined ? alpha : 1); // Use default alpha if not provided
  }

  getModalHTML(headerColor, headerFontColor, zebraLinesColor, focusColor, borderStyle) {
    return `
      <div role="presentation" class="sizechartProModal-root sizechartProDialog-root ${this.chartData.SizechartPro.image ? '' : 'no-root-image'}" id="sizechartProModal">
        <div id="sizechartProDialog-container" class="sizechartProDialog-container sizechartProDialog-scrollPaper"
          role="presentation" tabindex="-1">
          <div class="sizechartProPaper-root" role="dialog" aria-describedby="modal-modal-description" aria-labelledby="modal-modal-title">
            <div class="sizechartPro-dialog" id="sizechartPro-dialog">
              <svg id="closeModalButton" class="sizechartProSvgIcon-root sizechartProSvgIcon-fontSizeMedium close-button"
                focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
              <div class="sizechartPro-content" id="dialogsize" style="display: flex; flex-direction: column;">
                <div class="sizechartProBox-root">
                  <div class="sizechartPro_title">
                    <div class="sizechartProTypography-root sizechartProTypography-h6 sizechartProTypography">
                      ${this.chartData.sizeGuideTitle}
                    </div>
                  </div>
                  <div class="sizechartProTypography-root sizechartPro-product-title">
                    <div>${this.sizepro.data.productname}</div>
                  </div>
                </div>
                <div class="maintable-root srcoll-root">
                  <div class="sizechartPro-content layout">
                    <div class="sizechartPro-layout" style="--table-height: 434px; display: flex;">
                      <div class="sizechartPro-sizetable-container" style="flex: 1;">
                        <div class="sizechartProBox-root">
                          <div class="sizechartProBox-root">
                            <div class="sizechartProTabs-root">
                              <div class="sizechartProTabs-scroller sizechartProTabs-fixed"
                                style="overflow: hidden; margin-bottom: 0px;" id="sizechartProCovertButton-root">
                                <!-- Table convert button Will Go Here -->
                              </div>
                            </div>
                          </div>
                          <div class="sizechartProTableContainer-root border-${borderStyle}" id="sizechartProTableContainer-root">
                            <!-- Table Content Will Go Here -->
                          </div>
                        </div>
                      </div>
                      ${this.chartData.SizechartPro.image ? `
                      <div class="image-container" style="margin-left: 20px;">
                        <img src=${this.chartData.SizechartPro.image} alt="Description" class="right-image" />
                      </div>` : ''}
                    </div>
                    <div class="table_measurement-root" id="tableMeasurement">
                      <!-- Additional Content Below the Table -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const closeButton = this.shadowRoot.querySelector('.close-button');
    closeButton.addEventListener('click', () => this.closeModal());

    const modal = this.shadowRoot.getElementById('sizechartProModal');
    modal.addEventListener('click', (event) => {
      const modalContent = this.shadowRoot.getElementById('sizechartProDialog-container');
      if (!modalContent.contains(event.target)) {
        this.closeModal();
      }
    });
  }

  populateModalContent() {
    const convertButtons = this.ChartConvertButton();
    const sizechartProCovertButton = this.shadowRoot.getElementById('sizechartProCovertButton-root');

    if (sizechartProCovertButton && this.switchUnitEnable && convertButtons) {
      sizechartProCovertButton.prepend(convertButtons);
      this.setupUnitSwitchListeners();
    }

    const tableContainer = this.GenerateTableHtml();
    const tableMeasurementHtml = this.GenerateChartHtml();

    this.shadowRoot.getElementById('sizechartProTableContainer-root').prepend(tableContainer);
    const tableMeasurementDiv = this.shadowRoot.getElementById('tableMeasurement');

    if (tableMeasurementDiv && tableMeasurementHtml) {
      tableMeasurementDiv.prepend(tableMeasurementHtml);
    }
  }


  setupUnitSwitchListeners() {
    ['cm', 'inch'].forEach(unit => {
      this.shadowRoot.getElementById(`${unit}Button`).addEventListener('click', (event) => {
        event.stopPropagation();
        if (this.currentUnit !== unit) {
          this.switchUnit(unit);
          this.handleUnitClick(unit);
        }
      });
    });
  }

  ChartConvertButton() {
    const Container = document.createElement('div');
    const html = `
    <div aria-label="basic tabs example" class="sizechartProTabs-flexContainer"
      role="tablist"><button id="cmButton"
          class="sizechartProButtonBase-root  sizechartProTab-root sizechartProTab-textColorPrimary ${this.currentUnit === 'cm' ? 'active' : ''}"
          tabindex="0" type="button" role="tab" aria-controls="simple-tabpanel-0">CM</button>
      <button id="inchButton"
          class="sizechartProButtonBase-root  sizechartProTab-root sizechartProTab-textColorPrimary ${this.currentUnit === 'inch' ? 'active' : ''}"
          tabindex="0" type="button" role="tab"
          aria-controls="simple-tabpanel-1">INCHES</button>
    </div>`;
    Container.innerHTML = html;
    return Container;
  }
  GenerateChartHtml() {
    if (!this.chartData || !this.chartData.SizechartPro) {
      return; // or handle accordingly
    }
    const Container = document.createElement('div');
    Container.classList.add('sizeTablehtmlContent-root');
    Container.innerHTML = this.chartData.SizechartPro.content;
    return Container;
  }

  // Function to convert sizes and format them
  GenerateTableHtml() {
    if (!this.chartData || !this.chartData.SizechartPro) {
      return; // or handle accordingly
    }
    let formattedData = JSON.parse(this.chartData.SizechartPro.user_chart_data);

    if (this.switchUnitEnable)
      // Apply rounding and decimal precision immediately on load
      formattedData = this.formatSizes(formattedData, this.decimalPrecision, this.roundingStep);

    const tableContainer = document.createElement('div');
    const table = document.createElement('table');
    table.classList.add('sizechartProTable-root', 'sizechartProTable-stickyHeader', 'sizechartProTableChart');
    table.setAttribute('aria-label', 'size table');

    // Create table head
    const thead = document.createElement('thead');
    thead.classList.add('sizechartProTableHead-root');

    const headRow = document.createElement('tr');
    headRow.classList.add('sizechartProTableRow-root', 'sizechartProTableRow-head');

    const headers = Object.keys(formattedData[0]); // Use formatted data for headers

    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.classList.add(
        'sizechartProTableCell-root',
        'sizechartProTableCell-head',
        'sizechartProTableCell-stickyHeader',
        headerText === '' ? 'sizechartProTableCell-alignLeft' : 'sizechartProTableCell-alignCenter',
        'sizechartProTableCell-sizeMedium'
      );
      th.setAttribute('scope', 'col');
      th.textContent = headerText;
      headRow.appendChild(th);
    });

    thead.appendChild(headRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    tbody.classList.add('sizechartProTableBody-root');
    formattedData.forEach(item => {
      const row = document.createElement('tr');
      row.classList.add('sizechartProTableRow-root');

      headers.forEach(header => {
        const td = document.createElement('td');
        td.classList.add('sizechartProTableCell-root', 'sizechartProTableCell-body', 'sizechartProTableCell-sizeMedium');

        const span = document.createElement('span');
        span.classList.add('sizechartPro-cell-text');
        span.textContent = item[header] || ''; // Ensure it displays empty if undefined

        td.appendChild(span);
        row.appendChild(td);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
  }

  // Function to format sizes and apply rounding
  formatSizes(data, decimalPlaces, roundingValue) {
    return data.map(item => {
      const newItem = { ...item }; // Create a new object to avoid mutating the original
      Object.keys(newItem).forEach(key => {
        if (key !== 'Size') {
          const value = newItem[key];
          if (this.isNumeric(value)) {
            newItem[key] = this.roundToNearest(value, roundingValue, decimalPlaces);
          } else if (value.includes('-')) {
            newItem[key] = this.formatRange(value, decimalPlaces, roundingValue);
          }
        }
      });
      return newItem;
    });
  }

  // Function to format range values (e.g., "34-36")
  formatRange(value, decimalPlaces, roundingValue) {
    const [start, end] = value.split('-').map(v => parseFloat(v.trim()));
    const formattedStart = this.roundToNearest(start, roundingValue, decimalPlaces);
    const formattedEnd = this.roundToNearest(end, roundingValue, decimalPlaces);
    return `${formattedStart} - ${formattedEnd}`;
  }

  // Function to round to the nearest specified value
  roundToNearest(value, roundingValue, decimalPlaces) {
    const roundedValue = Math.round(value / roundingValue) * roundingValue;
    return roundedValue.toFixed(decimalPlaces);
  }

  // Utility function to check if a value is numeric
  isNumeric(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

}

// Register the custom element
customElements.define('size-chart-modal', SizeChartModal);

// Function to check chart availability and append the button

let chartData = null
async function checkChartAvailability() {
  let existingButton = document.querySelector('.sizemaindiv');
  if (!existingButton) {
    const sizepro = window.sizePro;  // Access global object

    try {
      if (!chartData) {
        const response = await fetch(`https://fate-seats-losing-mesh.trycloudflare.com/api/shopentry/${sizepro.shop}?product=${sizepro.data.product}&collections=${sizepro.data.collections}`);

        if (response.ok) {
          const data = await response.json();
          if (data.size.chart_exists) {
            chartData = data.size;
            appendButton(data);
          }
        } else {
          console.error('Failed to check chart availability:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error fetching chart availability:', error);
    }
  }
}

// Function to append the button
function appendButton(settings) {
  const style = document.createElement('style');
  style.setAttribute('id', 'sizechartProButtoncss')
  document.head.appendChild(style);

  // Default styles
  style.textContent = `
    .sizemaindiv {
        display: flex;
        align-items: center;
        justify-content:${window.sizePro.data.size_button_position_desktop}
    }
    .sizemaindiv img { cursor:pointer}

    .sizemaindiv .SizechartPro-button-text {
        margin-bottom: 0;
        text-decoration: underline;
        font-size: 16px;
        cursor: pointer;
        font-weight: 600;
    }
`;

  // Conditional CSS
  if (settings.size.SizePlacement === 'floating') {
    style.textContent += `
        .sizemaindiv {
          align-items: center;
          position: fixed;
          right: 0;
          z-index: 1000;
          writing-mode: vertical-rl;
          top: 50%;
          transform: translateY(-50%);
          background: #ffebcdad;
          padding: 5px;
          margin: 0;
          height: 230px;
          display: flex;
          justify-content: center;
          border-radius: 5px;
          gap: 8px;
        }
    `;
  }


  const outerDiv = document.createElement('div');
  const innerDiv = document.createElement('div');
  innerDiv.className = 'sizemaindiv';

  const img = document.createElement('img');
  img.src = settings.size.icon;
  img.alt = 'Open Size Chart Pro Icon';
  img.style.width = 'auto';
  img.style.marginLeft = '0px';

  const span = document.createElement('span');
  span.className = 'form__label SizechartPro-button-text';
  span.style.marginLeft = '7px';
  span.textContent = settings.size.sizeGuideTitle;

  innerDiv.appendChild(img);
  innerDiv.appendChild(span);
  outerDiv.appendChild(innerDiv);


  // Add event listener to open the modal on button click
  outerDiv.addEventListener('click', () => {
    appendModal();  // Dynamically append the modal when button is clicked
  });

  const targetContainer = document.querySelector('.sizePro-container');
  if (settings.size.SizePlacement === 'floating') {
    document.body.appendChild(outerDiv);
  } else {
    if (targetContainer) {
      targetContainer.appendChild(outerDiv);
    }
  }
}

function hslToCss(hue, saturation, brightness, alpha = 1) {
  const lightness = brightness * 100; // convert to percentage
  return `hsla(${hue}, ${saturation * 100}%, ${lightness}%, ${alpha})`;
}

// Function to append the modal dynamically
function appendModal() {
  if (!chartData) {
    console.error('Chart data is not available when trying to open the modal.');
    return; // Exit the function if chartData is not ready
  }

  let existingModal = document.querySelector('size-chart-modal');
  if (!existingModal) {
    const sizeChartModal = document.createElement('size-chart-modal');
    document.body.appendChild(sizeChartModal);
    sizeChartModal.setChartData(chartData);
    sizeChartModal.openModal();

  }
}

// Call the chart availability check
window.addEventListener('DOMContentLoaded', checkChartAvailability);
