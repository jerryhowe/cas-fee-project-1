class Modal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.isOpen = false
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.75);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
            }

            :host([opened]) #backdrop,
            :host([opened]) #modal {
                opacity: 1;
                pointer-events: all;
            }

            :host([opened]) #modal {
                top: 15vh;
            }

            #modal {
                position: fixed;
                top: 10vh;
                left: 25%;
                width: 50%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                color: var(--color);
                background: var(--background);
            }

            header {
                padding: 1rem;
                border-bottom: 1px solid #ccc;
                display: flex;
                justify-content: space-between;
            }

            ::slotted(h1) {
                font-size: 1.25rem;
                margin: 0;
            }

            #main {
                padding: 1rem;
            }

            #actions {
                border-top: 1px solid #ccc;
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
            }

            #actions button {
                margin: 0 0.25rem;
            }
            .btn {
              background-color: #ff5a85;
              padding: 10px 14px;
              border: none;
              color: #fff;
              cursor: pointer;
              border-radius: 5px;
            }
             #close-btn {
              background-color: #ff1e80;
              padding: 5px 10px;
              font-size: 12px;
            }
             #confirm-btn {
              background-color: #04aa6d;
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                  <slot name="title">Default Title</slot>
                  <button class="btn" id="close-btn">X</button>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button class="btn" id="cancel-btn">Cancel</button>
                <button class="btn" id="confirm-btn">Okay</button>
            </section>
        </div>
    `
    const backdrop = this.shadowRoot.querySelector('#backdrop')
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn')
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn')
    const close = this.shadowRoot.querySelector('#close-btn')
    backdrop.addEventListener('click', this.cancel.bind(this))
    cancelButton.addEventListener('click', this.cancel.bind(this))
    close.addEventListener('click', this.cancel.bind(this))
    confirmButton.addEventListener('click', this.confirm.bind(this))
  }

  attributeChangedCallback() {
    this.isOpen = this.hasAttribute('opened')
    if (this.hasAttribute('hideActionButtons')) {
      this.shadowRoot.querySelector('#actions').style.display = 'none'
      // this.hideActionButtons = true
    } else {
      this.shadowRoot.querySelector('#close-btn').style.display = 'none'
    }
  }

  static get observedAttributes() {
    return ['opened']
  }

  open() {
    this.setAttribute('opened', '')
    this.isOpen = true
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened')
    }
    this.isOpen = false
  }

  cancel(event) {
    this.hide()
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true })
    event.target.dispatchEvent(cancelEvent)
  }

  confirm() {
    this.hide()
    const confirmEvent = new Event('confirm')
    this.dispatchEvent(confirmEvent)
  }
}

customElements.define('custom-modal', Modal)
