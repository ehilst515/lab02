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
    });
});

function Animal(obj){
  for(let key in obj){
    this[key] = obj[key];
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
  Animal.all.forEach(animal => $('#animal-placeholder').append(animal.render()));
}
