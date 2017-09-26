/**
 * @author David Watkins
 * @author Gina Roussos
 */
(function () {
    'use strict';

    function Style(font, fontSize, wordWrapWidth, align) {
        this.font = font;
        this.fontSize = fontSize;
        this.fill = '#ffffff';

        if (wordWrapWidth) {
            this.wordWrap = true;
            this.wordWrapWidth = wordWrapWidth;
        }

        if(align) {
            this.align = align;
        } else {
            this.align = 'center';
        }
    }

    window.Style = Style;
}());