
    
setTimeout(function(){
    $('fieldset select').select2()
    $('#changelist-filter select').select2()
    // $("#id_user").select2()
    
    
    $('.dynamic-parcelinbag_set .field-customer_parcel select').select2();
        $('#parcelinbag_set-group .add-row td').click(function(){
            $('.dynamic-parcelinbag_set .field-customer_parcel select').select2();
            
    })



},1000)


var script= document.createElement('script');
script.type='text/javascript';
script.src="https://cdn.tiny.cloud/1/wbjjx25h2x7u6ajwsnknzp0w0i8edo123lj8acvxkokvc5z8/tinymce/6/tinymce.min.js";
document.head.appendChild(script);

script.onload=function(){
tinymce.init({
    selector: "#id_About_Template",
    height:656,
    element_format : 'html',
    plugins: [
      'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
      'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
      'media', 'table', 'emoticons', 'template', 'help'
    ],
    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
    menu: {
      favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
    },
    menubar: 'favs file edit view insert format tools table help',
      content_css: 'css/content.css'
    });

   

  tinymce.init({
      selector: "#id_Agreement_Template",
      height:656,
      element_format : 'html',
      plugins: [
        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
        'media', 'table', 'emoticons', 'template', 'help'
      ],
      toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
      menu: {
        favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
      },
      menubar: 'favs file edit view insert format tools table help',
        content_css: 'css/content.css'
    });
  

tinymce.init({
  selector: "#id_article",
  height:656,
  element_format : 'html',
  plugins: [
      'advlist autolink link image lists charmap print preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'table emoticons template paste help'
    ],
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image | print preview media fullpage | ' +
      'forecolor backcolor emoticons | help',
    menu: {
      favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
    },
    menubar: 'favs file edit view insert format tools table help',
    content_css: 'css/content.css'
  });


}


