class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50,
        }

        this.formasDePagamentoValidas = [
            'debito', 'credito', 'dinheiro'
        ]

        this.descontoDinheiro = 0.05;

        this.taxaCredito = 0.03;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamentoValidas.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!'
        }

        const qtdeItens = {}

        let valorTotal = 0;

        let itensPrincipais = [];

        for (const itemInfo of itens) {
            const [codigo, qtd] = itemInfo.split(',')

            if (!this.cardapio.hasOwnProperty(codigo)) {
                return 'Item inválido!';
            }
            if (qtd <= 0) {
                return 'Quantidade inválida!'
            }
            if (codigo === 'chantily' || codigo === 'queijo') {
                itensPrincipais.push(codigo.replace('chantily', 'cafe').replace('queijo', 'sanduiche'))
            }
            if (codigo === 'combo1' || codigo === 'combo2') {
                valorTotal += this.cardapio[codigo];
            } else {
                qtdeItens[codigo] = (qtdeItens[codigo] || 0) + parseInt(qtd);
            }
        }
        for (const codigo in qtdeItens) {
            const quantidade = qtdeItens[codigo]
            valorTotal = valorTotal += this.cardapio[codigo] * quantidade;
        }
        for (const itemPrincipal of itensPrincipais) {
            if (!qtdeItens[itemPrincipal]) {
                return 'Item extra não pode ser pedido sem o principal'
            }
        }
        if (metodoDePagamento == 'dinheiro') {
            valorTotal *= (1 - this.descontoDinheiro)
        } else if (metodoDePagamento == 'credito') {
            valorTotal *= (1 + this.taxaCredito)
        }
        const valorFormatado = valorTotal.toFixed(2).replace('.', ',')

        return `R$ ${valorFormatado}`;
    }
}
export { CaixaDaLanchonete };



