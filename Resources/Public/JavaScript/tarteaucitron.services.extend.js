if (tarteaucitron !== undefined) {
    tarteaucitron.services.youtube_extended = {
        key: 'youtube_extended',
        type: 'video',
        name: 'YouTube',
        uri: 'https://policies.google.com/privacy',
        needConsent: true,
        cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
        js: function () {
            'use strict';
            tarteaucitron.fallback(['youtube_extended_player'], function (x) {
                let frame_title = tarteaucitron.getElemAttr(x, 'title') || 'Youtube iframe',
                    video_id = tarteaucitron.getElemAttr(x, 'videoID'),
                    srcdoc = tarteaucitron.getElemAttr(x, 'srcdoc'),
                    loading = tarteaucitron.getElemAttr(x, 'loading'),
                    video_width = tarteaucitron.getElemAttr(x, 'width'),
                    frame_width = 'width=',
                    video_height = tarteaucitron.getElemAttr(x, 'height'),
                    frame_height = 'height=',
                    video_frame,
                    allowfullscreen = tarteaucitron.getElemAttr(x, 'allowfullscreen'),
                    allow = tarteaucitron.getElemAttr(x, 'allow'),
                    start = tarteaucitron.getElemAttr(x, 'start'),
                    end = tarteaucitron.getElemAttr(x, 'end'),
                    attrs = ['theme', 'rel', 'controls', 'showinfo', 'autoplay', 'mute', 'start', 'end', 'loop', 'enablejsapi'],
                    params = attrs.filter(function (a) {
                        return tarteaucitron.getElemAttr(x, a) !== null;
                    }).map(function (a) {
                        return a + '=' + tarteaucitron.getElemAttr(x, a);
                    }).join('&');

                if (tarteaucitron.getElemAttr(x, 'loop') == 1) {
                    params = params + '&playlist=' + video_id;
                }

                if (video_id === undefined) {
                    return '';
                }

                if (video_width !== undefined) {
                    frame_width += '"' + video_width + '" ';
                } else {
                    frame_width += '"" ';
                }
                if (video_height !== undefined) {
                    frame_height += '"' + video_height + '" ';
                } else {
                    frame_height += '"" ';
                }

                if (srcdoc !== undefined && srcdoc !== null && srcdoc !== "") {
                    srcdoc = 'srcdoc="' + srcdoc + '" ';
                } else {
                    srcdoc = '';
                }

                if (loading !== undefined && loading !== null && loading !== "") {
                    loading = 'loading ';
                } else {
                    loading = '';
                }

                video_frame = '<iframe frameborder="0" title="' + frame_title + '" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '"' + (allow ? ' allow="' + allow + '"' : ' ') + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + ' ' + srcdoc + ' ' + loading + '></iframe>';
                return video_frame;
            });
        },
        'fallback': function () {
            'use strict';
            var id = 'youtube_extended';
            tarteaucitron.fallback(['youtube_extended_player'], function (elem) {
                elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
                elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
                return tarteaucitron.engage(id);
            });
        }
    };

    tarteaucitron.services.vimeo_extended = {
        key: 'vimeo_extended',
        type: 'video',
        name: 'Vimeo',
        uri: 'https://vimeo.com/privacy',
        needConsent: true,
        cookies: ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
        js: function () {
            'use strict';
            tarteaucitron.fallback(['vimeo_extended_player'], function (x) {
                var frame_title = tarteaucitron.getElemAttr(x, 'title') || 'Vimeo iframe',
                    video_width = tarteaucitron.getElemAttr(x, 'width'),
                    frame_width = 'width=',
                    video_height = tarteaucitron.getElemAttr(x, 'height'),
                    frame_height = 'height=',

                    video_id = tarteaucitron.getElemAttr(x, 'videoID'),
                    video_hash = tarteaucitron.getElemAttr(x, 'data-hash') || '',
                    video_allowfullscreen = tarteaucitron.getElemAttr(x, 'data-allowfullscreen'),

                    video_qs = '',
                    attrs = ['title', 'byline', 'portrait', 'loop', 'autoplay', 'autopause', 'background', 'color', 'controls', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'speed', 'transparent'],
                    params = attrs.filter(function (a) {
                        return tarteaucitron.getElemAttr(x, a) !== null;
                    }).map(function (a) {
                        return a + '=' + tarteaucitron.getElemAttr(x, a);
                    }),

                    allow = tarteaucitron.getElemAttr(x, 'allow'),
                    video_frame;

                if (video_id === undefined) {
                    return '';
                }

                // query params
                if (video_hash.length > 0) {
                    params.push('h=' + video_hash);
                }
                if (params.length > 0) {
                    video_qs = '?' + params.join('&');
                }

                // attributes
                if (video_width !== undefined) {
                    frame_width += '"' + video_width + '" ';
                } else {
                    frame_width += '"" ';
                }
                if (video_height !== undefined) {
                    frame_height += '"' + video_height + '" ';
                } else {
                    frame_height += '"" ';
                }

                video_frame = '<iframe title="' + frame_title + '" src="//player.vimeo.com/video/' + video_id + video_qs + '" ' + frame_width + frame_height + (allow ? ' allow="' + allow + '"' : ' ') + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';

                return video_frame;
            });
        },
        'fallback': function () {
            'use strict';
            var id = 'vimeo_extended';
            tarteaucitron.fallback(['vimeo_extended_player'], function (elem) {
                elem.style.width = elem.getAttribute('width') + 'px';
                elem.style.height = elem.getAttribute('height') + 'px';
                return tarteaucitron.engage(id);
            });
        }
    };
}