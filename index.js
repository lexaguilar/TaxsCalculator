import { salaryRanges, getInssTax, setInssTax, divisor } from "./data.js";

//Evento click del boton calcular
document.querySelector("#btn-calculateTax")
    .addEventListener('click', e => {

        const salaryElemt = document.querySelector("#salarioMensual");

        if(salaryElemt.value)
        {
            const result = calculteTaxs(salaryElemt.value);           

            let draw = drawInformation('.table-anual tbody');
            draw(result);

            draw = drawInformation('.table-mensual tbody');
            draw(getMonthly(result));

        }
    }
);

const getMonthly = ({ salary, inss, ir, neto }) => objectSalary(toMonth(salary), toMonth(inss), toMonth(ir), toMonth(neto));

const toMonth = value => value/divisor;

const objectSalary = (salary, inss, ir, neto) => ({ salary, inss, ir, neto });

const calculteTaxs = salary => {

    if(salary <= 0)
        return { salary: 0, inss: 0, ir: 0, neto: 0 }

    const baseSalaryAnualy = salary * divisor;
    const inssTax = getInssTax();
    console.log(inssTax);

    const inss = (baseSalaryAnualy * inssTax / 100);

    const baseSalaryBrutoAnualy = baseSalaryAnualy - inss;

    const salaryRange = salaryRanges.find(x => x.from <= baseSalaryBrutoAnualy && x.to >= baseSalaryBrutoAnualy || x.to == undefined);

    const { base, percent, excess } = salaryRange;
    
    const ir = ((baseSalaryBrutoAnualy - excess) * percent) + base;
    const neto = baseSalaryBrutoAnualy - ir;

    return {
        salary : baseSalaryAnualy,
        inss,
        ir,
        neto
    }
}

const round = value => parseFloat(value).toFixed(2);

const drawInformation  = selector => ({salary, inss, ir, neto}) => {

    let table = document.querySelector(selector);
    table.innerHTML = '';

    let tr = `<tr>
        <td>${round(salary)}</td>
        <td>${round(inss)}</td>
        <td>${round(ir)}</td>
        <td>${round(neto)}</td>
    </tr>`;

    table.innerHTML = tr;
}

document.querySelectorAll('a').forEach(el => {
    el.addEventListener('click', e => show(e.target.id));
})

const show = prop => {

    document.querySelector('.config').classList.remove('show');
    document.querySelector('.main').classList.remove('show');

    document.querySelector(`.${prop}`).classList.add('show');
        
}
document.querySelector('#inssMensual').addEventListener('change', e => setInssTax(e.target.value));
