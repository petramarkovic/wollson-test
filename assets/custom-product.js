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
          const options = this.select.querySelectorAll('option');
          // console.log(options);
          this.select.addEventListener('change', (event) => {
            // console.log(this.data);
            // console.log(event.target.value);
            console.log(this.data[event.target.value]);
            // options.forEach(option => {
            //   option.removeAttribute('selected');
            //   if (option.getAttribute('value') === event.target.value) {
            //     console.log('option selected');
            //     option.setAttribute('selected', 'selected');
            //   }
            // })
            const selectedIndex = event.target.selectedIndex;
            const selectedOption = event.target.options[selectedIndex];
            console.log(selectedOption.value); // This should give you the value of the selected option
            console.log(selectedOption.textContent);
          });
        }
	  }
	);
  }
  