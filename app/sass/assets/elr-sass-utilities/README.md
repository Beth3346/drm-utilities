# Elizabeth Rogers Sass Utilities

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## About elr-sass-utilities

These are some sass extends and mixins that we are using over and over in our projects
This is an ongoing project. Expect frequent changes to the code.

## Installation

+ Add utilities folder and _elr-sass-utilities.scss to project sass folder
+ Import _elr-sass-utilities.scss into main scss file

## Sass Utilities

### Media Query Breakpoints

breakpoint deminsions can be customized in variables file

+ **@elr-breakpoint**

        @include elr-breakpoint(trenta) {
            // place rules here
        }

        @include elr-breakpoint(venti) {
            // place rules here
        }

    + **Arguments:**
        + $point: breakpoint name
            + trenta
            + venti
            + grande
            + tall
            + short
            + espresso
            + bean

+ **elr-hide-breakpoint**

        @include elr-hide-breakpoint($point);

    + hides element at breakpoint
    + **Arguments:**
        + $point: breakpoint name

### Layout Utilities

+ **elr-clearfix**

        @include elr-clearfix()

    + a modern clearfix alternative to overflow: hidden
    + takes no arguments

+ **%elr-container**

        @extend %elr-container;

    + Centers an element on the page
    + includes built in breakpoints for responsiveness

+ **%elr-container-full-width**

        @extend %elr-container-full-width;

    + Centers an element on the page
    + for elements that take up the entire width of the wrapper
    + includes built in breakpoints for responsiveness

+ **%elr-reset-box**

        @extend %elr-reset-box;

    + removes margin and padding from an element

+ **%elr-row**

        @extend %elr-row;

    + creates an element that completely fills its container

+ **%elr-center-block**

        @extend %elr-center-block;

    + centers an element horizontally
    + only works on elements with a definted width rule

+ **%elr-comment-titles**

        @extend %elr-comment-titles;

    + comment titles

+ **%elr-heading**

        @extend %elr-heading;

    + heading formatting

+ **%elr-lists**

        @extend %elr-lists;

    + list formatting

+ **elr-feature-box**

        @include elr-feature-box($total, $margin-top, $margin-bottom);

    + creates a row of equally sized boxes
    + **Arguments:**
        + $total: total number of boxes per row (optional - defaults to 3)
        + $margin-top: (optional - defaults to 0)
        + $margin-bottom: (optional - defaults to 0)

+ **elr-feature-box-margin**

        @include elr-feature-box-margin($total, $margin, $margin-top, $margin-bottom);

    + creates a row of equally sized boxes with margins
    + **Arguments:**
        + $total: total number of boxes per row (optional - defaults to 3)
        + $margin: left and right margin for feature boxes (optional - defaults to 1%)
        + $margin-top: (optional - defaults to $margin)
        + $margin-bottom: (optional - defaults to $margin)

+ **elr-circle-blocks**

        @include elr-circle-blocks($container-element-width, $margin, $total);

    + creates a row of equally sized circle elements    
    + **Arguments:**
        + $container-element-width: width of container element (optional - defaults to to 1000px)
        + $margin: margin for circle blocks (optional - defaults to 20px)
        + $total: total number of elements per row (optional - defaults to 3)

+ **elr-em-font**

        @include elr-em-font($size);

    + converts px font to em font
    + **Arguments:**
        + $size: takes a whole number

+ **elr-em-margin**

        @include elr-em-margin($top, $right, $bottom, $left);

    + converts px margin to em margin
    + $top is required, the rest are optional
    + if $right is null the first argument is used for all sides of element
    + if $right is not null you must provide $bottom and $left arguments
    + **Arguments:**
        + $top
        + $right (optional - defaults to $top)
        + $bottom (optional - defaults to $top)
        + $left (optional - defaults to $top)

+ **elr-em-padding**

        @include elr-em-padding($top, $right, $bottom, $left);

    + converts px padding to em padding
    + $top is required, the rest are optional
    + if $right is null the first argument is used for all sides of element
    + if $right is not null you must provide $bottom and $left arguments
    + **Arguments:**
        + $top
        + $right (optional - defaults to $top)
        + $bottom (optional - defaults to $top)
        + $left (optional - defaults to $top)

+ **elr-vertically-center**

        @include elr-vertically-center($container-element-height, $height);

    + vertically centers an element using absolute positioning  
    + **Arguments:**
        + $container-element-height: height of container element
        + $height: height of element to be positioned vertically    

+ **elr-horizontally-center**

        @include elr-horizontally-center($container-element-width, $width);

    + horizontally centers an element using absolute positioning    
    + **Arguments:**
        + $container-element-width: width of container element
        + $width: width of element to be positioned horizontally        

### Page Element Utilities

+ **%elr-info-block**

        @extend %elr-info-block;

    + creates a horizontally centered box that takes up 90% of its container
    + text is centered

+ **%elr-feature-heading**

        @extend %elr-feature-heading;

    + heading for feature boxes

+ **elr-section-heading**
    
        @include elr-section-heading($align, $size);

    + styles a basic section heading
    + usually applied to h1 elements
    + **Arguments:**
        + $align: text-alignment (optional - defaults to center)
        + $size: font-size (optional - defaults to 24px)

+ **elr-section-sub-heading**
    
        @include elr-section-sub-heading($align, $size);

    + styles a basic section sub-heading
    + usually applied to h2 elements
    + **Arguments:**
        + $align: text-alignment (optional - defaults to center)
        + $size: font-size (optional - defaults to 20px)

+ **elr-pill-heading**

        @include elr-pill-heading($bk-color, $text-color);

    + styles a text element with a solid background and a slight border radius
    + **Arguments:**
        + $bk-color: background color of text element
        + $text-color: color of text

+ **elr-ribbon-heading**

        @include elr-ribbon-heading($color, $stitch-color, $text-color, $text-shadow);

    **html implementation** 
        
        <h1><span class="ribbon-content">Ribbon Heading</span></h1>

    + styles a heading with a ribbon style
    + ribbon folds sit below heading
    + **Arguments:**
        + $color: ribbon color
        + $stitch-color: color of stitch effect (optional - defaults to white)
        + $text-color: color of text (optional - defaults to white)
        + $text-shadow: color of text-shadow (optional - defaults to none for no text-shadow)

+ **elr-list-divider**
    
        @include elr-list-divider($color);

    + creates a seperator between list items
    + **Arguments:**
        * $color: line color (optional - defaults to $light-grey)

+ **elr-unstyled-list**

        @include elr-unstyled-list($align);

    + removes default bullets and numbers from a list
    + also applies hover underline states to link elements within list
    + **Arguments:**
        + $align: text-alignment (optional - defaults to left)

+ **elr-border-list**

        @include elr-border-list($align, $border-color, $shadow-color);

    + styles a list with 1px bottom borders on each li element
    + **Arguments:**
        + $align: text-alignment (optional - defaults to left)
        + $border-color: color of bottom border (optional - defaults to dark grey)
        + $shadow-color: optional shadow color for inset effect
            + recommend lighten($border-color, 30%)
            + optional - defaults to none for no shadow effect

+ **elr-inline-list**
    
        @include elr-inline-list();

    + sets li and a elements to inline
    + removes margin and padding from container

+ **elr-triangle-list**

        @include elr-triangle-list();

    + creates a list with triangle bullets
    
+ **elr-checked-list**

        @include elr-checked-list();

    + creates a list with checkmark bullets

+ **elr-floated-list**

        @include elr-floated-list()

    + creates a list of elements floated to the left

+ **elr-list-group**

        @include elr-list-group($background-color, $text-color, $border-radius, $border-color)

    + creates a list group

+ **elr-post-meta**

        @include elr-post-meta($image);

    + adds an image to the left of a wordpress post meta element
    + **Arguments:**
        + $image: icon to display next to post meta element (should be about 15px square)

+ **context-box**

        @include context-box($type, $border-radius, $color);

    + styles a block element with a light backround and darker border
    + color variables are set in variables.scss
    + useful for displaying messages to users
    + also creates a class for styling a close button with .close
    + **Arguments:**
        + $type: message content; can be: info, danger, warning, success, muted, or custom (optional - defaults to info)
        + $border-radius: optional - defaults to 0
        + $color: only used when styling a custom content box (optional - defualts to none)

+ **elr-label**

        @include elr-label($type, $border-radius, $color);

    + styles a context label
    + **Arguments:**
        + $type: message content; can be: info, danger, warning, success, muted, or custom (optional - defaults to info)
        + $border-radius: optional - defaults to 3px
        + $color: only used when styling a custom label (optional - defualts to none)

+ **elr-accordion**

        @include elr-accordion($label-color, $border-radius, $color, $border-color);

    + styles accordion label and content
    + **Arguments:**
        + $label-color: optional - defaults to $link-color
        + $border-radius: optional - defaults to 0
        + $color: optional - defaults to white
        + $border-color: optional - defaults to $grey

+ **elr-thumbnail-list**

        @include elr-thumbnail-list($border-color, $width, $height, $glow);

    + styles a list of thumbnail images
    + **Arguments:**
        * $border-color: optional - defaults to white
        * $width: optional - defaults to 150px
        * $height: optional - defaults to 120px
        * $glow: optional - defaults to $elr-blue

+ **elr-popover**

        @include elr-popover($direction, $bk-color, $color);

    + styles a simple popover
    + **Arguments:**
        * $position: position of popover
            - acceptable values:
                + 'left' (default)
                + 'right'
                + 'top'
                + 'bottom'
            - entering an unlisted value will cause the popover to be positioned top the right
        * $bk-color: color of the popover (optional - defaults to $link-color)
        * $color: text color (optional - defaults to white)

+ **elr-tooltip**

        @include elr-tooltip($direction, $bk-color, $color, $width);

    + styles a simple tooltip
    + **Arguments:**
        * $position: position of tooltip
            - acceptable values:
                + 'left' (default)
                + 'right'
                + 'top'
                + 'bottom'
            - entering an unlisted value will cause the tooltip to be positioned top the right
        * $bk-color: color of the tooltip (optional - defaults to $link-color)
        * $color: text color (optional - defaults to white)
        * $width: tooltip width (optional -defaults to 100px)

### Lightboxes & Modals

+ **elr-lightbox**

        @include elr-lightbox($overlay-color, $opacity);

    + styles a lightbox overlay and a close button
    + **Arguments:**
        * $overlay-color: color for the lightbox overlay (optional - defaults to black)
        * $opacity: transparency of the overlay (optional - defaults to 0.8)

+ **elr-lightbox-slideshow**

        @include elr-lightbox-slideshow($overlay-color, $opacity, $image-size, $position);

    + styles a lightbox slideshow
    + **Arguments:**
        * $overlay-color: color for the lightbox overlay (optional - defaults to black)
        * $opacity: transparency of the overlay (optional - defaults to 0.8)
        * $image-size: size of the square thumbnails in list (optional - defaults to 125px)
        * $position: position of thumbnail list
            - acceptable values:
                + 'bottom-left' (default)
                + 'bottom-right'
                + 'top-left'
                + 'top-right'
            - entering an unlisted value will cause the list to be positioned   in the bottom left

+ **elr-modals**

        @include elr-modals($overlay-color, $opacity, $modal-color, $button-color);

    + styles a lightbox for modal dialouges
    + **Arguments:**
        * $overlay-color: color for the lightbox overlay (optional - defaults to black)
        * $opacity: transparency of the overlay (optional - defaults to 0.8)
        * $modal-color: color of the modal boxes (optional - defaults to white)
        * $button-color: color of the buttons (optional - defaults to $link-color)
            - hover color is always background: white and text: $button-color

### Simple Slider

+ **elr-simple-slider**
    
        @include elr-simple-slider($next-image, $prev-image);

    + creates styles for the Simple Slider jQuery
    + **Arguments:**
        * $next-image: slide navigation images (optional - defaults to next.png)
        * $prev-image: slide navigation images (optional - defaults to previous.png)

### Shapes Utilities

+ **elr-circle**

        @include elr-circle($diameter, $display);

    + creates a perfect circle
    + **Arguments:**
        + $diameter: diameter of circle
        + $display: optional - defaults to block

+ **elr-ellipse**

        @include elr-ellipse($width, $height, $display);

    + creates an ellipse
    + **Arguments:**
        + $width: width of ellipse
        + $height: height of ellipse
        + $display: optional - defaults to block        
    
+ **elr-rectangle**

        @include elr-rectangle($width, $height, $display, $border-radius);

    + creates a rectangle
    + **Arguments:**
        + $width: width of rectangle
        + $height: height of rectangle
        + $display: optional - defaults to block
        + $border-radius - optional - defaults to 0 for no border-radius    
    
+ **elr-square**

        @include elr-square($width, $display, $border-radius);

    + creates a perfect square
    + **Arguments:**
        + $width: width and height of square
        + $display: optional - defaults to block
        + $border-radius - optional - defaults to 0 for no border-radius    

+ **elr-triangle**

        @include elr-triangle($direction, $base, $height, $color);

    + creates a triangle element
    + **Arguments:**
        + $direction: optional - defaults to top for a triangle that points up
            + use top-left, top-right, bottom-left, or bottom-right for a right triangle
        + $base: size of triangle (optional - defaults to 50px)
        + $height: optional - defaults to half
            + for a flatter triangle use $height: half
            + use $height: auto for a triangle of equal height and width
        + $color: triangle color (optional - defaults to light grey color)          

+ **elr-equilateral-triangle**

        @include elr-equilateral-triangle($direction, $base, $color);

    + creates an equilateral triangle element
    + **Arguments:**
        + $direction: optional - defaults to top for a triangle that points up
            + use top, right, left, or bottom
        + $base: size of triangle (optional - defaults to 50px)
        + $color: triangle color (optional - defaults to light grey color)          

+ **elr-quadrilateral-diamond**

        @include elr-quadrilateral-diamond($size, $skew);

    + creates a diamond shaped element
    + **Arguments:**
        + $size: size of triangle element
        + $skew: use positive skew for horizontal diamond; negative skew for vertical diamond
            + optional - defaults to 0 for an equilateral diamond   

+ **elr-pentagon**

        @include elr-pentagon($width, $height, $background-color);

    + creates a five sided element
    + **Arguments:**
        + $width: width of pentagon element
        + $height: height of pentagon element
        + $background-color: color of pentagon element  

+ **elr-hexagon**

        @include elr-hexagon($width, $height, $background-color);

    + creates a six sided element
    + **Arguments:**
        + $width: width of hexagon element
        + $height: height of hexagon element
        + $background-color: color of hexagon element       

+ **elr-octagon**

        @include elr-octagon($width, $height, $background-color);

    + creates an eight sided element
    + **Arguments:**
        + $width: width of octagon element
        + $height: height of octagon element
        + $background-color: color of octagon element       

+ **elr-parallelogram**

        @include elr-parallelogram($width, $height, $skew);

    + creates a parallelogram shaped element    
    + **Arguments:**
        + $width: width of parallelogram
        + $height: height of parallelogram
        + $skew: acute angle degree of parallelogram element (optional - defaults to 20)

+ **elr-trapezoid**

        @include elr-trapezoid($width, $height, $background-color);

    + creates a trapezoid shaped element    
    + **Arguments:**
        + $width: width of trapezoid element
        + $height: height of trapezoid element
        + $background-color: color of trapezoid element

+ **elr-ribbon-wrapper**

        @include elr-ribbon-wrapper($height, $color, $stitch-color);

    + creates a stitched ribbon that wraps a block element  
    + **Arguments:**
        + $height: height of ribbon
        + $color: $color of ribbon wrapper
        + $stitch-color: color of stitches (optional - defaults to white)

+ **elr-star-5**

        @include elr-star-5($width, $background-color, $z-index);

    + **Arguments:**
        + $width: width of element
        + $background-color: color of element (optional - defaults to light grey)
        + $z-index: optional - defaults to 0

+ **elr-star-6**

        @include elr-star-6($width, $background-color, $z-index);

    + **Arguments:**
        + $width: width of element
        + $background-color: color of element (optional - defaults to light grey)
        + $z-index: optional - defaults to 0

+ **elr-star-8**

        @include elr-star-8($width, $background-color, $z-index);

    + **Arguments:**
        + $width: width of element
        + $background-color: color of element (optional - defaults to light grey)
        + $z-index: optional - defaults to 0

+ **elr-badge** 

        @include elr-badge($width, $background-color, $z-index);

    + **Arguments:**
        + $width: width of element
        + $background-color: color of element (optional - defaults to light grey)
        + $z-index: optional - defaults to 0

### Navigation Utilities

+ **elr-nav-bar**

        @include elr-nav-bar($text-color, $hover-color, $align, $divider-color);

    + creates a horizontal list of links
    + has a transparent background
    + has a a:hover effect
    + takes an optional $align argument; otherwize left alignment
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to $text-color)
        + $hover-color: color of text when user mouses over a link (optional - defaults to $link-color)
        + $align: text alignment (optional - defaults to left)
        + $divider-color: color of list divider (optional - defaults to light grey)

+ **elr-nav-bar-stacked**

        @include elr-nav-bar-stacked($text-color, $hover-color, $align)

    + creates a vertical list of links
    + has a transparent background
    + has a a:hover effect
    + takes an optional $align argument; otherwize left alignment
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to $text-color)
        + $hover-color: color of text when user mouses over a link (optional - defaults to $link-color)
        + $align: text alignment (optional - defaults to left)          

+ **elr-nav-bar-solid**

        @include elr-nav-bar-solid($text-color, $background-color, $align, $active-color);

    + creates a horizontal list of links with a solid color background
    + hover state will invert text color and background color
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to white)
        + $background-color: color of link element's background (optional - defaults to $link-color)
        + $align: text-alignment (optional - defaults to center)
        + $active-color: active class background color (optional - defaults to $hover-color)

+ **elr-nav-bar-solid-stacked**

        @include elr-nav-bar-solid-stacked($text-color, $background-color, $align, $active-color);

    + creates a vertical list of links with a solid color background
    + hover state will invert text color and background color
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to white)
        + $background-color: color of link element's background (optional - defaults to $link-color)
        + $align: text-alignment (optional - defaults to center)
        + $active-color: active class background color (optional - defaults to $hover-color)           

+ **elr-nav-bar-pills**

        @include elr-nav-bar-pills($text-color, $hover-color, $align, $border);

    + creates a horizontal list of links with a pill shaped background when a user mouses over link element
    + hover state will invert text color and background color
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to white)
        + $hover-color: color of link element's background (optional - defaults to $link-color)
        + $align: text-alignment (optional - defaults to center)
        + $border: color of border (optional - defaults to none for no border)

+ **elr-nav-bar-pills-stacked**

        @include elr-nav-bar-pills-stacked($text-color, $hover-color, $align, $border);

    + creates a vertical list of links with a pill shaped background when a user mouses over link element
    + hover state will invert text color and background color
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to white)
        + $hover-color: color of link element's background (optional - defaults to $link-color)
        + $align: text-alignment (optional - defaults to center)
        + $border: color of border (optional - defaults to none for no border)

+ **elr-nav-bar-pills-solid**

        @include elr-nav-bar-pills-solid($text-color, $background-color, $align, $border, $active-color);

    + creates a horizontal list of links with a pill shaped background
    + hover state will invert text color and background color
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to white)
        + $background-color: color of link element's background (optional - defaults to $link-color)
        + $align: text-alignment (optional - defaults to center)
        + $border: color of border (optional - defaults to none for no border)
        + $active-color: active class background color (optional - defaults to $hover-color)

+ **elr-nav-bar-pills-solid-stacked**

        @include elr-nav-bar-pills-solid-stacked($text-color, $background-color, $align, $border, $active-color);

    + creates a vertical list of links with a pill shaped background
    + hover state will invert text color and background color
    + **Arguments:**
        + $text-color: color of navigation link text (optional - defaults to white)
        + $background-color: color of link element's background (optional - defaults to $link-color)
        + $align: text-alignment (optional - defaults to center)
        + $border: color of border (optional - defaults to none for no border)
        + $active-color: active class background color (optional - defaults to $hover-color)

+ **elr-dropdown-nav**

        @include elr-dropdown-nav($text-color, $background-color: divider-color)

    + created styles for a horizontal dropdown navigation bar
    + supports nested ul to any depth though we don't recommend nesting beyond 2 levels
    + **Arguments:**
        * $text-color: optional - defaults to white
        * $background-color: color of navigation bar (optional - defaults to $link-color)
        * $divider-color: color of list divers (optional - defaults to light grey)

+ **elr-button-link**

        @include elr-button-link($color, $bk-color, $width, $center, $border-radius, $border-color, $display);

    + creates a button with a 1px border and transparent background
    + has a solid background when a user mouses over button
    + **Arguments:**
        + $color: color of border and text (optional - defaults to white)
        + $bk-color: background color on hover state (optional - defaults to $link-color)
        + $width: width of button (optional - defaults to 40%)
        + $center: alignment of link or button element (optional - defaults to center)
        + $border-radius: optional - defaults to 3px
        + $border-color: optional - defaults to none for no border
        + $display: inline-block for inline buttons (optional - defaults to block)

+ **elr-button-solid**

        @include elr-button-solid($bk-color, $color, $width, $center, $border-radius, $border-color, $display);

    + creates a solid button
    + inverts text and background on hover state
    + **Arguments:**
        + $bk-color: background-color of element (optional - defaults to $link-color)
        + $color: text color of element (optional - defaults to white)
        + $width: width of button (optional - defaults to 40%)
        + $center: alignment of link or button element (optional - defaults to center)
        + $border-radius: optional - defaults to 3px
        + $border-color: color of border (optional - defaults to none for no border)
        + $display: inline-block for inline buttons (optional - defaults to block)

+ **elr-rectangle-button**

        @include elr-rectangular-button($color, $text, $border-radius, $width, $center, $display);

    + creates a solid button with a 3px drop shadow
    + button has a 1px border that is slightly darker than the button
    + **Arguments:**
        + $color: background-color of button (optional - defaults to $link-color)
        + $text: text color (optional - defaults to white)
        + $border-radius: optional - defaults to 0 for no radius
        + $width: width or button (optional - defaults to 40%)
        + $center: optional - defaultst to center for center aligned text
        + $display: inline-block for inline buttons (optional - defaults to block)

+ **elr-pill-button-link**

        @include elr-pill-button-link($height, $color, $bk-color, $width, $center, $border-color, $display);

    + creates a pill shaped button with a 1px border and transparent background
    * has a solid background color on hover state
    + **Arguments:**
        + $height: height of button (optional - defaults to 50px)
        + $color: text-color (optional - defualts to white)
        + $bk-color: background color of button (optional - defaults to $link-color)
        + $width: width of button (optional - defaults to 40%)
        + $center: centers element in container (optional - defaults to center)
        + $border-color: color of border (optional - defaults to none for no border)
        + $display: inline-block for inline buttons (optional - defaults to block)

+ **elr-pill-button-solid**

        @include elr-pill-button-solid($height, $color, $bk-color, $width, $center, $border-color, $display);

    + creates a pill shaped button with a solid background
    + inverts text and background color on hover state
    + **Arguments:**
        + $height: height of button (optional - defaults to 50px)
        + $color: text-color (optional - defualts to white)
        + $bk-color: background color of button (optional - defaults to $link-color)
        + $width: width of button (optional - defaults to 40%)
        + $center: centers element in container (optional - defaults to center)
        + $border-color: color of border (optional - defaults to none for no border)
        + $display: inline-block for inline buttons (optional - defaults to block)

+ **elr-button-group**

        @include elr-button-group($bk-color, $color, $border-radius, $border);

    + styles a button bar
    + **Arguments:**
        * $bk-color: color of button bar (optional - defaults to $link-color)
        * $color: text color (optional - defaults to white)
        * $border-radius: optional - defaults to 0 for 90 degree corners
        * $border: optional - defaults to none for no border

+ **elr-dropdown-button-solid**

        @include elr-dropdown-button-solid($bk-color, $color, $width, $border, $border-radius, $divider-color);

    + styles a solid button with a dropdown menu
    + **Arguments:**
        * $bk-color: optional - defaults to $link-color
        * $color: optional - defaults to white
        * $width: optional - defaults to 40%
        * $border: optional - defaults to none for no border
        * $border-radius: optional - defaults to 0 for 90 degree corners
        * $divider-color: optional - defaults to light grey

+ **elr-dropdown-button-split**

        @include elr-dropdown-button-split($bk-color, $color, $width, $border, $border-radius, $divider-color);

    + styles a split button with a dropdown menu
    + part of this button acts as a traditional button when clicked
    + the other half reveals a dropdown menu when clicked
    + **Arguments:**
        * $bk-color: optional - defaults to $link-color
        * $color: optional - defaults to white
        * $width: optional - defaults to 40%
        * $border: optional - defaults to none for no border
        * $border-radius: optional - defaults to 0 for 90 degree corners
        * $divider-color: optional - defaults to light grey

+ **elr-offscreen-menu**

        @include elr-offscreen-menu($bk-color, $width);

    + styles a menu that can be hidden offscreen
    + offscreen menu is not hidden using css and must be hidden using javascript
    + this allows users with javascript turned off to see the menu
    + **Arguments:**
        * $bk-color: color of the menu (optional - defaults to $link-color)
        * $width: width of the menu (optional - defaults to 15%)

+ **elr-sticky-menu**

        @include elr-sticky-menu($position);

    + styles a 'sticky' menu that remains in a fixed position in the browser window
    + **Arguments:**
        * $position: position of the menu
            - acceptable values
                + top (default)
                + left

+ **elr-back-to-top**

        @include elr-back-to-to($bk-color, $color);

    + styles a small, semi-transparent button that appears in the lower right corner of the browser window
    + **Arguments:**
        * $bk-color: background color of button (optional - defaults to $link-color)
        * $color: text color (optional - defaults to white)

### Effects Utilities

+ **elr-solid-drop-shadow**

        @include elr-solid-drop-shadow($color);

    + Applies a solid 3px drop shadow to an element
    + **Arguments:**
        + $color: color of the drop shadow

+ **elr-background-transparent**

        @include elr-background-transparent($color, $opacity);

    + Creates a slightly transparent background with a hex color fallback for browsers that do not support rgba colors
    + **Arguments:**
        + $color: element background color
        + $opacity: opacity of the element background color (optional - defualts to 0.7)

+ **elr-border-transparent**

        @include elr-border-transparent($color, $thickness, $opacity);

    + Creates a slightly transparent border with a hex color fallback for browsers that do not support rgba colors
    + Accepts a hex color value and pixel value for border-width
    * **Arguments:**
        + $color: hex color for element border
        + $thickness: border width (optional - defualts to 5px)
        + $opacity: opacity of element border (optional - defualts to 0.7)

+ **elr-stitched-box**

        @include elr-stitched-box($color, $stitch-color, $border-radius, $border-color, $opacity);

    + Creates an element with a stitched border effect
    + **Arguments:**
        + $color: background color of element
        + $stitch-color: color of stitches (optional - defaults to white)
        + $border-radius: optional - defaults to 0
        + $border-color: optional - defaults to none
        + $opacity: optional - defaults to 1 for no transparency

+ **elr-stitched-row**

        @include elr-stitched-row($color, $stitched-color, $border-color, $opacity, $shadow);

    + Creates a stitched top and bottom border
    + **Arguments:**
        + $color: background color of element
        + $stitch-color: color of stitches (optional - defaults to white)
        + $border-color: optional - defaults to none
        + $opacity: optional - defaults to 1 for no transparency
        + $shadow: adds a drop shadow (optional - defaults to transparent for no shadow)

+ **elr-figure-transparent-border**

        @include elr-figure-transparent-border($color, $thickness, $hover-color);

    + Styles a div or figure with a transparent border that sits on top of the <img> element
    + Specify a width and height on div or figure and img elements
    + Make sure the containing element has a z-index of 100 and position: relative
    + **Arguments:**
        + $color: color of transparent border
        + $hover-color: color of border when users mouse over element
        + $thickness: thickness of transparent border (optional - defaults to 5px)

+ **elr-triple-shadow**

        @include elr-triple-shadow($color1, $color2);

    + creates a shadow with two thick borders and one thin border using solid box-shadows
    + **Arguments:**
        + $color1: color of outside, thick borders
        + $color2: color of inside, thin border
    
+ **elr-inset-text**

        @include elr-inset-text($shadow-color);

    + creates a slight shadow effect on text
    + **Arguments:**
        + $shadow-color: color of text-shadow (optional - defaults to $shadow-color)

+ **elr-inset-border**

        @include elr-inset-border($color, $shadow-color);

    + creates a bottom border with a slight shadow effect
    + **Arguments:**
        + $color: color of bottom-border
        + $shadow-color: color of text-shadow (optional - defaults to $shadow-color)
    
+ **elr-inset-box**

        @include elr-inset-box($shadow-color);

    + creates a slight box shadow
    + **Arguments:**
        + $shadow-color: color of text-shadow (optional - defaults to $shadow-color) 

+ **elr-boxy-drop-shadow**

        @include elr-boxy-drop-shadow($shadow-color);

    + creates a thick drop shadow
    + takes an optional color argument
    + **Arguments:**
        + $shadow-color: color of text-shadow (optional - defaults to $shadow-color)

+ **elr-thumbnail**

        @include elr-thumbnail($border-color, $width, $height, $border-radius)

    + creates a thumbnail image with a thick border
    + **Arguments:**
        + $border-color: optional - defaults to white
        + $width: optional - defaults to 150px
        + $height: optional - defaults to 125px
        + $border-radius: optional - defaults to 0 for 90 degree corners
            * enter 'round' for a circular image

### Forms

+ **elr-form-state**

        @include elr-form-state($glow, $bk-color, $border)

    + adds form state styles for form controls
    + glow effect when a user mouses over and element
    + darker outline and lighter background on focus state
    + smooth transition effects when changing form states
    + includes success, warning, danger, and disabled states
    + **Arguments:**
        + $glow: color of glow effect (optional - defaults to aqua)
        + $bk-color: color of form element background (optional - defaults to light grey)
        + $border: color of form element border (optional - defaults to grey)   

+ **elr-form**

        @include elr-form($glow, $bk-color, $border);

    + provides basic styles for all form elements
    + **Arguments:**
        * $glow: optional - defaults to $elr-blue
        * $bk-color: background color of form input elements (optional - defaults to light grey)
        * $border: border color for form input elements (optional - defaults to grey)

+ **elr-tabular-form**

        @include elr-tabular-form($glow, $bk-color, $border);

    + styles a tabular form
    + **Arguments:**
        * $glow: optional - defaults to $elr-blue
        * $bk-color: background color of form input elements (optional - defaults to light grey)
        * $border: border color for form input elements (optional - defaults to grey)

+ **elr-inline-form**

        @include elr($glow, $bk-color, $border);

    + styles a form with all elements on the same row
    + **Arguments:**
        * $glow: optional - defaults to $elr-blue
        * $bk-color: background color of form input elements (optional - defaults to light grey)
        * $border: border color for form input elements (optional - defaults to grey)

+ **elr-form-notice**

        @include elr-form-notice($type);

    + styles a form notice
    + **Arguments:**
        * $type
            - accepable values
                + success
                + warning
                + danger
                + info - default
            - if an unlisted value is entered the info type is used


## Helper Methods

### General

+ body
    * sets default styles for line-height, font-size, font-family, color, and background color
    * based on default-config.scss
    * override these base styles by creating a file called _elr-sass-utilities-config.scss and placing it outside the elr-sass-utilities folder

+ .wrapper
    * a wrapper with a margin of auto

### Visibility

+ .hide
    * hides an element using 
            
            display: none

### Clear and Alignment

+ .pull-left
    * floats an item to the left

+ .pull-right
    * floats an item to the right

+ .clear
    * clearfix class

### Typography

+ .bold
    * bold text

+ .italic
    * italicize text

+ .underline
    * underline text

+ .uppercase
    * uppercase text

+ .capitalize
    * capitalize text

+ .smaller-text
    * sets font equal to 10px

+ .text-left
    * align text to the left

+ .text-right
    * align text to the right

+ .text-center
    * center text within it's container

+ .text-justified
    * justified text

+ .text-muted
    * applies the muted color to text

+ .text-disabled
    * applies a light grey color to text

+ .text-danger
    * applies the danger color to text

+ .text-error
    * applies the error color to text and makes text bold

+ .text-info
    * applies the info color to text

+ .text-warning
    * applies the warning color to text

+ .text-success
    * applies the success color to text

+ mark
    * sets text background of $link-color
    * changes color to white
    * applies a small amount of left and right padding

+ .highlight
    * sets text color of $link-color

+ p
    * sets margin to 0
    * applies 10px top and bottom padding

+ small
    * applies a font size of 10px

+ blockquote
    * sets margin to 0
    * applies 10px of padding on all sides
    * sets font style to italics

+ cite
    * removes italics and sets font style to normal

+ pre
    * styles pre text with a border and very light grey background

### Headings

remove default bold from all heading elements

+ h1
    * capitalizes the first letter of all words
    * sets font size of 26px
    * sets a small amount of top and bottom padding

+ h2
    * capitalizes the first letter of all words
    * sets font size of 24px
    * sets a small amount of top and bottom padding

+ h3
    * capitalizes the first letter of all words
    * sets font size of 18px
    * sets a small amount of top and bottom padding

+ h4
    * sets font size of 16px

+ h5
    * sets font size of 14px

+ h6
    * sets font size of 12px

### Lists

+ ul
    * sets style to disc
    * adds padding

+ ol
    * sets style to decimal
    * adds padding

+ li
    * sets margin to 0
    * adds slight top and bottom padding

+ dl
    * removes margin and padding

+ dd
    * remove margin
    * adds slight top and bottom padding

+ dt
    * remove margin
    * adds slight top and bottom padding
    * styles bold

+ .unstyled-list
    * removes list-style

+ .inline-list
    * creates an inline list

+ .triangle-list
    * creates a list with triangle bullets

+ .checked-list
    * creates a checked list

### Links

+ a
    * adds an underline that disappears on hover
    * changes color to $link-color
    * adds visted, hover, and focus states

### Alerts
+ .elr-info-alert
    * creates a context box with a slight colored background and darker colored text based on alert context
+ .elr-danger-alert
    * creates a context box with a slight colored background and darker colored text based on alert context
+ .elr-warning-alert
    * creates a context box with a slight colored background and darker colored text based on alert context
+ .elr-success-alert
    * creates a context box with a slight colored background and darker colored text based on alert context
+ .elr-muted-alert
    * creates a context box with a slight colored background and darker colored text based on alert context
+ .elr-custom-alert
    * creates a context box with a slight colored background and darker colored text based on alert context

### Images

+ .elr-thumbnail
    * styles a thumbnail image with a thick white inner border and thin grey outer border

### Tables

+ table

+ td