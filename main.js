//Alumno: Jesús Inchicaque Arequipeño
// Implementar programa que contenga una clase llamada Contenedor que reciba el 
// nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
class Contenedor {
	constructor(file) {
		try {
			this.fs = require("fs");
            this.array = [];
            this.file = file
            this.id = 1
            this.doc = `${this.file}.txt`
			this.fs.writeFileSync(this.doc, JSON.stringify(this.array), "utf8");
            this.data = []
            console.log(typeof this.array)
		} catch (e) {
			console.log(e);
		}
	}
    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
	async save(obj) {
        const id = this.id
        const newObj = {...obj, id: this.id++}
        this.array.push(newObj);
		this.fs.readFile(`${this.file}.txt`,'utf-8',(e,c) => {
            c = JSON.parse(c)
            c = this.array
            this.fs.writeFileSync(this.doc, JSON.stringify(c), "utf8")
        })
        return id;
	}
    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id) {
        const newObj = this.array.find(p => p.id=== id)
        return newObj
    }
    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    getAll(){
        return this.array
    }
    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        this.array = this.array.filter(p => p.id !== id)
        this.fs.writeFileSync(this.doc, JSON.stringify(this.array), "utf8")
    }
    //deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll(){
        this.fs.writeFileSync(this.doc, "", "utf8");
    }
}


const test = new Contenedor("prueba");


const ej1 = {
	title: "Escuadra",
	price: 123.45,
	thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const test1 = test.save(ej1);
console.log(test1);
const ej2 = {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                                                                                                                                                                        
  }
const test2 = test.save(ej2);
console.log(test2);
const ej3 = {                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
    id: 3                                                                                                                                              
  } 
const test3 = test.save(ej3);
console.log(test3);

const all = test.getAll();
const x = Math.ceil(Math.random()*3);
const random = test.getById(x)
console.log(random);


const express = require('express');
const app = express();
const PORT = 8080
const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))

app.get('/productos',(req,res)=>{
    res.send({'Respuesta ': all})
})

app.get('/productoRandom',(req,res)=>{
    res.send({'Respuesta ': random})
})



