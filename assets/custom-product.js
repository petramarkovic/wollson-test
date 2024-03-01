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
			
			this.quantityButtonsEvents();
		}
  
		onSubmitHandler(e) {
		  e.preventDefault();
		  if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
  
		//   this.handleErrorMessage();
  
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
			  newValue = 1; // Ensure quantity doesn't go below 1
			}
			this.quantityInput.value = newValue;
		}
	  }
	);
  }
  