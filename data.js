const salaryRanges = [
    { from : 0.01, to: 100_000, base : 0, percent: 0, excess: 0  }
    ,{ from : 100_000.01, to: 200_000, base : 0, percent: 0.15, excess: 100_000  }
    ,{ from : 200_000.01, to: 350_000, base : 15_000, percent: 0.2, excess: 200_000  }
    ,{ from : 350_000.01, to: 500_000, base : 45_000, percent: 0.25, excess: 350_000  }
    ,{ from : 500_000.01, to: undefined, base : 82_500, percent: 0.3, excess: 500_000  }
]

let inssTax = 6.25;

const divisor = 12;

const getInssTax = () => inssTax;

const setInssTax = newTax => (inssTax = newTax, inssTax);


const numeral = value => {

    const arr = String(value).split('.')[0];
    const decimals = String(value).split('.')[1]
    const newArr = [...arr];

    let newValue = '';
    newArr.reverse().forEach((x, i) => {
        if ((i+1) % 3 == 0 && (i+1) != newArr.length)
            newValue += `${x},`;
        else
            newValue += x;
    });
    
    return [...newValue].reverse().join('') + '.' + decimals;

}

export { salaryRanges, divisor, getInssTax, setInssTax, numeral }