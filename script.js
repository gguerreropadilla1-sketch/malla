// ============================================================
// MALLA DE TURNOS - ANDES BPO
// ============================================================

// ============================================================
// CONFIGURACIÓN
// ============================================================

const PASSWORD_SUPERVISOR = "Andes2026";


// ============================================================
// ELEMENTOS HTML
// ============================================================

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaAgente =
    document.getElementById("pantallaAgente");

const pantallaSupervisor =
    document.getElementById("pantallaSupervisor");

const btnAgente =
    document.getElementById("btnAgente");

const btnSupervisor =
    document.getElementById("btnSupervisor");

const btnInicioAgente =
    document.getElementById("btnInicioAgente");

const btnInicioSupervisor =
    document.getElementById("btnInicioSupervisor");

const busquedaAgente =
    document.getElementById("busquedaAgente");

const resultadoAgente =
    document.getElementById("resultadoAgente");

const buscarSupervisor =
    document.getElementById("buscarSupervisor");

const filtroCanal =
    document.getElementById("filtroCanal");

const tablaMalla =
    document.getElementById("tablaMalla");

const resumenOperacion =
    document.getElementById("resumenOperacion");


const periodo =
    document.getElementById("periodo");

    const archivoExcel =
    document.getElementById("archivoExcel");

const estadoCargaExcel =
    document.getElementById("estadoCargaExcel");


// ============================================================
// INICIALIZACIÓN
// ============================================================

periodo.textContent = malla.periodo;
console.log("MALLA CARGADA:", malla);
console.log("AGENTES:", malla.agentes);


// ============================================================
// FUNCIÓN PARA CAMBIAR DE PANTALLA
// ============================================================

function mostrarPantalla(pantalla) {

    pantallaInicio.classList.add("oculto");

    pantallaAgente.classList.add("oculto");

    pantallaSupervisor.classList.add("oculto");

    pantalla.classList.remove("oculto");

}


// ============================================================
// VOLVER A INICIO
// ============================================================

btnInicioAgente.addEventListener(
    "click",
    function () {

        mostrarPantalla(pantallaInicio);

        busquedaAgente.value = "";

        resultadoAgente.innerHTML = "";

    }
);


btnInicioSupervisor.addEventListener(
    "click",
    function () {

        mostrarPantalla(pantallaInicio);

        buscarSupervisor.value = "";

    }
);


// ============================================================
// ACCESO AGENTE
// ============================================================

btnAgente.addEventListener(
    "click",
    function () {

        mostrarPantalla(pantallaAgente);

        busquedaAgente.focus();

    }
);


// ============================================================
// ACCESO SUPERVISOR
// ============================================================

btnSupervisor.addEventListener(
    "click",
    function () {

        const password =
            prompt(
                "Ingrese la contraseña del supervisor:"
            );

        if (
            password ===
            PASSWORD_SUPERVISOR
        ) {

            mostrarPantalla(
                pantallaSupervisor
            );

            cargarCanales();

            mostrarResumen();

            mostrarTabla();

        }
        else {

            alert(
                "Contraseña incorrecta."
            );

        }

    }
);


// ============================================================
// NORMALIZAR TEXTO
// ============================================================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim();

}


// ============================================================
// BUSCAR AGENTE
// ============================================================

function buscarAgente() {

    const texto =
        normalizarTexto(
            busquedaAgente.value
        );

    if (!texto) {

        resultadoAgente.innerHTML = "";

        return;

    }


    const palabras =
        texto.split(/\s+/);


    const resultados =
        malla.agentes.filter(
            function (agente) {

                const nombre =
                    normalizarTexto(
                        agente.nombre
                    );

                return palabras.every(
                    function (palabra) {

                        return nombre.includes(
                            palabra
                        );

                    }
                );

            }
        );


    mostrarResultadosAgente(
        resultados
    );

}


// ============================================================
// EVENTO DE BÚSQUEDA
// ============================================================

busquedaAgente.addEventListener(
    "input",
    buscarAgente
);


// ============================================================
// MOSTRAR RESULTADOS DEL AGENTE
// ============================================================

function mostrarResultadosAgente(
    resultados
) {

    if (resultados.length === 0) {

        resultadoAgente.innerHTML = `

            <div class="mensaje">

                <h3>
                    No encontramos la malla
                </h3>

                <p>
                    Verifique el nombre o apellido
                    ingresado.
                </p>

            </div>

        `;

        return;

    }


    let html = "";


    resultados.forEach(
        function (agente) {

            html += generarMallaAgente(
                agente
            );

        }
    );


    resultadoAgente.innerHTML = html;

}


// ============================================================
// GENERAR MALLA INDIVIDUAL
// ============================================================


    function generarMallaAgente(agente) {

    const dias = [
        ["Lunes", agente.lunes],
        ["Martes", agente.martes],
        ["Miércoles", agente.miercoles],
        ["Jueves", agente.jueves],
        ["Viernes", agente.viernes],
        ["Sábado", agente.sabado]
    ];

    let html = `

        <div class="malla-agente">

            <div class="cabecera-agente">

                <h2>
                    ${agente.nombre}
                </h2>

                <p>
                    Canal:
                    <strong>
                        ${agente.canal}
                    </strong>
                </p>

            </div>


            <div class="tabla-agente-contenedor">

                <table class="tabla-agente">

                    <thead>

                        <tr>

                            <th>Horario</th>
    `;


    // DÍAS EN HORIZONTAL

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <th>
                    ${nombreDia}
                </th>

            `;

        }
    );


    html += `

                        </tr>

                    </thead>

                    <tbody>
    `;


    // INGRESO

    html += `

        <tr>

            <th>🟢 Ingreso</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${dia?.ingreso || "-"}
                </td>

            `;

        }
    );

    html += `</tr>`;


    // SALIDA

    html += `

        <tr>

            <th>🔴 Salida</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${dia?.salida || "-"}
                </td>

            `;

        }
    );

    html += `</tr>`;


    // BREAK 1

    html += `

        <tr>

            <th>☕ Break 1</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${dia?.break1 || "-"}
                </td>

            `;

        }
    );

    html += `</tr>`;


    // ALMUERZO

    html += `

        <tr>

            <th>🍴 Almuerzo</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${dia?.almuerzo || "-"}
                </td>

            `;

        }
    );

    html += `</tr>`;


    // BREAK 2

    html += `

        <tr>

            <th>☕ Break 2</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${dia?.break2 || "-"}
                </td>

            `;

        }
    );

    html += `</tr>`;


    // PAUSA ACTIVA

    html += `

        <tr>

            <th>🧘 Pausa activa</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${dia?.pausaActiva || "-"}
                </td>

            `;

        }
    );

    html += `</tr>`;


    // TIEMPO DE CONEXIÓN

    html += `

        <tr>

            <th>📶 Tiempo conexión</th>
    `;

    dias.forEach(
        function ([nombreDia, dia]) {

            html += `

                <td>
                    ${
                        calcularConexion(
                            dia?.ingreso,
                            dia?.salida,
                            dia?.almuerzo
                        )
                    }
                </td>

            `;

        }
    );

    html += `

        </tr>

    `;


    html += `

                    </tbody>

                </table>

            </div>

        </div>

    `;


    return html;

}


// ============================================================
// CALCULAR TIEMPO DE CONEXIÓN
// ============================================================

function calcularConexion(
    ingreso,
    salida,
    almuerzo
) {

    if (
        !ingreso ||
        !salida
    ) {

        return "-";

    }


    const inicio =
        convertirMinutos(
            ingreso
        );

    const fin =
        convertirMinutos(
            salida
        );


    if (
        inicio === null ||
        fin === null
    ) {

        return "-";

    }


    let minutos =
        fin - inicio;


    // Restar almuerzo
    if (almuerzo) {

        const partes =
            almuerzo.split("-");


        if (
            partes.length === 2
        ) {

            const almuerzoInicio =
                convertirMinutos(
                    partes[0].trim()
                );

            const almuerzoFin =
                convertirMinutos(
                    partes[1].trim()
                );


            if (
                almuerzoInicio !== null &&
                almuerzoFin !== null
            ) {

                minutos -=
                    (
                        almuerzoFin -
                        almuerzoInicio
                    );

            }

        }

    }


    return formatearMinutos(
        minutos
    );

}


// ============================================================
// CONVERTIR HORA A MINUTOS
// ============================================================

function convertirMinutos(
    hora
) {

    const partes =
        hora.split(":");


    if (
        partes.length !== 2
    ) {

        return null;

    }


    const horas =
        parseInt(
            partes[0],
            10
        );

    const minutos =
        parseInt(
            partes[1],
            10
        );


    if (
        isNaN(horas) ||
        isNaN(minutos)
    ) {

        return null;

    }


    return (
        horas * 60
    ) + minutos;

}


// ============================================================
// FORMATEAR MINUTOS
// ============================================================

function formatearMinutos(
    minutos
) {

    if (
        minutos < 0
    ) {

        return "-";

    }


    const horas =
        Math.floor(
            minutos / 60
        );

    const minutosRestantes =
        minutos % 60;


    return `${horas} h ${String(
        minutosRestantes
    ).padStart(2, "0")} min`;

}


// ============================================================
// CARGAR CANALES
// ============================================================

function cargarCanales() {

    const canales =
        [
            ...new Set(
                malla.agentes.map(
                    function (agente) {
                        return agente.canal;
                    }
                )
            )
        ];


    filtroCanal.innerHTML = `

        <option value="">
            Todos los canales
        </option>

    `;


    canales.forEach(
        function (canal) {

            filtroCanal.innerHTML += `

                <option value="${canal}">
                    ${canal}
                </option>

            `;

        }
    );

}


// ============================================================
// RESUMEN DE LA OPERACIÓN
// ============================================================

function mostrarResumen() {

    const total =
        malla.agentes.length;


    const canales =
        [
            ...new Set(
                malla.agentes.map(
                    function (agente) {
                        return agente.canal;
                    }
                )
            )
        ];


    resumenOperacion.innerHTML = `

        <div class="resumen">

            <div>
                <span>
                    Agentes
                </span>

                <strong>
                    ${total}
                </strong>
            </div>

            <div>
                <span>
                    Canales
                </span>

                <strong>
                    ${canales.length}
                </strong>
            </div>

            <div>
                <span>
                    Periodo
                </span>

                <strong>
                    ${malla.periodo}
                </strong>
            </div>

        </div>

    `;

}


// ============================================================
// TABLA GENERAL DEL SUPERVISOR
// ============================================================

function mostrarTabla() {

    const texto =
        normalizarTexto(
            buscarSupervisor.value
        );

    const canal =
        filtroCanal.value;


    const agentesFiltrados =
        malla.agentes.filter(
            function (agente) {

                const nombre =
                    normalizarTexto(
                        agente.nombre
                    );

                const coincideNombre =
                    nombre.includes(texto);

                const coincideCanal =
                    !canal ||
                    agente.canal === canal;

                return (
                    coincideNombre &&
                    coincideCanal
                );

            }
        );


    if (agentesFiltrados.length === 0) {

        tablaMalla.innerHTML = `

            <div class="mensaje">

                <h3>
                    No se encontraron agentes
                </h3>

                <p>
                    Verifique el nombre o el canal seleccionado.
                </p>

            </div>

        `;

        return;

    }


    let html = `

        <div class="tabla-supervisor-contenedor">

            <table class="tabla-supervisor">

                <thead>

                    <tr>

                        <th>Agente</th>

                        <th>Lunes</th>

                        <th>Martes</th>

                        <th>Miércoles</th>

                        <th>Jueves</th>

                        <th>Viernes</th>

                        <th>Sábado</th>

                        <th>Almuerzo</th>

                        <th>Break 1</th>

                        <th>Break 2</th>

                        <th>Pausa activa</th>

                        <th>Tiempo conexión</th>

                        <th>Canal</th>

                    </tr>

                </thead>

                <tbody>
    `;


    agentesFiltrados.forEach(
        function (agente) {

            html += `

                <tr>

                    <td class="nombre-agente">

                        ${agente.nombre}

                    </td>

            `;


            // LUNES A SÁBADO

            const dias = [

                agente.lunes,
                agente.martes,
                agente.miercoles,
                agente.jueves,
                agente.viernes,
                agente.sabado

            ];


            dias.forEach(
                function (dia) {

                    html += `

                        <td>

                            <strong>
                                ${dia?.ingreso || "-"}
                            </strong>

                            <span class="separador-horario">
                                -
                            </span>

                            <strong>
                                ${dia?.salida || "-"}
                            </strong>

                        </td>

                    `;

                }
            );


            // ALMUERZO

            html += `

                <td class="detalle-horario">

                    ${resumirHorario(
                        agente,
                        "almuerzo"
                    )}

                </td>

            `;


            // BREAK 1

            html += `

                <td class="detalle-horario">

                    ${resumirHorario(
                        agente,
                        "break1"
                    )}

                </td>

            `;


            // BREAK 2

            html += `

                <td class="detalle-horario">

                    ${resumirHorario(
                        agente,
                        "break2"
                    )}

                </td>

            `;


            // PAUSA ACTIVA

            html += `

                <td class="detalle-horario">

                    ${resumirHorario(
                        agente,
                        "pausaActiva"
                    )}

                </td>

            `;


            // TIEMPO DE CONEXIÓN

            html += `

                <td class="detalle-horario">

                    ${resumirConexion(
                        agente
                    )}

                </td>

            `;


            // CANAL

            html += `

                <td>

                    <span class="canal-supervisor">

                        ${agente.canal}

                    </span>

                </td>

            `;


            html += `

                </tr>

            `;

        }
    );


    html += `

                </tbody>

            </table>

        </div>

    `;


    tablaMalla.innerHTML = html;

}
function resumirHorario(agente, campo) {

    const dias = [

        ["L", agente.lunes],
        ["M", agente.martes],
        ["X", agente.miercoles],
        ["J", agente.jueves],
        ["V", agente.viernes]

    ];


    const valores = [];


    dias.forEach(
        function ([letra, dia]) {

            const valor =
                dia?.[campo] || "-";


            if (valor !== "-") {

                valores.push({

                    dia: letra,
                    valor: valor

                });

            }

        }
    );


    if (valores.length === 0) {

        return "-";

    }


    const primerValor =
        valores[0].valor;


    const todosIguales =
        valores.every(
            function (item) {

                return (
                    item.valor ===
                    primerValor
                );

            }
        );


    if (todosIguales) {

        return primerValor;

    }


    return valores.map(
        function (item) {

            return `

                <div class="horario-por-dia">

                    <span>
                        ${item.dia}
                    </span>

                    ${item.valor}

                </div>

            `;

        }
    ).join("");

}
function resumirConexion(agente) {

    const dias = [

        ["L", agente.lunes],
        ["M", agente.martes],
        ["X", agente.miercoles],
        ["J", agente.jueves],
        ["V", agente.viernes],
        ["S", agente.sabado]

    ];


    return dias.map(
        function ([letra, dia]) {

            const conexion =
                calcularConexion(
                    dia?.ingreso,
                    dia?.salida,
                    dia?.almuerzo
                );


            return `

                <div class="horario-por-dia">

                    <span>
                        ${letra}
                    </span>

                    ${conexion}

                </div>

            `;

        }
    ).join("");

}
// ============================================================
// FILTROS DEL SUPERVISOR
// ============================================================

buscarSupervisor.addEventListener(
    "input",
    mostrarTabla
);


filtroCanal.addEventListener(
    "change",
    mostrarTabla
);
// ============================================================
// CARGAR EXCEL
// ============================================================

archivoExcel.addEventListener(
    "change",
    cargarExcel
);

function cargarExcel(event) {

    const archivo =
        event.target.files[0];

    if (!archivo) {
        return;
    }

    // ACTUALIZAR PERIODO SEGÚN EL NOMBRE DEL EXCEL
    malla.periodo =
        obtenerPeriodoDesdeNombreArchivo(archivo.name);

    periodo.textContent =
        malla.periodo;

    estadoCargaExcel.textContent =
        "Leyendo la malla...";

    const lector =
        new FileReader();


    lector.onload = function(e) {

        try {

            const datos =
                new Uint8Array(
                    e.target.result
                );


            const libro =
                XLSX.read(
                    datos,
                    {
                        type: "array"
                    }
                );


            const nombreHoja =
                libro.SheetNames[0];


            const hoja =
                libro.Sheets[
                    nombreHoja
                ];


            const filas =
                XLSX.utils.sheet_to_json(
                    hoja,
                    {
                        header: 1,
                        defval: ""
                    }
                );


            procesarMallaExcel(
                filas
            );


        }
        catch (error) {

            console.error(error);

            estadoCargaExcel.textContent =
                "Error al leer el archivo.";

        }

    };


    lector.readAsArrayBuffer(
        archivo
    );

}

function obtenerPeriodoDesdeNombreArchivo(nombreArchivo) {

    const nombre =
        nombreArchivo
            .replace(/\.[^/.]+$/, "")
            .trim();

    // Busca nombres como:
    // Malla del 17 al 22 de agosto
    // Malla del 10 al 15 de agosto

    const patron =
        /(\d{1,2})\s+al\s+(\d{1,2})\s+de\s+([a-záéíóúñ]+)/i;

    const resultado =
        nombre.match(patron);

    if (resultado) {

        const diaInicio =
            resultado[1];

        const diaFin =
            resultado[2];

        const mes =
            resultado[3];

        return `${diaInicio} al ${diaFin} de ${mes} de 2026`;
    }

    // Si el nombre del archivo no cumple
    // el formato esperado, conserva el período anterior.

    return malla.periodo;
}

function procesarMallaExcel(filas) {

    const nuevosAgentes = [];


    for (let i = 1; i < filas.length; i++) {

        const fila = filas[i];

        const nombre = fila[0];

        if (!nombre) {
            continue;
        }


        // ====================================================
        // HORARIOS GENERALES DEL AGENTE
        // ====================================================

        const break1 =
            convertirHoraExcel(fila[22]);

        const break2 =
            convertirHoraExcel(fila[23]);

        const almuerzo =
            convertirHoraExcel(fila[24]);

        const pausaActiva =
            convertirHoraExcel(fila[25]);


        // ====================================================
        // CREAR AGENTE
        // ====================================================

        const agente = {

            nombre:
                String(nombre).trim(),

            identificacion: "",

            canal:
                String(fila[26] || "").trim(),


            // =================================================
            // LUNES
            // =================================================

            lunes: {

                ingreso:
                    convertirHoraExcel(fila[1]),

                salida:
                    convertirHoraExcel(fila[2]),

                break1: break1,

                break2: break2,

                almuerzo: almuerzo,

                pausaActiva: pausaActiva

            },


            // =================================================
            // MARTES
            // =================================================

            martes: {

                ingreso:
                    convertirHoraExcel(fila[4]),

                salida:
                    convertirHoraExcel(fila[5]),

                break1: break1,

                break2: break2,

                almuerzo: almuerzo,

                pausaActiva: pausaActiva

            },


            // =================================================
            // MIÉRCOLES
            // =================================================

            miercoles: {

                ingreso:
                    convertirHoraExcel(fila[7]),

                salida:
                    convertirHoraExcel(fila[8]),

                break1: break1,

                break2: break2,

                almuerzo: almuerzo,

                pausaActiva: pausaActiva

            },


            // =================================================
            // JUEVES
            // =================================================

            jueves: {

                ingreso:
                    convertirHoraExcel(fila[10]),

                salida:
                    convertirHoraExcel(fila[11]),

                break1: break1,

                break2: break2,

                almuerzo: almuerzo,

                pausaActiva: pausaActiva

            },


            // =================================================
            // VIERNES
            // =================================================

            viernes: {

                ingreso:
                    convertirHoraExcel(fila[13]),

                salida:
                    convertirHoraExcel(fila[14]),

                break1: break1,

                break2: break2,

                almuerzo: almuerzo,

                pausaActiva: pausaActiva

            },


            // =================================================
            // SÁBADO
            // =================================================

            sabado: {

                ingreso:
                    convertirHoraExcel(fila[16]),

                salida:
                    convertirHoraExcel(fila[17]),

                break1: "",

                break2: "",

                almuerzo: "",

                pausaActiva: ""

            }

        };


        nuevosAgentes.push(agente);

    }


    // ========================================================
    // VALIDAR RESULTADO
    // ========================================================

    if (nuevosAgentes.length === 0) {

        estadoCargaExcel.textContent =
            "No se encontraron agentes.";

        return;

    }


    // ========================================================
    // ACTUALIZAR MALLA
    // ========================================================

    malla.agentes =
        nuevosAgentes;


    // ========================================================
    // ACTUALIZAR INTERFAZ
    // ========================================================

    mostrarResumen();

    cargarCanales();

    mostrarTabla();


    estadoCargaExcel.textContent =
        `Malla cargada correctamente: ${nuevosAgentes.length} agentes.`;


}

function convertirHoraExcel(valor) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {

        return "";

    }


    // Si SheetJS entrega una hora como texto

    if (
        typeof valor === "string"
    ) {

        return valor.trim();

    }


    // Si Excel entrega una fracción de día

    if (
        typeof valor === "number"
    ) {

        const totalMinutos =
            Math.round(
                valor * 24 * 60
            );


        const horas =
            Math.floor(
                totalMinutos / 60
            );


        const minutos =
            totalMinutos % 60;


        return `${String(
            horas
        ).padStart(2, "0")}:${String(
            minutos
        ).padStart(2, "0")}`;

    }


    return String(valor);

}