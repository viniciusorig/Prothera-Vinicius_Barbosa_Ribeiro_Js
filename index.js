const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function import_json()
{
    try 
    {
        const rawData = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawData);
        return jsonData;
    } 
    catch (error) 
    {
        console.error('Erro ao ler arquivo:', error);
        return null;
    }
}

function search_json(json, id)
{

    let person = json.find(pessoa => pessoa.id === id);

    if(person == undefined)
    {
        return null;
    }
    return person;
}

function list_json_crescent_with_cpf(json)
{
    let list = [...json].sort((a, b) => a.idade - b.idade);
    list = list.filter(pessoa => pessoa.documentos.some(doc => doc.tipo === "CPF"));
    return list;
}

function json_list_greater_than_fifty(json)
{
    let  list = json.filter(pessoa => pessoa.idade >= 50);
    return list;
}

function json_list_without_cpf(json)
{
    let list = json.filter(pessoa => !pessoa.documentos.some(doc => doc.tipo === "CPF"));
    return list;
}

function json_list_documents(json)
{
    let list = [] = json.flatMap(pessoa => pessoa.documentos.map(documento => documento.tipo));
    list = [...new Set(list)];
    return list;
}

data = import_json();

console.log(search_json(data, 2), '\n');
console.log(list_json_crescent_with_cpf(data), '\n');
console.log(json_list_greater_than_fifty(data), '\n');
console.log(json_list_documents(data), '\n');
console.log(json_list_without_cpf(data), '\n');