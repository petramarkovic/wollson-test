if (!customElements.get('custom-product-form')) {
	customElements.define(
	  'custom-product-form',
	  class CustomProductForm extends HTMLElement {
		constructor() {
		  super();
  
			this.form = this.querySelector('form');
			this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
			this.submitButton = this.querySelector('[type="submit"]');
			this.minusBtn = this.querySelector('.minus');
			this.plusBtn = this.querySelector('.plus');
			this.quantityInput = this.querySelector('.quantity');
            this.select = this.querySelectorAll('.custom-product__variant input[type="radio"]');
            this.variantDetails = this.querySelector('.variant-details');
			
			this.quantityButtonsEvents();
            this.selectEvents();
            this.loadMetafields();

            this.data = JSON.parse(document.querySelector('#variant-data').textContent);

		}
  
		onSubmitHandler(e) {
		  // e.preventDefault();
		  if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
  
		  this.submitButton.setAttribute('aria-disabled', true);
  
		  // const formData = new FormData(this.form);
          const formData = {};
          const formElements = this.form.elements;
      
          for (let i = 0; i < formElements.length; i++) {
              const element = formElements[i];
              if (element.name) {
                  formData[element.name] = element.value;
              }
          }
		  console.log(formData);
  
		}

		quantityButtonsEvents() {
			this.minusBtn.addEventListener('click', () => {
				this.updateQuantity(-1);
			});
		   
			this.plusBtn.addEventListener('click', () => {
				this.updateQuantity(1);
			});
		}
  
		updateQuantity(change) {
			let newValue = parseInt(this.quantityInput.value) + change;
            if (newValue < 1) {
                newValue = 1;
            }
          
            if (newValue < 10) {
                newValue = '0' + newValue;
            }
            this.quantityInput.value = newValue;
		}

        selectEvents() {
          
          this.select.forEach(input => {
              input.addEventListener('change', (event) => {
                  const selectedOptionValue = event.target.value;
                  const items = document.querySelectorAll('.custom-product__item');

                  input.removeAttribute('checked');
                  event.target.setAttribute('checked');
      
                  items.forEach(item => {
                      const id = item.getAttribute('data-id');
                      if (id === selectedOptionValue) {
                          item.style.display = 'none';
                      } else {
                          item.style.display = 'flex';
                      }
                  });
              });
          });
        }

        loadMetafields() {
          if (!this.select || this.select.length === 0) {
              return;
          }
      
          const activeId = this.select[0].value;
          const items = document.querySelectorAll('.custom-product__item');
      
          items.forEach(item => {
              const id = item.getAttribute('data-id');
              if (id === activeId) {
                  item.style.display = 'none';
              } else {
                  item.style.display = 'flex';
              }
          });
        }
	  }
	);
  }
  