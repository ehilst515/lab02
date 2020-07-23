'use strict';
// ajax setup
$(() => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('./data/page-1.json', ajaxSettings)
    .then((data) => {
      const arrayOfAnimals = data.hornedAnimal;
      arrayOfAnimals.forEach(animal => {
        Animal.all.push(new Animal(animal));
      });
    });
  $.ajax('./data/page-2.json',ajaxSettings)
    .then((data) => {
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
    if(Animal.allKeywords.indexOf(this.keyword) < 0){
      Animal.allKeywords.push(this.keyword);
    }
  }
}

Animal.all = [];
Animal.allKeywords = [];

Animal.prototype.render = function(){
  const templateHTML = $('#animal-template').html();
  const renderedHTML = Mustache.render(templateHTML, this);
  return renderedHTML;
};

function renderAnimals(){
  Animal.all.forEach(animal =>{
    $('#animal-placeholder').append(animal.render());
  });
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
