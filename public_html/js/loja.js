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

    // função para carregar os produtos que estão no arquivo produtos.json
    function loadProdutos() {
        $.ajax({
            url: 'produtos.json',
            method: 'GET',
            success: function (data) {
                for (p of data) {
                    $('#produtos').append('<li>' + p.nome + ' - ' + 'R$ ' + p.preco.toFixed(2) + '</li>');
                }
            }
        });
    }

    /* inicialmente, os spans minPreco e maxPreco estão sem valores; assim, 
     * quando o documento for carregado (ready), quero atualizar o minPreco e o 
     * maxPreco com os valores dos seus respectivos sliders; para isso, basta 
     * chamarmos as funções que fizemos para esse fim: */
    atualizaMinPreco();
    atualizaMaxPreco();

    /* além disso, queremos carregar os produtos que estão no servidor para 
     * dentro da lista de produtos que, inicialmente, está vazia; para isso, 
     * chamamos a função adequada: */
    loadProdutos();
});
