## DRM Accordion

A jQuery component for creating accordion content

### Features:

+ includes hide all and show all buttons
    * These are added dynamically with JavaScript
+ set initial state to either expanded or collapsed

        <div class=".drm-accordion" data-state="collapsed">
        <div class=".drm-accordion" data-state="expanded">

+ Optional config options for speed and state if you choose not to use the data attribute

        drmAccordion.init({speed: 300, state: 'expanded'})

### Example Usage:

        <div class=".drm-accordion" data-state="collapsed">
            <div class="drm-accordion-label">Item One</div>
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

###License

DRM-Accordion is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)