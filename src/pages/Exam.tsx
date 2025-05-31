import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarSite from "../Components/NavbarSite";

interface Exam {
  id: number;
  title: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
}

function Exam() {
  const { examId } = useParams();
  const [exam, setExam] = useState<null | Exam>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/exams/${examId}`
        );
        if (!response.ok) throw new Error("Error al obtener el examen");

        const result = await response.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          setExam(result.data[0]);
        } else if (!Array.isArray(result.data)) {
          setExam(result.data);
        } else {
          setExam(null);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching assignment:", err);
      } finally {
        setLoading(false);
      }
    };
    if (examId) {
      fetchExam();
    }
  }, [examId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <NavbarSite page={"Exam > Details"} />
      <div className="flex flex-col items-center justify-center">
        {loading && <p className="text-gray-600">Cargando...</p>}
        {error && <p className="text-red-600">Error al cargar el examen</p>}
        {exam ? (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <div className="flex items-center  justify-center mb-4">
              <h2 className="text-2xl font-bold mb-2 mr-8 text-blue-900">Detalles del examen</h2>
              <img
                src="https://static.thenounproject.com/png/21610-200.png"
                alt="Exam"
                width={90}
                className="mb-2 px-4 py-4 rounded-full shadow-md"
              />
            </div>
            <p className="text-gray-700 font-bold">ID: {exam.id}</p>
            <p className="text-gray-700 font-bold">Title: {exam.title}</p>
            {exam.questions && exam.questions.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Preguntas</h3>
                <ul className="list-disc list-inside">
                  {exam.questions.map((question) => (
                    <li key={question.id} className="text-gray-700 mb-1 
                      flex items-center justify-start gap-2">
                      🔷 
                      {question.text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600">No se encontró el examen</p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No se encontró el examen</p>
        )}
      </div>
    </div>
  );
}

export default Exam;
