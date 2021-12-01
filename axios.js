const axios = require('axios');
const fs = require('fs');

let arrayteste = [];

// Algoritmo QuickSort - GRONER, Loiane. Estruturas de dados e algoritmos com JavaScript. 2ª Edição. São Paulo: Novatec, 2021, p.343-348.
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

const defaultCompare = (a, b) => {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

const swap = (array, a, b) => {
    return [array[a], array[b]] = [array[b], array[a]];

}

const partition = (array, left, right, compareFn) => {
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++
        }
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        if(i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

const quick = (array, left, right, compareFn) => {
    let index;
    if(array.length > 1) {
        index = partition(array, left, right, compareFn);
        if(left < index -1) {
            quick(array, left, index - 1, compareFn);
        }
        if(index < right) {
            quick(array, index, right, compareFn);
        }
    }
    return array;
}

const quickSort = (array, compareFn = defaultCompare) => {
    let arraySize = array.length;
    const rightResult = arraySize - 1;
    return quick(array, 0, rightResult, compareFn);
}

// Fim do algoritmo QuickSort.


const asyncFunc = async (count) => {
    await axios.get(`http://challenge.dienekes.com.br/api/numbers?page=${count}`)
    .then(response => {
        
        if(response.data.numbers.length != 0) {
            arrayteste.push(...response.data.numbers);
            quickSort(arrayteste);
            console.log("array", arrayteste);
            fs.writeFile(`./finalFile.json`, JSON.stringify(arrayteste), (err) => {
                if(err) {
                    return console.log(err);
                }
            })
        }
        
    }) 
}

for (let i = 1; i <= 10000; i++) {
    asyncFunc(i);
}






