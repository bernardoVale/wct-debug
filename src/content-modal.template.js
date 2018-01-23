export default function getTemplate() {
    return `
        <div class='modal-background'></div>
        <div class='modal-content'>
          <a class="close-button"></a>
          <slot></slot>
        </div>
      `;
}
