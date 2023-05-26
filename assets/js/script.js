let botonAgregar = document.getElementById("botonAgregar");
let botonCalcular = document.getElementById("botonCalcular");
let PresupuestoTotal = [];
let listaGastos = [];

class Gastos {
    constructor(nombre, valor, imagen) {
        this.nombre = nombre;
        this.valor = valor;
        this.imagen = imagen;
    }
}

const limpiar = () => {
    document.getElementById("ingresoPresupuesto").value = "";
    document.getElementById("ingresoGasto").value = "";
    document.getElementById("ingresoMontoGasto").value = "";
};

function saldo() {
    totalGastos = 0;
    totalPresupuesto = 0;

    for (let i = 0; i < PresupuestoTotal.length; i++) {
        let num = Number(PresupuestoTotal[i]);
        totalPresupuesto += num;
    }

    for (let i = 0; i < listaGastos.length; i++) {
        let valor = Number(listaGastos[i].valor);
        totalGastos += valor;
    }

    let saldo = totalPresupuesto - totalGastos;

    let totalGastosCambiado =
        "$" +
        Number(totalGastos).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    let saldoCambiado =
        "$" +
        Number(saldo).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    document.getElementById("gastosTotales").innerText = totalGastosCambiado;
    document.getElementById("saldo").innerText = saldoCambiado;
}

function agregarPresupuesto() {
    let presupuesto = document.getElementById("ingresoPresupuesto").value;

    total = 0;

    if (presupuesto != "" && !isNaN(presupuesto)) {
        PresupuestoTotal.push(presupuesto);
        for (let i = 0; i < PresupuestoTotal.length; i++) {
            let num = Number(PresupuestoTotal[i]);
            total += num;
        }
        let formattedPrice =
            "$" +
            total.toLocaleString("es-CL", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
        document.getElementById("textoPresupuesto").innerText = formattedPrice;
        saldo();
        limpiar();
    }
}

function agregarGastos() {
    let detalleGasto = document.getElementById("ingresoGasto").value;
    let precioGasto = document.getElementById("ingresoMontoGasto").value;
    let imagen = "./assets/img/icon.png";
    if (
        detalleGasto != "" &&
        precioGasto != "" &&
        !isNaN(precioGasto) &&
        precioGasto > 0
    ) {
        objeto = new Gastos(detalleGasto, precioGasto, imagen);
        listaGastos.push(objeto);
        limpiar();
    }
    agregarTablaGastos();
}

function agregarTablaGastos() {
    document.getElementById("tabla").innerHTML = "";
    for (let i = 0; i < listaGastos.length; i++) {
        let valor = listaGastos[i].valor;
        let nombre = listaGastos[i].nombre;
        let imagen = listaGastos[i].imagen;

        let valorCambiado =
            "$" +
            Number(valor).toLocaleString("es-CL", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });

        document.getElementById("botonEliminarTodo").innerHTML = `
            <button type="button" onclick ="eliminarTodaLaListaDeGastos()" class="btn btn-outline-danger w-100 " id="botonBorrar">Borrar Todo</button>
            `;

        document.getElementById("tabla").innerHTML += `
    
            <tr>
                <td>${nombre}</td>
                <td>${valorCambiado}</td>
                <td><img src="${imagen}" alt="eliminar" onclick ="eliminarGasto(${i})" style="cursor:pointer;"></td>
            </tr>
            `
    }
    saldo();
}

function eliminarGasto(indice) {
    listaGastos.splice(indice, 1);
    saldo();
    agregarTablaGastos();
}

function eliminarTodaLaListaDeGastos() {
    listaGastos = [];
    saldo();
    agregarTablaGastos();
    document.getElementById("botonEliminarTodo").innerHTML = ``;
}

botonCalcular.addEventListener("click", agregarPresupuesto);
botonAgregar.addEventListener("click", agregarGastos);