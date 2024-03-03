if (!customElements.get('custom-product-form')) {
    customElements.define(
        'custom-product-form',
        class CustomProductForm extends HTMLElement {
            constructor() {
                super();

                this.form = this.querySelector('form');
                this.submitButton = this.querySelector('[type="submit"]');
                this.minusBtn = this.querySelector('.minus');
                this.plusBtn = this.querySelector('.plus');
                this.quantityInput = this.querySelector('.quantity');
                this.inputs = this.querySelectorAll('.custom-product__variant input[type="radio"]');
                this.hiddenInput = this.querySelector('.js-hidden-input');
                this.variantData = JSON.parse(document.querySelector('#variant-data').textContent);
                this.items = this.querySelectorAll('.custom-product__items');

                this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
                this.quantityButtonsEvents();
                this.inputsEvents();
                this.loadMetafields();
            }

            onSubmitHandler(e) {
                if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
                this.submitButton.setAttribute('aria-disabled', true);
                const formData = {};
                for (const element of this.form.elements) {
                    if (element.name) {
                        formData[element.name] = element.value;
                    }
                }
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
                newValue = Math.max(1, newValue);
                newValue = newValue < 10 ? '0' + newValue : newValue;
                this.quantityInput.value = newValue;
            }

            inputsEvents() {
                this.inputs.forEach(input => {
                    input.addEventListener('change', () => {
                        this.handleInputSelection(input.value);
                    });
                });
            }

            handleInputSelection(selectedOptionValue) {
                this.inputs.forEach(input => {
                    input.removeAttribute('checked');
                });
                const selectedInput = this.querySelector(`.custom-product__variant input[type="radio"][value="${selectedOptionValue}"]`);
                if (selectedInput) {
                    selectedInput.setAttribute('checked', 'checked');
                }
                this.hiddenInput.setAttribute('value', selectedOptionValue);
                this.items.forEach(item => {
                    const id = item.getAttribute('data-id');
                    if (id === selectedOptionValue) {
                      item.style.display = 'block';
                    } else {
                      item.style.display= 'none';
                    }
                });
            }

            loadMetafields() {
              if (!this.inputs || this.inputs.length === 0) {
                  return;
              }
              const activeInput = Array.from(this.inputs).find(input => input.checked);
              const activeId = activeInput.value;
              this.items.forEach((item, index) => {
                  const id = item.getAttribute('data-id');
                  if (activeId !== id) {
                      item.style.display = 'none';
                  } else {
                      item.style.display = 'block';
                  }
              });
            }
        }
    );
}