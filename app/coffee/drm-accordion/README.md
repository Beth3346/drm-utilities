# DRM Accordion

A jQuery component for creating accordions

## Accordion Content

### Features:

#### Hide and show content with the click of a mouse

#### Includes hide all and show all buttons

+ These are added dynamically with JavaScript

#### Set initial state of content to either expanded or collapsed

+ defaults to collapsed so this data-state isn't really needed

        <div class=".drm-accordion-inner" data-state="collapsed">
        <div class=".drm-accordion-inner" data-state="expanded">

#### Optional config options for speed, container, and buttons

        new DrmAccordionContent(speed, container, showButtons);

### Example Usage:

#### Sample html

        <div class="drm-accordion">
            <div class="drm-accordion-label">Item One</div>
            <div class="drm-accordion-inner" data-state="expanded">
                Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Nostrum, dolorum esse tenetureius 
                consectetur modi ad et quod ab eaque! Cupiditate, voluptates, 
                sunt, modi, repellendus nemo saepe illum delectus aut ex corporis 
                at deserunt id repellat quaerat ratione sed ipsam provident quod 
                magnam quidem molestiae a aliquam in debitis ullam excepturi dicta 
                inventore laudantium officiis? Saepe, perspiciatis, illum neque 
                distinctio natus aperiam ratione optio ullam magnam illo amet 
                expedita!
            </div>
            <div class="drm-accordion-label">Item Two</div>
            <div class="drm-accordion-inner">Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit. Nostrum, dolorum esse tenetureius 
                consectetur modi ad et quod ab eaque! Cupiditate, voluptates, 
                sunt, modi, repellendus nemo saepe illum delectus aut ex corporis 
                at deserunt id repellat quaerat ratione sed ipsam provident quod 
                magnam quidem molestiae a aliquam in debitis ullam excepturi dicta 
                inventore laudantium officiis? Saepe, perspiciatis, illum neque 
                distinctio natus aperiam ratione optio ullam magnam illo amet 
                expedita!
            </div>
        </div>


## Accordion Navigation

### Features:

#### Show or hide navigation options on click with the click of a mouse

#### Set initial state of content to either expanded or collapsed

+ defaults to collapsed so this data-state isn't really needed

        <div class=".drm-accordion-nav-inner" data-state="collapsed">
        <div class=".drm-accordion-nav-inner" data-state="expanded">

#### Optional config options for speed, container, and buttons

        new DrmAccordionNav(speed, container);

### Example Usage:

#### Sample html

        <nav class="drm-accordion-nav">
            <ul>
                <li class="drm-accordion-nav-label"><a href="#">Bears</a>
                    <ul class="drm-accordion-nav-inner" data-state="expanded">
                        <li><a href="#">Grizzly</a></li>
                        <li><a href="#">Polar</a></li>
                        <li><a href="#">Giant Panda</a></li>
                        <li><a href="#">Black Bear</a></li>
                        <li><a href="#">Brown Bear</a></li>
                    </ul>
                </li>
                <li class="drm-accordion-nav-label"><a href="#">Dogs</a>
                    <ul class="drm-accordion-nav-inner">
                        <li><a href="#">Doberman</a></li>
                        <li><a href="#">Shetland Sheepdog</a></li>
                        <li><a href="#">Siberian Husky</a></li>
                        <li><a href="#">Poodle</a></li>
                        <li><a href="#">Scottish Terrier</a></li>
                    </ul>
                </li>
            </ul>
        </div>

###License

DRM-Accordion is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)