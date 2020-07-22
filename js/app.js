'use strict';
$(() => {
const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};
$.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
        console.log(data.results);
    });
});