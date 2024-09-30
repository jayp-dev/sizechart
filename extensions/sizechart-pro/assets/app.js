
class SizeChartModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.sizepro = window.sizePro;  // Global variable
    this.chartData = [];
    this.render();
  }

  setChartData(chartData) {
    this.chartData = chartData;
    this.GenerateHtml();
    this.render(); // Re-render the modal with the updated data
  }

  // Method to open the modal and load chart data
  openModal() {
    const modal = this.shadowRoot.getElementById('sizechartProModal');
    modal.style.display = 'flex';  // Show the modal
  }

  // Method to close the modal and remove from DOM
  closeModal() {
    const modal = this.shadowRoot.getElementById('sizechartProModal');
    modal.style.display = 'none';  // Hide the modal
    this.remove();  // Remove the element from the DOM
  }

  // Render the modal structure
  render() {

    this.shadowRoot.innerHTML = `
        <style>
        .sizechartProModal-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          /* Semi-transparent background */
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
          max-width: 850px;
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

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background-color: #d60a0b;
          border: 0;
          font-weight: 400;
          padding: 8px;
        }

        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        tr:nth-child(even) td {
          background: #20c3c2
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
        }
    </style>
      <div role="presentation" class="sizechartProModal-root  sizechartProDialog-root" id="sizechartProModal">
      <div id="sizechartProDialog-container" class="sizechartProDialog-container sizechartProDialog-scrollPaper"
         role="presentation" tabindex="-1"
         style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);">
         <div class="sizechartProPaper-root" role="dialog" aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title">
            <div class="sizechartPro-dialog" id="sizechartPro-dialog">
               <svg id="closeModalButton"
                  class="sizechartProSvgIcon-root sizechartProSvgIcon-fontSizeMedium close-button"
                  focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                  <path
                     d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                  </path>
               </svg>
               <div class="sizechartPro-content" id="dialogsize" style="display: flex; flex-direction: column;">
                  <div class="sizechartProBox-root">
                     <div class="sizechartPro_title">
                        <div
                           class="sizechartProTypography-root sizechartProTypography-h6 sizechartProTypography">
                          ${this.chartData.sizeGuideTitle}
                        </div>
                     </div>
                     <div class="sizechartProTypography-root sizechartPro-product-title">
                        <div>${this.sizepro.data.productname}</div>
                     </div>
                  </div>
                  <div class="sizechartPro-content layout">
                     <div
                        class="sizechartProTypography-root sizechartProTypography-h6 sizechartProTypography-gutterBottom sizechartPro_subtitle">
                     </div>
                     <div class="sizechartPro-layout sizechartProtable_top no-image no-text"
                        style="--table-height: 434px;">
                        <div class="sizechartPro-sizetable-container">
                           <div class="sizechartProBox-root">
                              <div class="sizechartProBox-root">
                                 <div class="sizechartProTabs-root">
                                    <div class="sizechartProTabs-scroller sizechartProTabs-fixed"
                                       style="overflow: hidden; margin-bottom: 0px;">
                                       <div aria-label="basic tabs example"
                                          class="sizechartProTabs-flexContainer" role="tablist"><button
                                          class="sizechartProButtonBase-root sizechartPro-tab_label-unselected sizechartProTab-root sizechartProTab-textColorPrimary"
                                          tabindex="-1" type="button" role="tab" aria-selected="false"
                                          id="simple-tab-0" aria-controls="simple-tabpanel-0">CM<span
                                          class="sizechartProTouchRipple-root"></span></button>
                                          <button class="sizechartProButtonBase-root sizechartPro-tab_label-unselected sizechartProTab-root sizechartProTab-textColorPrimary sizechartPro-tab_label-selected sizechartPro-selected"
                                             tabindex="0" type="button" role="tab" aria-selected="true"
                                             id="simple-tab-1"
                                             aria-controls="simple-tabpanel-1">INCHES<span
                                             class="sizechartProTouchRipple-root"></span></button>
                                       </div>
                                       <span class="sizechartProTabs-indicator"
                                          style="left: 92px; width: 90px;"></span>
                                    </div>
                                 </div>
                              </div>
                              <div class="sizechartProPaper-root sizechartProTableContainer-root" id="sizechartProTableContainer-root">
                              
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    `;

    // sizechartProTableContainer-root
    const tableContainer = this.GenerateHtml();
    this.shadowRoot.getElementById('sizechartProTableContainer-root').prepend(tableContainer);

    // Close button functionality
    this.shadowRoot.querySelector('.close-button').addEventListener('click', () => {
      this.closeModal();
    });

    // Close modal when clicking outside of modal content
    this.shadowRoot.getElementById('sizechartProModal').addEventListener('click', (event) => {
      const modalContent = this.shadowRoot.getElementById('sizechartProDialog-container');
      if (!modalContent.contains(event.target)) {
        this.closeModal();
      }
    });
  }

  GenerateHtml() {
    if (!this.chartData || !this.chartData.SizechartPro) {
      return; // or handle accordingly
    }

    const data = JSON.parse(this.chartData.SizechartPro.user_chart_data);
    const tableContainer = document.createElement('div');
    const table = document.createElement('table');
    table.classList.add('sizechartProTable-root', 'sizechartProTable-stickyHeader', 'sizechartProTableChart');
    table.setAttribute('aria-label', 'size table');

    // Create table head
    const thead = document.createElement('thead');
    thead.classList.add('sizechartProTableHead-root');

    const headRow = document.createElement('tr');
    headRow.classList.add('sizechartProTableRow-root', 'sizechartProTableRow-head');

    const headers = Object.keys(data[0]);

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
    data.forEach(item => {
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
        const response = await fetch(`https://marvel-cigarettes-pa-rational.trycloudflare.com/api/shopentry/${sizepro.shop}?product=${sizepro.data.product}&collections=${sizepro.data.collections}`);
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
  document.body.appendChild(outerDiv);

  // Add event listener to open the modal on button click
  outerDiv.addEventListener('click', () => {
    appendModal();  // Dynamically append the modal when button is clicked
  });

  const targetContainer = document.querySelector('.sizePro-container');
  if (targetContainer) {
    targetContainer.appendChild(outerDiv);
  }
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