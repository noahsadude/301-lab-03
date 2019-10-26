'use strict';


function ImgData (input) {
  for (let i in input){
    this[i] = input[i];
  }
}

ImgData.prototype.buildHTML = function() {
  let template = $('#img-template').html();
  let builder = Handlebars.compile(template);
  $('#images').append(builder(this));
};

ImgData.prototype.build = function(){
  $('main').append(`<div class="template"</div>`)
  let container = $('div[class="template"]');
  let template =`
    <h2>${this.title}</h2>
    <img src=${this.image_url}>
    <p>Description: ${this.description}</p>
    <p>Horns: ${this.horns}</p>`
  container.html(template);
  container.removeClass('template');
}

let read = (url,output,page) => {
  $.get(url, 'json')
    .then(data => {
      data.forEach(item => {
        item.page = page;
        output.push(new ImgData(item));
      });
    })
};

let page1 = [];
let page2 = [];
read('data/page-1.json',page1,1);
console.log(page1);
read('data/page-2.json',page2,2);
  
page1.forEach(element => {
  element.build();
})


//TODO:Initialize render

//TODO:listen for filtering