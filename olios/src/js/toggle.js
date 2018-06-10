export default class ToggleVisibility {
  constructor ({btn, layout, activeClassLayout, activeClassButton}) {
    this.btn = btn;
    this.layout = layout;
    this.activeClassLayout = activeClassLayout;
    this.activeClassButton = activeClassButton;
    this._events();
  }

  _events () {
    this.btn.addEventListener('click', () => {
      this.layout.classList.toggle(this.activeClassLayout);
      this.btn.classList.toggle(this.activeClassButton);
    });
  }
  
}