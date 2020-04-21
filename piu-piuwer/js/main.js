//  
// import 'bootstrap';

var notLiked = 'img/heart.svg'
var liked = 'img/red-heart.svg'
var likeIcon = notLiked;
var xmlhttp = new XMLHttpRequest();
var url = "https://next.json-generator.com/api/json/get/EkyZfHLU_";

function buildFeed(choice, image, name, user, text, counter) {
    if (choice == 'loggedUser') {
        return "<div class='container' id='container'><br><div class='border-bottom border-secondary'><div class='image-wrapper float-left pr-3'><a href='my-profile.html'><img src ='img/eu.jpg' class = 'imagem-feed rounded' id = 'piu-image'></a></div> <div class='single-post-content-wrapper'><strong class = 'nome-piu' id = 'piu-name'> Ilton Andrew</strong><br><b class = 'user-piu' id = 'piu-user'>@Gegê</b> <br><div class='d-flex flex-row-reverse text-right'><img src ='img/trash.svg' class = 'action-image' id='deleta' alt= 'Deletar Piu'><img src ='img/pen.svg' class = 'action-image' id='altera' alt= 'Alterar Piu'></div><p class = 'text-muted' id = 'piu-text'>" + $('#texto').val() + "</p></div></div></div>"
    }
    else {
        return "<div class='container' id='container'><br><div class='border-bottom border-secondary'><div class='image-wrapper float-left pr-3'><img src =' " + image + "' class = 'imagem-feed rounded' id = 'piu-image'></div> <div class='single-post-content-wrapper'><strong class = 'nome-piu' id = 'piu-name'>" + name + "</strong><br><b class = 'user-piu' id = 'piu-user'>" + user + "</b> <br><br><p class = 'text-muted' id='piu-text'>" + text + "<div class='d-flex flex-row-reverse text-right'><img src ='" + likeIcon + "' class = 'action-image' id='like' alt= 'Curtir Piu'>&nbsp;&nbsp;<b class='text-muted' id='like-counter'>" + counter + "</b></div></p></div> </div></div>"
    }

}

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myArr.forEach(element => {
            $("#feed").prepend(buildFeed(0, element.imagem, element.nome, element.username, element.mensagem, 0))
        });
    }
};
xmlhttp.open("GET", url);
xmlhttp.send();


$('textarea[name="name"]').on('keyup keydown', updateCount);


function updateCount() {

    if ($(this).val().length > 140) {
        $('#characters').text($(this).val().length + ' / 140');
        $('#characters').addClass("text-danger");
        $('#characters').removeClass("text-muted");
        $('#characters').append("<p class = 'text-danger' id='long-text-warning'><b>O piu não pode excerder 140 caracteres, somos raiz!</b></p>");;

    }
    else if ($(this).val().length == 0) {
        $('#characters').text($(this).val().length + ' / 140');
        $('#characters').addClass("text-danger");
        $('#characters').removeClass("text-muted");
        $('#characters').append("<p class = 'text-danger' id='long-text-warning'><b>O piu não pode estar vazio!</b></p>");;

    }
    else {
        $('#characters').text($(this).val().length + ' / 140');
        $('#characters').addClass("text-muted");
        $('#characters').removeClass("text-danger");
        $("#long-text-warning").remove()
    }
}



$('#texto').val()
$('#enviar').on('click',
    function () {
        if ($('#texto').val().length <= 140 && $('#texto').val().length != '') {
            $("#feed").prepend(buildFeed('loggedUser'))
            $('#texto').val("");
        }
    })


$(document).on("click", "#deleta", function () {
    console.log($(this).closest('#container').find('#piu-text').text());
    $(this).closest('#container').remove();
});

$(document).on("click", "#altera", function () {
    var original = $(this).closest('#container').find('#piu-text').text();
    $('#texto').val("");
    $('#texto').val(original);
    $(this).closest('#container').remove();

});


$(document).on("click", "#like", function () {
    let container = $(this).closest('#container');
    let name = container.find('#piu-name').text();
    let user = container.find('#piu-user').text();
    let text = container.find('#piu-text').text();
    let image = container.find('#piu-image').attr('src')
    let counter = parseInt(container.find('#like-counter').text()) + 1;

    likeIcon = liked
    $(this).closest('#container').remove();
    $("#feed").prepend(buildFeed(0, image, name, user, text, counter));
    likeIcon = notLiked

});

function oops() {
    alert('Under construction!')
}