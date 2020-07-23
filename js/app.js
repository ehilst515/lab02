'use strict';
// ajax setup
$(() => {
const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};
$.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
        console.log(data.hornedAnimal);
        const arrayOfAnimals = data.hornedAnimal;
        arrayOfAnimals.forEach(animal => {
            Animal.all.push(new Animal(animal));
        });
    })
    .then(()=>{
        renderAnimals();
        renderFilters();
        handleFilters();
    });  
});

function Animal(obj){
    for(let key in obj){
        this[key] = obj[key];
    }
    this.title = animal.title;
    this.image = animal.image_url;
    this.description = animal.description;
};



// // construct animal objects
// function Animal(animal) {
//     this.title = animal.title;
//     this.image = animal.image_url;
//     this.description = animal.description;
//     this.keyword = animal.keyword;
//     this.horns = animal.horns;
//     this.keyword = animal.keyword;
//     if(Animal.allKeywords.indexOf(this.keyword) < 0){
//         Animal.allKeywords.push(this.keyword);
//     }
// }

// Animal.all = [];
// Animal.allKeywords = [];

// // render to page
// Animal.prototype.render = function (){
//     let $renderedAnimal = $('.animal-template').clone();
//     $renderedAnimal.removeClass('animal-template');
//     $renderedAnimal.find('.animal-title').text(this.title);
//     $renderedAnimal.find('#animal-image').attr('src', this.image);
//     $renderedAnimal.find('#animal-image').attr('alt',this.title);
//     $renderedAnimal.find('#animal-description').text(this.description);
//     $renderedAnimal.attr('data-keyword', this.keyword);
//     return $renderedAnimal
// }

function renderAnimals(){
    Animal.all.forEach(animal => $('#render').append(animal.render()));
    $('.animal-template').remove();
}

function renderFilters(){
    Animal.allKeywords.sort();
    Animal.allKeywords.forEach(keyword =>{
        const $option = $('<option>').text(keyword).attr('value', keyword);
            $('#keyword-filter').append($option);
    });
}

function handleFilters(){
    $('#keyword-filter').on('change', function() {
        if($(this).val() !=='default'){
            $('.animal').hide();
            $(`.animal[data-keyword="${$(this).val()}"]`).fadeIn();
        } else {
            $('.animal').fadeIn();
        }
    });
}
