const $ = require('jquery');
// adds case insensitive contains to jQuery

// $.extend($.expr[':'], {
//     containsNC: function(elem, i, match) {
//         return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
//     }
// });

if (!Number.isNan) {
    Number.isNan = function(num) {
        return num !== num;
    };
}

let elrUtilities = function() {
    let self = {};

    // TODO: add support for sorting datetime values
    self.patterns = {
        numeral: new RegExp('[0-9]+'),
        alphaLower: new RegExp('[a-z]+'),
        alphaUpper: new RegExp('[A-Z]+'),
        specialCharacters: new RegExp('[^a-zA-Z0-9_]'),
        allNumbers: new RegExp('^[0-9]*$'),
        allAlphaLower: new RegExp('^[a-z]*$'),
        allAlphaUpper: new RegExp('^[A-Z]*$'),
        allSpecialCharacters: new RegExp('^[^a-zA-Z0-9_]*$'),
        hour: new RegExp('^(\\d+)'),
        minute: new RegExp(':(\\d+)'),
        ampm: new RegExp('(am|pm|AM|PM)$'),
        // an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
        integer: new RegExp('(^\\-?\\d*$)|(^\\-?\\d*(,\\d{3})*$)'),
        number: new RegExp('^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)$'),
        url: new RegExp('^https?:\\/\\/[\\da-z\\.\\-]+[\\.a-z]{2,6}[\\/\\w/.\\-]*\\/?$','i'),
        email: new RegExp('^[a-z][a-z\\-\\_\\.\\d]*@[a-z\\-\\_\\.\\d]*\\.[a-z]{2,6}$','i'),
        // validates 77494 and 77494-3232
        postalCode: new RegExp('^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$'),
        // validates United States phone number patterns
        phone: new RegExp('^\\(?\\d{3}[\\)\\-\\.]?[\\s]?\\d{3}[\\-\\.]?\\d{4}(?:[xX]\\d+)?$','i'),
        // allows alpha . - and ensures that the user enters both a first and last name
        fullName: new RegExp('^[a-z]+ [a-z\\.\\- ]+$','i'),
        alpha: new RegExp('[a-z]*','i'),
        allAlpha: new RegExp('^[a-z\\-\\s]*$','i'),
        alphaNum: new RegExp('^[a-z\\d ]*$','i'),
        spaces: new RegExp('^[\\S]*$','i'),
        alphaNumDash: new RegExp('^[a-z\\d- ]*$','i'),
        // allows alphanumeric characters and underscores; no spaces; recommended for usernames
        alphaNumUnderscore: new RegExp('^[a-z\\d_]*$','i'),
        tags: new RegExp('<[a-z]+.*>.*<\/[a-z]+>','i'),
        // mm/dd/yyyy
        monthDayYear: new RegExp('^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}$'),
        // 00:00pm
        time: new RegExp('^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\/:[012345][0-9])?(?:am|pm)$', 'i'),
        // matched all major cc
        creditCard: new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$'),
        cvv: new RegExp('^[0-9]{3,4}$'),
        longDate: new RegExp('^(?:[a-z]*[\\.,]?\\s)?[a-z]*\\.?\\s(?:[3][01],?\\s|[012][1-9],?\\s|[1-9],?\\s)[0-9]{4}$', 'i'),
        shortDate: new RegExp('((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})'),
        longTime: new RegExp('((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\\:[012345][0-9])?(?:am|pm)?)', 'i'),
        longMonth: new RegExp('^(?:[a-zA-Z]*[\\.,]?\\s)?[a-zA-Z]*'),
        dateNumber: new RegExp('[\\s\/\\-\\.](?:([3][01]),?[\\s\/\\-\\.]?|([012][1-9]),?[\\s\/\\-\\.]?|([1-9]),?[\\s\/\\-\\.]?)'),
        year: new RegExp('([0-9]{4})'),
        dateKeywords: new RegExp('^(yesterday|today|tomorrow)', 'i'),
        timeKeywords: new RegExp('^(noon|midnight)', 'i'),
        singleSpace: new RegExp('\\s'),

        // sort patterns
        sortNumber: new RegExp('^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)'),
        sortMonthDayYear: new RegExp('^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}'),
        sortTime: new RegExp('^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\/:[012345][0-9])?(?:am|pm|AM|PM)', 'i')
    };

    self.each = function(collection, callback) {
        let i = 0;
        let length = collection.length;
        let isArray = self.isArrayLike(collection);

        if (isArray) {
            for (; i < length; i++) {
                if (callback.call(collection[ i ], i, collection[ i ]) === false) {
                    break;
                }
            }
        } else {
            for (i in collection) {
                if (callback.call(collection[ i ], i, collection[ i ]) === false) {
                    break;
                }
            }
        }

        return collection;
    };

    self.trim = function(str) {
        if (str) {
            return (str === null) ? '' : str.replace(/^\s+|\s+$/g,'');
        }

        return 'you need to provide a string to trim';
    };

    // filters an array using a callback function
    // self.exclude = function(arr, fn) {
    //     let list = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         if (fn(arr[i])) {
    //             list.push(arr[i]);
    //         }
    //     }

    //     return list;
    // };

    self.isOdd = function(val) {
        return val % 2 === 1;
    };

    self.isEven = function(val) {
        return val % 2 === 0;
    };

    self.dataTypeChecks = {
        isDate: function(val) {
            return (self.patterns.sortMonthDayYear.test(val)) ? true : false;
        },
        isNumber: function(val) {
            return (self.patterns.sortNumber.test(val)) ? true : false;
        },
        isAlpha: function(val) {
            return (self.patterns.alpha.test(val)) ? true : false;
        },
        isTime: function(val) {
            return (self.patterns.sortTime.test(val)) ? true : false;
        }
    };

    self.getDataTypes = function(values, type) {
        let that = this;
        let types = [];
        type = type || null;

        if (type) {
            types.push(type);
        } else {
            self.each(values, function(k,v) {
                if (v === '') {
                    return;
                }

                if (self.dataTypeChecks.isDate.call(that, v)) {
                    return types.push('date');
                } else if (self.dataTypeChecks.isTime.call(that, v)) {
                    return types.push('time');
                } else if (self.dataTypeChecks.isNumber.call(that, v)) {
                    return types.push('number');
                } else if (self.dataTypeChecks.isAlpha.call(that, v)) {
                    return types.push('alpha');
                } else {
                    return;
                }
            });
        }
        return self.unique(types);
    };

    self.generateRandomString = function(length, charset) {
        let str = '';
        length = length || 10;
        charset = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = 0, n = charset.length; i < length; i++) {
            str += charset.charAt(Math.floor(Math.random() * n));
        }

        return str;
    };

    self.checkBlacklist = function(str, blacklist) {
        if (str) {
            return self.inArray(blacklist, str.toLowerCase());
        }

        return;
    };

    self.checkLength = function(str, reqLength) {
        if (str) {
            return (str.length < reqLength) ? true : false;
        }

        return;
    };

    self.getText = function(elems, separator = ' ') {
        let text = [];

        self.each(elems, function() {
            let val = this.innerText || this.textContent;
            text.push(self.trim(val));
        });

        return text.join(separator);
    };

    self.getTextArray = function(elems) {
        let arr = [];

        self.each(elems, function() {
            let val = this.innerText || this.textContent;
            arr.push(val);
        });

        return arr;
    };

    self.getValue = function(field) {
        let value = self.trim(field.value);

        if (value.length > 0) {
            return value;
        } else {
            return null;
        }
    };

    self.getColumnList = function(columnNum, $listItems) {
        let $list = [];

        self.each($listItems, function(k, v) {
            $list.push($(v).find('td').eq(columnNum));

            return $list;
        });

        return $list;
    };

    self.getListValues = function($list) {
        let values = [];

        self.each($list, function(k,v) {
            values.push(self.trim($(v).text()).toLowerCase());

            return values;
        });

        return values;
    };

    // removes leading 'the' or 'a' from a string
    self.cleanAlpha = function(str, ignoreWords) {
        ignoreWords = ignoreWords || ['the', 'a'];

        self.each(ignoreWords, function() {
            let re = new RegExp('^' + this + '\\s', 'i');
            str = str.replace(re, '');

            return str;
        });

        return str;
    };

    self.capitalize = function(str) {
        return str.toLowerCase().replace(/^.|\s\S/g, function(a) {
            return a.toUpperCase();
        });
    };

    // debounce
    self.throttle = function(fn, threshold, scope) {
        let last;
        let deferTimer;

        threshold = threshold || 500;

        return function() {
            let context = scope || this;
            let now = +new Date(),
                args = arguments;

            if (last && now < last + threshold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    };

    self.clearElement = function($el, speed) {
        speed = speed || 300;

        $el.fadeOut(speed, function() {
            $(this).remove();
        });
    };

    self.clearForm = function($fields) {
        $fields.each(function() {
            let $that = $(this);
            if ($that.attr('type') === 'checkbox') {
                $that.prop('checked', false);
            } else {
                $that.val('');
            }
        });
    };

    self.cleanString = function(str, re) {
        let reg = new RegExp(re, 'i');
        return self.trim(str.replace(reg, ''));
    };

    self.getFormData = function($form) {
        // get form data and return an object
        // need to remove dashes from ids
        let formInput = {};
        let $fields = $form.find(':input').not('button').not(':checkbox');
        let $checkboxes = $form.find('input:checked');

        if ($checkboxes.length !== 0) {
            let boxIds = [];

            $checkboxes.each(function() {
                boxIds.push($(this).attr('id'));
            });

            boxIds = self.unique(boxIds);

            self.each(boxIds, function() {
                let checkboxValues = [];
                let $boxes = form.find(`input:checked#${this}`);

                $boxes.each(function() {
                    checkboxValues.push(self.trim($(this).val()));
                });

                formInput[this] = checkboxValues;
                return;
            });
        }

        self.each(fields, function() {
            let $that = $(this);
            let id = $that.attr('id');
            let formInput = [];
            let input;

            if (self.trim($that.val()) === '') {
                input = null;
            } else {
                input = self.trim($that.val());
            }

            if (input) {
                formInput[id] = input;
            }

            return;
        });

        return formInput;
    };

    // wrapper for creating jquery objects
    self.createElement = function(tagName, attrs = {}) {
        return $(`<${tagName}></${tagName}>`, attrs);
    };

    self.toTop = function($content, speed) {
        $content.stop().animate({
            'scrollTop': $content.position().top
        }, speed, 'swing');
    };

    self.killEvent = function($el, eventType, selector = null) {
        if (selector === null) {
            $el.on(eventType, function(e) {
                e.stopPropagation();
            });
        } else {
            $el.on(eventType, selector, function(e) {
                e.stopPropagation();
            });
        }
    };

    // self.scrollEvent = function($el, offset, callback) {
    //     if ($(document).scrollTop() > $(window).height()) {
    //         callback();
    //     }
    // };

    self.scrollToView = function($el, speed) {
        let showElement = function() {
            let scroll = $(document).scrollTop();
            let height = $(window).height();
            speed = speed || 300;

            if (scroll > height) {
                $el.fadeIn(speed);
            } else if (scroll < height) {
                $el.fadeOut(speed);
            }
        };

        $(window).on('scroll', self.throttle(showElement, 100));
    };

    self.strToArray = function(str) {
        let arr = [];
        str = str.split(',');

        self.each(str, function() {
            arr.push(self.trim(this));
        });

        return arr;
    };

    // self.isArray = function(arr) {
    //     return Array.isArray(arr);
    // };

    self.isArrayLike = function(obj) {
        return obj && typeof obj === 'object' && (obj.length === 0 || typeof obj.length === 'number' && obj.length > 0 && obj.length - 1 in obj);
    };

    self.unique = function(arr) {
        let that = this;
        return arr.filter(function(v, i, that) {
            return that.indexOf(v) === i;
        });
    };

    self.inArray = function(arr, item, i) {
        return (arr == null) ? -1 : arr.indexOf(item, i);
    };

    // create an array of unique items from a list
    self.toArray = function(items, unique) {
        let arr = [];
        unique = unique || false;

        // console.log(items);

        self.each(items, function() {
            arr.push(this.textContent);

            if (unique) {
                return self.unique(arr);
            } else {
                return arr;
            }
        });

        return arr;
    };

    // create object keys with arrays for each value in an array
    self.createArrays = function(obj, list) {
        self.each(list, function() {
            obj[this] = [];
        });

        return obj;
    };

    // combine an object made up of arrays into a single array
    self.concatArrays = function(obj) {
        let arr = [];

        self.each(obj, function() {
            arr = arr.concat(this);
        });
        return arr;
    };

    // test for alpha values and perform alpha sort
    self.sortValues = function(a, b, dir) {
        dir = dir || 'ascending';

        if (self.patterns.alpha.test(a)) {
            if (a < b) {
                return (dir === 'ascending') ? -1 : 1;
            } else if (a > b) {
                return (dir === 'ascending') ? 1 : -1;
            } else if (a === b) {
                return 0;
            }
        } else {
            return (dir === 'ascending') ? a - b : b - a;
        }
    };

    self.sortComplexList = function(types, listItems, direction) {
        let that = this;
        let sortLists = {};

        direction = direction || 'ascending';

        // create sortList arrays
        self.createArrays(sortLists, types);

        // add list items to sortLists arrays

        self.each(types, function() {
            let type = this;

            self.each(listItems, function() {
                let listItem = this;
                let value = self.trim($(listItem).text());

                if (self.dataTypeChecks[`is${self.capitalize(type)}`].call(that, value)) {
                    sortLists[type].push(listItem);
                } else {
                    return;
                }
            });

            self.each(sortLists[type], function() {
                let value = ($(this).text());

                $(listItems).each(function(k) {
                    let listVal = $(this).text();

                    if (listVal === value) {
                        listItems.splice(k, 1);
                    }
                });
            });
        });

        // sort sortLists arrays
        self.each(sortLists, function(key) {
            self.comparators[`sort${self.capitalize(key)}`](sortLists[key], direction);
        });

        // self.each(types, function() {
        //     let type = this;
        //     self.each(sortLists[type], function(k, v) {
        //         console.log($(v).text() + ':' + type);
        //     });
        // });

        return self.concatArrays(sortLists);
    };

    self.comparators = {
        sortDate: function($items, direction) {
            let sort = function(a, b) {
                if (self.dataTypeChecks.isDate(self.trim($(a).text())) && self.dataTypeChecks.isDate(self.trim($(b).text()))) {
                    a = new Date(self.patterns.sortMonthDayYear.exec(self.trim($(a).text())));
                    b = new Date(self.patterns.sortMonthDayYear.exec(self.trim($(b).text())));
                }

                return self.sortValues(a, b, direction);
            };

            return $items.sort(sort);
        },

        sortTime: function($items, direction) {
            let sort = function(a, b) {
                let time1 = self.patterns.sortTime.exec(self.trim($(a).text()))[0];
                let time2 = self.patterns.sortTime.exec(self.trim($(b).text()))[0];

                if (self.dataTypeChecks.isTime(self.trim($(a).text())) && self.dataTypeChecks.isTime(self.trim($(b).text()))) {
                    a = new Date(`04-22-2014${self.parseTime(time1)}`);
                    b = new Date(`04-22-2014${self.parseTime(time2)}`);
                }

                return self.sortValues(a, b, direction);
            };

            return $items.sort(sort);
        },

        sortAlpha: function($items, direction) {
            let sort = function(a, b) {
                a = self.cleanAlpha(self.trim($(a).text()), ['the', 'a']).toLowerCase();
                b = self.cleanAlpha(self.trim($(b).text()), ['the', 'a']).toLowerCase();

                return self.sortValues(a, b, direction);
            };

            return $items.sort(sort);
        },

        sortNumber: function($items, direction) {
            let sort = function(a, b) {
                a = parseFloat(self.trim($(a).text()));
                b = parseFloat(self.trim($(b).text()));

                return self.sortValues(a, b, direction);
            };

            return $items.sort(sort);
        },

        sortColumnDate: function($listItems, dir, columnNum) {
            let sort = function(a,b) {
                a = self.trim($(a).find('td').eq(columnNum).text());
                b = self.trim($(b).find('td').eq(columnNum).text());

                if (self.dataTypeChecks.isDate(a) && self.dataTypeChecks.isDate(b)) {
                    a = new Date(self.patterns.monthDayYear.exec(a));
                    b = new Date(self.patterns.monthDayYear.exec(b));
                } else {
                    return;
                }

                return self.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },

        sortColumnTime: function($listItems, dir, columnNum) {
            let sort = function(a,b) {
                a = self.trim($(a).find('td').eq(columnNum).text());
                b = self.trim($(b).find('td').eq(columnNum).text());

                if (self.dataTypeChecks.isTime(a) && self.dataTypeChecks.isTime(b)) {
                    a = new Date(`04-22-2014${self.parseTime(self.patterns.monthDayYear.exec(a))}`);
                    b = new Date(`04-22-2014${self.parseTime(self.patterns.monthDayYear.exec(b))}`);
                } else {
                    return;
                }

                return self.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },

        sortColumnAlpha: function($listItems, dir, columnNum) {
            let ignoreWords = ['a', 'the'];
            let sort = function(a,b) {
                a = self.cleanAlpha(self.trim($(a).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();
                b = self.cleanAlpha(self.trim($(b).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();

                return self.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },

        sortColumnNumber: function($listItems, dir, columnNum) {
            let sort = function(a,b) {
                a = parseFloat(self.trim($(a).find('td').eq(columnNum).text()));
                b = parseFloat(self.trim($(b).find('td').eq(columnNum).text()));

                return self.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        }
    };

    self.scrollSpy = function($nav, $content, el, activeClass) {
        let scroll = $(document).scrollTop();
        let $links = $nav.find('a[href^="#"]');
        let positions = self.findPositions($content, el);

        self.each(positions, function(index, value) {
            if (scroll === 0) {
                $(`a.${activeClass}`).removeClass(activeClass);
                $links.eq(0).addClass(activeClass);
            } else if (value < scroll) {
                // if value is less than scroll add activeClass to link with the same index
                $(`a.${activeClass}`).removeClass(activeClass);
                $links.eq(index).addClass(activeClass);
            }
        });
    };

    self.getPosition = function(height, $obj) {
        if (height > 200) {
            return $obj.position().top - ($obj.height() / 4);
        } else {
            return $obj.position().top - ($obj.height() / 2);
        }
    };

    self.findPositions = function($content, el) {
        let $sections = $content.find(el);
        let positions = [];

        // populate positions array with the position of the top of each section element
        $sections.each(function(index) {
            let $that = $(this);
            let length = $sections.length;
            let position;

            // the first element's position should always be 0
            if (index === 0) {
                position = 0;
            } else if (index === (length - 1)) {
                // subtract the bottom container's full height so final scroll value is equivalent
                // to last container's position
                position = self.getPosition($that.height, $that);
            } else {
                // for all other elements correct position by only subtracting half of its height
                // from its top position
                position = $that.position().top - ($that.height() / 4);
            }

            // correct for any elements _that may have a negative position value

            if (position < 0) {
                positions.push(0);
            } else {
                positions.push(position);
            }
        });

        return positions;
    };

    // converts a time string to 24hr time
    self.parseTime = function(time) {
        let hour = parseInt(self.patterns.hour.exec(time)[1], 10);
        let minutes = self.patterns.minute.exec(time)[1];
        let ampm = self.patterns.ampm.exec(time)[1].toLowerCase();

        if (ampm === 'am') {
            hour = hour.toString();

            if (hour === '12') {
                hour = '0';
            } else if (hour.length === 1) {
                hour = '0' + hour;
            }

            return hour + ':' + minutes;

        } else if (ampm === 'pm') {
            return (hour + 12) + ':' + minutes;
        }
    };

    self.openInTab = function($links) {
        $links.on('click', function(e) {
            e.preventDefault();
            let newHref = $(this).attr('href');
            window.open(newHref, '_blank');
        });
    };

    self.isMobile = function(mobileWidth = 568) {
        let windowWidth = $(window).width();

        return (windowWidth <= mobileWidth) ? true : false;
    };

    self.randomClass = function(classList, $el) {
        elr.each(classList, function(index, value) {
            $el.removeClass(value);
        });

        $el.addClass(classList[Math.floor(Math.random() * classList.length)]);
    };

    self.gotoSection = function() {
        let $that = $(this);
        let target = $that.attr('href');
        let $content = $('body, html');

        let section = target.split('#').pop();

        let $target = $(`#${section}`);

        $content.stop().animate({
            'scrollTop': $target.position().top
        });

        return false;
    };

    self.closest = function(el, selector) {
        el = el[0];
        const matchesSelector = el.matches || el.msMatchesSelector;
        const els = [];

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }

            el = el.parentElement;
        }

        els.push(el);

        return els;
    };

    // get element in the collection with the provided index
    self.eq = function(collection, index) {
        const els = [];

        const parent = (self.parent(collection).length > 1) ? self.parent(collection)[0] : self.parent(collection);

        console.log(parent);

        const checkLength = function(collection) {
            // make sure an element with the index exists in the collection
            if (collection.length < index + 1) {
                console.log('There is no element with that index');

                return false;
            }

            return true;
        };

        const children = checkLength(collection) ? parent[0].children : null;

        els.push(children[index]);

        return els;
    };

    // get the index of the provided element
    self.index = function(el) {
        const parent = self.parent(el);

        return Array.prototype.indexOf.call(parent[0].children, el[0]);;
    };

    self.matches = function(el, selector) {
        const matchesSelector = el.matches || el.msMatchesSelector;

        if (matchesSelector.call(el, selector)) {
            return el;
        } else {
            return null;
        }
    };

    // get elements not matching the given criteria
    self.not = function(collection, filter) {
        const filtered = [];

        for (var i = 0; i < collection.length; i++) {
            if (!self.matches(collection[i], filter)) {
                filtered.push(collection[i]);
            }
        }

        return filtered;
    };

    self.even = function(collection) {
        const filtered = [];

        for (var i = 0; i < collection.length; i++) {
            if (((self.index([collection[i]]) + 1) % 2) === 0) {
                filtered.push(collection[i]);
            }
        }

        return filtered;
    };

    self.odd = function(collection) {
        const filtered = [];

        for (var i = 0; i < collection.length; i++) {
            if (((self.index([collection[i]]) + 1) % 2) !== 0) {
                filtered.push(collection[i]);
            }
        }

        return filtered;
    };

    // get the data value from the given element
    self.data = function(el, dataName) {
        const data = el[0].dataset[dataName];

        if (typeof data !== 'undefined') {
            return data;
        }

        console.log('there is no data attribute with this name');

        return;
    };

    // get the first element in the collection
    self.first = function(collection) {
        return collection[0];
    };

    // get the last element in the collection
    self.last = function(collection) {
        if (collection.length > 1) {
            return collection[collection.length - 1];
        }

        return collection[0];
    };

    // returns parent of the first element if a collection is provided
    self.parent = function(el, selector = null) {
        // get the parent elements for each element in the collection
        // if they are the same parent only return a single item
        const parents = [];

        for (var i = 0; i < el.length; i++) {
            if (selector) {
                parents.push(self.matches(el[i].parentNode, selector));
            } else {
                parents.push(el[i].parentNode);
            }
        }

        return self.unique(parents);
    };

    // return all of the element's parents through the entire dom tree
    self.parents = function(el, selector = null) {
        el = el[0];
        const parents = [];

        while (el) {
            if (el.tagName && typeof el.tagName !== 'undefined' && el.tagName !== 'HTML') {
                parents.push(el.parentNode);
            }

            el = el.parentNode;
        }

        return parents;
    };

    // children
    self.children = function(el, selector = null) {
        return children;
    };

    self.prev = function(el, selector = null) {
        return prevElement;
    };

    self.next = function(el, selector = null) {
        return nextElement;
    };

    // find
    self.find = function(selector, collection = null) {
        return collection;
    };

    // hasClass
    self.hasClass = function(el, className) {
        return false;
    };

    // addClass
    self.addClass = function(el, className) {
        return;
    };

    // removeClass
    self.removeClass = function(el, className) {
        return;
    };

    // toggleClass
    self.toggleClass = function(el, className) {
        return;
    };

    // clone
    self.clone = function(el) {
        return clone;
    };

    // css
    self.css = function(el, css = {}) {
        return;
    };

    // appendTo
    self.appendTo = function(el, target) {
        return;
    };

    // prependTo
    self.prependTo = function(el, target) {
        return;
    };

    return self;
};

export default elrUtilities;