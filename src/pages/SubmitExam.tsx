import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarSite from "../Components/NavbarSite";

interface Exam {
  id: number;
  title: string;
  questions: Question[];
  course: Course;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
  exam: Exam;
}

interface Answer {
  id: number;
  text: string;
  correct: boolean;
  question: Question;
}

interface Course {
  id: number;
  title: string;
  price: number;
  status: string;
  average_grade: number;
  category: Category;
  instructor: User;
}

interface Category {
  id: number;
  name: string;
}
interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
}

function Exam() {
  const { examId } = useParams();
  const { studentId } = useParams();
  const [exam, setExam] = useState<Exam | null>(null);
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

        if (result.data) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            setExam(result.data[0]);
          } else if (!Array.isArray(result.data)) {
            setExam(result.data);
          } else {
            setExam(null);
          }
        } else {
          setExam(null);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchExam();
    }
  }, [examId, studentId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <NavbarSite page={"Exam > Details"} />
        <h1 className="text-4xl font-bold mb-4">Exam</h1>
        {loading && <p className="text-gray-600">Cargando...</p>}
        {error && <p className="text-red-600">Error al cargar el examen</p>}
        {exam ? (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h1 className="text-4xl font-bold mb-2">Examen </h1>
            <h2 className="text-3xl font-bold mb-2">{exam.title}</h2>

            <h3 className="text-2xl font-bold mb-2">Preguntas</h3>
            <ul className="list-disc pl-5">
              {exam.questions.map((question) => (
                <li key={question.id} className="mb-2">
                  <p className="text-lg font-semibold">{question.text}</p>
                  <ul className="list-disc pl-5">
                    {question.answers.map((answer) => (
                      <li key={answer.id} className="mb-1">
                        <p>{answer.text}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              No se encontró el examen
            </h2>
          </div>
        )}
    </div>
  );
}

export default Exam;
