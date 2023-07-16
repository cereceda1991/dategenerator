import { useState } from "react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./StudentGenerator.css";

function generateUniqueDNI(students) {
  const maxAttempts = 1000;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const DNI = generateRandomDNI();
    const isUnique = !students.some((student) => student.DNI === DNI);

    if (isUnique) {
      return DNI;
    }

    attempts++;
  }

  throw new Error(
    "No se pudo generar un DNI único en el número máximo de intentos."
  );
}

function generateRandomDNI() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateRandomName() {
  const names = [
    "Juan",
    "María",
    "Pedro",
    "Laura",
    "Carlos",
    "Ana",
    "Sofía",
    "Diego",
    "Valeria",
    "Andrés",
    "Luis",
    "Gabriela",
    "Miguel",
    "Fernanda",
    "Ricardo",
    "Isabella",
    "Javier",
    "Camila",
    "José",
    "Daniela",
    "Alejandro",
    "Paula",
    "Andrea",
    "Esteban",
    "Natalia",
    "Francisco",
    "Valentina",
    "David",
    "Melanie",
    "Jorge",
    "Mariana",
    "Fernando",
    "Carolina",
    "Santiago",
    "Gabriela",
    "Roberto",
    "Lucía",
    "Felipe",
    "Julia",
    "Gustavo",
    "Catalina",
    "Oscar",
    "Adriana",
    "Héctor",
    "Paola",
    "Rafael",
    "Verónica",
    "Eduardo",
    "Silvia",
    "Ángel",
    "Marcela",
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  return randomName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function generateRandomLastname() {
  const lastnames = [
    "Pérez",
    "García",
    "López",
    "Torres",
    "Rodríguez",
    "Martínez",
    "Hernández",
    "Vargas",
    "Gómez",
    "Silva",
    "Fernández",
    "González",
    "Ramírez",
    "Moreno",
    "Ortega",
    "Morales",
    "Castillo",
    "Vega",
    "Ruiz",
    "Medina",
    "Castro",
    "Sánchez",
    "Romero",
    "Delgado",
    "Montoya",
    "Guerrero",
    "Cruz",
    "Rojas",
    "Mendoza",
    "Jiménez",
    "Navarro",
    "Pacheco",
    "Fuentes",
    "Peña",
    "Ramos",
    "Cortés",
    "Acosta",
    "Orozco",
    "Molina",
    "Aguilar",
    "Gallardo",
    "Reyes",
    "Soto",
    "Escobar",
    "Vargas",
    "Mendez",
    "Valenzuela",
    "Padilla",
    "Chávez",
    "Álvarez",
    "Olivares",
  ];

  const randomLastname =
    lastnames[Math.floor(Math.random() * lastnames.length)];
  return randomLastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function StudentGenerator() {
  const [numStudents, setNumStudents] = useState(0);
  const [students, setStudents] = useState([]);
  const [resultText, setResultText] = useState("");

  const handleNumStudentsChange = (event) => {
    setNumStudents(parseInt(event.target.value));
  };

const generateStudents = () => {
    const generatedStudents = [];
  
    for (let i = 0; i < numStudents; i++) {
      const name = generateRandomName();
      const lastname = generateRandomLastname();
      const student = {
        DNI: generateUniqueDNI(generatedStudents),
        name: name,
        lastname: lastname,
        email: `${name.toLowerCase()}${lastname.toLowerCase()}@example.com`,
      };
  
      generatedStudents.push(student);
    }
  
    setStudents(generatedStudents);
    setResultText(JSON.stringify({ students: generatedStudents }, null, 2));
    toast.success("Estudiantes generados exitosamente!");
  };
  


  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
    toast.success("Archivo de Excel descargado!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText);
    toast.success("Contenido copiado al Portapapeles!");
  };

  return (
    <div className="main">
      <h3>Cantidad de estudiantes:</h3>
      <input
        type="number"
        value={numStudents}
        onChange={handleNumStudentsChange}
      />
      <div className="container_buttons">
        <button onClick={generateStudents}>Generar</button>
        <button onClick={downloadExcel}>Descargar en Excel</button>
        <button onClick={copyToClipboard}>Copiar al Portapapeles</button>
      </div>
      <textarea className="textarea" value={resultText} readOnly />
      <ToastContainer />
    </div>
  );
}

export default StudentGenerator;
