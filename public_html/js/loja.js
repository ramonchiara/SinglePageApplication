// executa o código quando o documento estiver pronto (ready), ou seja, após seu carregamento completo
$(document).ready(function () {

    // trata o evento input do slider min: quando mudar, deve atualizar o span minPreco
    $('#min').on('input', function () {
        atualizaMinPreco();
    });

    // trata o evento input do slider max: quando mudar, deve atualizar o span maxPreco
    $('#max').on('input', function () {
        atualizaMaxPreco();
    });

    // função para atualizar o span minPreco com o valor do slider min
    function atualizaMinPreco() {
        var min = $('#min').val();
        $('#minPreco').html(min);
    }

    // função para atualizar o span maxPreco com o valor do slider max
    function atualizaMaxPreco() {
        var max = $('#max').val();
        $('#maxPreco').html(max);
    }

    /* inicialmente, os spans minPreco e maxPreco estão sem valores; assim, 
     * quando o documento for carregado, quero atualizar o minPreco e o maxPreco 
     * com os valores dos seus respectivos sliders; para isso, basta chamarmos as funções: */
    atualizaMinPreco();
    atualizaMaxPreco();

});
