angular
    .module('altairApp')
    .controller('timelineCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        'user_data',
        function ($rootScope,$scope,$timeout,user_data) {

            $scope.user_data = user_data[0];
            $scope.user_data_contacts = user_data[0].contact;

            $scope.timeline_data = [
                {
                    'icon': '&#xE85D;',
                    'date': moment().startOf('month').add(7, 'days').format("MM-DD-YYYY"),
                    "status": "success",
                    "description": "Created ticket",
                    "link_text": "#3289",
                    "slide_animation": "uk-animation-slide-left",
                    "slide_animation_reversed": "uk-animation-slide-right"
                },
                {
                    'icon': '&#xE5CD;',
                    'date': moment().startOf('month').add(8, 'days').format("MM-DD-YYYY"),
                    "status": "danger",
                    "description": "Deleted post",
                    "link_text": "Reiciendis eligendi ullam earum in labore labore sit.",
                    "slide_animation": "uk-animation-slide-left",
                    "slide_animation_reversed": "uk-animation-slide-right"
                },
                {
                    'icon': '&#xE410;',
                    'date': moment().startOf('month').add(9, 'days').format("MM-DD-YYYY"),
                    "status": "",
                    "description": "Added photo",
                    "image": "assets/img/gallery/Image01.jpg",
                    "slide_animation": "uk-animation-slide-left",
                    "slide_animation_reversed": "uk-animation-slide-right"
                },
                {
                    'icon': '&#xE0B9;',
                    'date': moment().startOf('month').add(11, 'days').format("MM-DD-YYYY"),
                    "status": "primary",
                    "description": "New comment on post",
                    "link_text": "Magnam eos nesciunt.",
                    "post_excerpt": "Quo eos quis aut molestiae dolorem et sed quas iste voluptatibus ea ut voluptas distinctio",
                    "slide_animation": "uk-animation-slide-left",
                    "slide_animation_reversed": "uk-animation-slide-right"
                },
                {
                    'icon': '&#xE7FE;',
                    'date': moment().startOf('month').add(12, 'days').format("MM-DD-YYYY"),
                    "status": "warning",
                    "description": "Added to Friends",
                    "user_avatar": "assets/img/avatars/avatar_02_tn.png",
                    "user_name": "Tia Rutherford",
                    "user_status": "Repudiandae asperiores numquam et molestiae.",
                    "slide_animation": "uk-animation-slide-left",
                    "slide_animation_reversed": "uk-animation-slide-right"
                }
            ]

        }
    ])
;