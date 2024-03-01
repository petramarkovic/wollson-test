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
  
		}
  
		onSubmitHandler(e) {
		  e.preventDefault();
		  if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
  
  
		  this.submitButton.setAttribute('aria-disabled', true);
  
		  const formData = new FormData(this.form);
		  console.log(formData);
  
		}

		quantityButtonsEvents() {
			this.minusBtn.addEventListener('click', () => {
				updateQuantity(-1);
			});
		   
			this.plusBtn.addEventListener('click', () => {
				updateQuantity(1);
			});
		}
  
		updateQuantity(change) {
			let newValue = parseInt(quantityInput.value) + change;
			if (newValue < 1) {
			  newValue = 1;
			}
			quantityInput.value = newValue;
		}
	  }
	);
  }
  