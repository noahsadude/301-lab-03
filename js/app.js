'use strict';


function ImgData (input) {
  for (let i in input){
    this[i] = input[i];
  }
}

ImgData.prototype.buildHTML = function() {
  let builder = Handlebars.compile($('#img-template').html());
  $('#images').append(builder(this));
};

ImgData.read = (url) => {
  ImgData.all=[];
  $.get(`data/page-${url}.json`, 'json')
    .then(data => {
      data.forEach(element => {
        ImgData.all.push(new ImgData(element));
      });

      ImgData.buildKwdFilter();
      ImgData.sortArrByProperty(ImgData.all,'title');
      $('main').empty();
      ImgData.all.forEach(element => {
        element.buildHTML();
      });
    //end of then
    });
}

ImgData.sortArrByProperty = (array,property) => {
  array.sort((a,b) => {
    if(a[property] > b[property]){
      return 1;
    } else if(a[property] < b[property]) {
      return -1;
    } else {
      return 0;
    }
  });
}

ImgData.buildKwdFilter = () => {
  let kwdFilter = [];
  $('select').not(':first').remove();

  ImgData.all.forEach(element => {
    if(!kwdFilter.includes(element.keyword)){
      kwdFilter.push(element.keyword);
    }
  });
  kwdFilter.forEach(element => {
    let option = `<option value="${element}">${element}</option>`;
    $('select').append(option);
  });
}

ImgData.filterImg = () =>{
  $('select').on('change', function(){
    let selection = $(this).val();
    console.log(selection);
    if(selection !== 'default') {
      $('div').hide();
      $(`div.${selection}`).fadeIn();
    }
  });
}

ImgData.onSort = () => {
  $('input').on('change', function() {
    $('select').val('default');
    $('div').remove();
    ImgData.sortArrByProperty(ImgData.all, $(this).attr('id'));
    ImgData.all.forEach(element => {
      $('#images').append(element.buildHTML());
    });
  });
};

ImgData.pushNav = () => {
  $('ol').on('click', 'li', function(){
    $('#images').empty();
    ImgData.read($(this).attr('id'));
  });
}

$(() => {
  ImgData.read(1);
  ImgData.filterImg();
  ImgData.pushNav();
  ImgData.onSort();
});
//TODO:Initialize render

//TODO:listen for filtering