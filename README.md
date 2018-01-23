# Description

A simple modal dialog component that allows users to show and hide content. Modal slides up on show and down on hide. Also includes an overlay so that content featured in modal will be more prominent. You can customize the HTML element of the open Modal button, hide and show text. Also can also have the modal open on page load utilizing attributes below.

# Installation

```
npm install --save @web-component-ecom-common/content-modal
```

# Usage

```
<content-modal>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  ...
</content-modal>
```

# Attributes

```
button-type   <Optional>: HTML type of button. Default = "span"
open          <Optional>: Modal is shown on initial load  
text-show     <Optional>: Custom show button text. Default = "show modal"
```
