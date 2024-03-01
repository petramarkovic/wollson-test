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
            this.select = this.querySelector('.custom-product__form-variants');
            this.variantDetails = this.querySelector('.variant-details');
			
			this.quantityButtonsEvents();
            this.selectEvents();

            this.data = JSON.parse(document.querySelector('#variant-data').textContent);

		}
  
		onSubmitHandler(e) {
		  // e.preventDefault();
		  if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
  
		  this.submitButton.setAttribute('aria-disabled', true);
  
		  const formData = new FormData(this.form);
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
          const item1 = document.querySelector('.js-custom-product-item-1');
          const item1Title = item1.querySelector('.custom-product__item-title');
          const item1Description = item1.querySelector('.custom-product__item-description');
          const item2 = document.querySelector('.js-custom-product-item-2');
          const item2Title = item2.querySelector('.custom-product__item-title');
          const item2Description = item2.querySelector('.custom-product__item-description');
          const item3 = document.querySelector('.js-custom-product-item-3');
          const item3Title = item3.querySelector('.custom-product__item-title');
          const item3Description = item3.querySelector('.custom-product__item-description');
          
          this.select.addEventListener('change', (event) => {

            console.log(this.data[event.target.value]);

            const selectedIndex = event.target.selectedIndex;
            const selectedOption = event.target.options[selectedIndex];
            const variantData = this.data[event.target.value];

            item1Title.textContent = variantData.title;
            item1Description.textContent = variantData.description;
            item2Title.textContent = variantData.title;
            item2Description.textContent = variantData.description;
            item3Title.textContent = variantData.title;
            item3Description.textContent = variantData.description;
            
            console.log(selectedOption.value);
            console.log(selectedOption.textContent);
          });
        }
	  }
	);
  }
  